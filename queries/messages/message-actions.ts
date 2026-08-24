"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";

import {createClient} from "@/lib/supabase/server";
import type {SendReplyState} from "@/types/forms/action-state";

export async function readMessageAction(formData: FormData) {
  const messageId = z.uuid().safeParse(formData.get("messageId"));
  if (!messageId.success) return;

  const supabase = await createClient();
  const {data: claims} = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");

  const {data: message} = await supabase.from("messages").update({is_read: true}).eq("id", messageId.data).eq("receiver_id", userId).select("property_id").maybeSingle();
  revalidatePath("/", "layout");
  if (formData.get("intent") === "view" && message) redirect(`/properties/${message.property_id}`);
}

export async function sendMessageReplyAction(_previousState: SendReplyState, formData: FormData): Promise<SendReplyState> {
  const attemptId = crypto.randomUUID();
  const parsed = z
    .object({
      propertyId: z.uuid(),
      otherUserId: z.uuid(),
      message: z.string().trim().nonempty().max(1000),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return {
      error: "Your inquiry could not be sent. Please check the message and try again.",
      attemptId,
    };

  const supabase = await createClient();
  const {data: claims} = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");

  const [{data: profile}, {data: property}, {data: thread}] = await Promise.all([supabase.from("profiles").select("status").eq("id", userId).maybeSingle(), supabase.from("properties").select("owner_id").eq("id", parsed.data.propertyId).maybeSingle(), supabase.from("messages").select("id").eq("property_id", parsed.data.propertyId).or(`sender_id.eq.${parsed.data.otherUserId},receiver_id.eq.${parsed.data.otherUserId}`).limit(1)]);
  if (!profile || profile.status !== "ACTIVE" || !property || !thread?.length || (property.owner_id !== userId && property.owner_id !== parsed.data.otherUserId))
    return {
      error: "Your inquiry could not be sent because this conversation is unavailable.",
      attemptId,
    };

  const {error} = await supabase.from("messages").insert({
    sender_id: userId,
    receiver_id: parsed.data.otherUserId,
    property_id: parsed.data.propertyId,
    content: parsed.data.message,
  });
  if (error) return {error: "Failure to send inquiry. Please try again.", attemptId};
  revalidatePath("/", "layout");
  revalidatePath("/owner/properties");
  revalidatePath(`/properties/${parsed.data.propertyId}`);
  return {};
}
