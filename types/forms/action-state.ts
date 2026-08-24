export type FormActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
};

export type SendReplyState = Pick<FormActionState, "error"> & {
  attemptId?: string;
};
