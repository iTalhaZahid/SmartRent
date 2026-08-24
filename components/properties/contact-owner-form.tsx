"use client";

import {useActionState} from "react";
import {AlertCircle, CheckCircle2, LoaderCircle, MessageCircle} from "lucide-react";

import {contactOwnerAction} from "@/queries/properties/property-actions";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export function ContactOwnerForm({
  propertyId,
  propertyTitle,
  currentUserId,
  messages,
}: {
  propertyId: string;
  propertyTitle: string;
  currentUserId: string;
  messages: {
    id: string;
    sender_id: string;
    content: string;
    created_at: string;
  }[];
}) {
  const [state, formAction, pending] = useActionState(contactOwnerAction, {});

  return (
    <form action={formAction} className="mt-6 space-y-3">
      <input type="hidden" name="propertyId" value={propertyId} />
      <Label htmlFor="owner-message">Conversation with owner</Label>
      {!!messages.length && (
        <div className="max-h-72 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.sender_id === currentUserId ? "rounded-br-sm bg-teal-700 text-white" : "rounded-bl-sm border bg-white text-slate-700"}`}>
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <p className={`mt-1 text-[10px] ${message.sender_id === currentUserId ? "text-teal-100" : "text-slate-400"}`}>{new Date(message.created_at).toLocaleString("en-PK")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Textarea id="owner-message" name="message" required maxLength={1000} rows={3} placeholder={messages.length ? "Write another message..." : `Hi, I’m interested in ${propertyTitle}...`} />
      {state.error && (
        <p role="alert" className="flex gap-2 text-sm text-red-600">
          <AlertCircle className="mt-0.5 size-4 shrink-0" /> {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="flex gap-2 text-sm text-emerald-700">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> {state.success}
        </p>
      )}
      <Button type="submit" disabled={pending} className="h-11 w-full">
        {pending ? <LoaderCircle className="animate-spin" /> : <MessageCircle />}
        {pending ? "Sending..." : messages.length ? "Send message" : "Contact owner"}
      </Button>
    </form>
  );
}
