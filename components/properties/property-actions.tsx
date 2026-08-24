"use client";

import Link from "next/link";
import { LogIn, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PropertyActions({ propertyId, isRegistered }: { propertyId: string; isRegistered: boolean }) {
  const detailPath = `/properties/${propertyId}`;

  return (
    <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
      <Button variant="outline" size="sm" asChild><Link href={detailPath}>View details</Link></Button>
      {isRegistered ? (
        <Button size="sm" asChild><Link href={`${detailPath}#contact-owner`}><MessageCircle /> Contact dealer</Link></Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild><Button size="sm"><MessageCircle /> Contact dealer</Button></DialogTrigger>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader><DialogTitle>Login required</DialogTitle><DialogDescription>You need to log in or create an account before you can contact the dealer.</DialogDescription></DialogHeader>
            <DialogFooter className="mt-2 gap-2 sm:space-x-0"><Button variant="outline" asChild><Link href={`/register?next=${encodeURIComponent(`${detailPath}#contact-owner`)}`}>Create account</Link></Button><Button asChild><Link href={`/login?next=${encodeURIComponent(`${detailPath}#contact-owner`)}`}><LogIn /> Log in</Link></Button></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
