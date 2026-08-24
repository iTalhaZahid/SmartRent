"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function ConfirmSubmitButton({ title, message, children, variant = "default", disabled = false, className }: { title: string; message: string; children: React.ReactNode; variant?: "default" | "destructive"; disabled?: boolean; className?: string }) {
  const form = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button type="button" variant={variant} disabled={disabled} className={className} onClick={(event) => { form.current = event.currentTarget.form; }}>{children}</Button></DialogTrigger>
    <DialogContent className="max-w-sm rounded-2xl">
      <DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{message}</DialogDescription></DialogHeader>
      <DialogFooter className="mt-2 gap-2 sm:space-x-0"><DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose><Button type="button" variant={variant} onClick={() => { setOpen(false); form.current?.requestSubmit(); }}>Confirm</Button></DialogFooter>
    </DialogContent>
  </Dialog>;
}
