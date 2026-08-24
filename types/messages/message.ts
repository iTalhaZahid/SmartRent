export type PropertyMessage = {
  id: string;
  property_id?: string;
  sender_id: string;
  receiver_id?: string;
  content: string;
  created_at: string;
  is_read?: boolean;
};

export type MessageNotification = {
  id: string;
  property_id: string;
  sender_id: string;
  otherUserId: string;
  content: string;
  is_read: boolean;
  created_at: string;
  propertyTitle: string;
  monthlyPrice: number | null;
  nightlyPrice: number | null;
  imageUrl: string | null;
  conversation: Required<Pick<PropertyMessage, "id" | "property_id" | "sender_id" | "receiver_id" | "content" | "created_at">>[];
};
