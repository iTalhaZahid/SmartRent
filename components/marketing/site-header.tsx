"use client";

import {useActionState, useEffect, useOptimistic, useState, useTransition} from "react";
import Link from "next/link";
import {AlertCircle, ArrowUpRight, Bell, Building2, Check, Eye, Home, LogIn, LogOut, Menu, MessageCircle, Search, ShieldCheck, UserPlus} from "lucide-react";
import {signOutAction} from "@/queries/auth/auth-actions";
import {readMessageAction, sendMessageReplyAction} from "@/queries/messages/message-actions";

import {BrandMark} from "@/components/marketing/brand-mark";
import {Button} from "@/components/ui/button";
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import type {SiteUser} from "@/types/auth/user";
import type {MessageNotification} from "@/types/messages/message";

const links = [
  {label: "Properties", href: "/properties", icon: Search},
  {label: "How it works", href: "/#how-it-works", icon: ShieldCheck},
];

export function SiteHeader({user, notifications}: {user: SiteUser | null; notifications: MessageNotification[]}) {
  const initials =
    user?.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";
  const navigationLinks = [
    ...links,
    user?.role === "OWNER"
      ? {label: "Owner dashboard", href: "/owner/properties", icon: Building2}
      : {
          label: "List a property",
          href: "/register?role=OWNER",
          icon: Building2,
        },
  ];
  return (
    <header id="top" className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="liquid-glass mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[1.35rem] px-3 sm:px-4 lg:px-5">
        <BrandMark />

        <NavigationMenu className="hidden md:flex" aria-label="Primary navigation">
          <NavigationMenuList className="rounded-xl p-1">
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild>
                  <Link href={link.href} className={cn(navigationMenuTriggerStyle(), "h-9 rounded-lg bg-transparent px-4 text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/85 hover:text-primary hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_18px_-8px_rgba(15,118,110,0.75)] focus:bg-white/80 focus:text-primary")}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 sm:flex">
          {user ? (
            <>
              <NotificationMenu currentUserId={user.id} notifications={notifications} />
              <ProfileMenu user={user} initials={initials} />
            </>
          ) : (
            <>
              <Button variant="ghost" className="rounded-xl text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:text-teal-800 hover:shadow-md" asChild>
                <Link href="/login">
                  <LogIn aria-hidden="true" /> Sign in
                </Link>
              </Button>
              <Button className="liquid-glass-primary rounded-xl px-5 transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:shadow-teal-900/30" asChild>
                <Link href="/register">
                  Get started <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl transition-all hover:scale-105 hover:bg-white/90 hover:text-teal-800 hover:shadow-md sm:hidden" aria-label="Open navigation menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88%] border-l border-white/80 bg-white/80 p-0 shadow-2xl backdrop-blur-3xl sm:max-w-sm">
            <SheetHeader className="border-b border-white/80 bg-white/30 px-6 py-6 text-left">
              <SheetTitle className="sr-only">SmartRent navigation</SheetTitle>
              <SheetDescription className="sr-only">Browse SmartRent pages and account options.</SheetDescription>
              <BrandMark />
            </SheetHeader>

            <div className="flex h-[calc(100%-89px)] flex-col px-4 py-6">
              <nav className="space-y-1" aria-label="Mobile navigation">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-teal-50 hover:text-primary">
                    <Home className="size-5" aria-hidden="true" /> Home
                  </Link>
                </SheetClose>
                {navigationLinks.map(({label, href, icon: Icon}) => (
                  <SheetClose asChild key={label}>
                    <Link href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-teal-50 hover:text-primary">
                      <Icon className="size-5" aria-hidden="true" /> {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto space-y-3 border-t border-slate-200 pt-6">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl bg-teal-50 p-3">
                      <span className="grid size-10 place-items-center rounded-full bg-teal-700 text-sm font-bold text-white">{initials}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                        <p className="text-xs capitalize text-slate-500">{user.role.toLowerCase()}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <Bell className="size-4" /> Recent messages
                      </p>
                      {notifications.length ? (
                        notifications.slice(0, 3).map((notification) => (
                          <form action={readMessageAction} key={notification.id}>
                            <input type="hidden" name="messageId" value={notification.id} />
                            <SheetClose asChild>
                              <button type="submit" className="block w-full rounded-lg bg-slate-50 p-3 text-left">
                                <NotificationPreview notification={notification} />
                              </button>
                            </SheetClose>
                          </form>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500">No messages yet.</p>
                      )}
                    </div>
                    <form action={signOutAction}>
                      <Button variant="outline" className="h-11 w-full rounded-xl">
                        <LogOut /> Log out
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button variant="outline" className="h-11 w-full rounded-xl" asChild>
                        <Link href="/login">
                          <LogIn /> Sign in
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button className="h-11 w-full rounded-xl shadow-md shadow-teal-900/15" asChild>
                        <Link href="/register">
                          <UserPlus /> Create account
                        </Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function ProfileMenu({user, initials}: {user: {name: string; role: string}; initials: string}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="grid size-10 place-items-center rounded-full bg-teal-700 text-sm font-bold text-white shadow-sm outline-none ring-offset-2 transition-all hover:-translate-y-0.5 hover:scale-105 hover:bg-teal-800 hover:shadow-lg hover:shadow-teal-900/25 focus-visible:ring-2 focus-visible:ring-teal-600" aria-label={`Open profile menu for ${user.name}`}>
          {initials}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
        <DropdownMenuLabel>
          <span className="block truncate">{user.name}</span>
          <span className="text-xs font-normal capitalize text-slate-500">{user.role.toLowerCase()} account</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/properties">
            <Search /> Browse properties
          </Link>
        </DropdownMenuItem>
        {user.role === "OWNER" && (
          <DropdownMenuItem asChild>
            <Link href="/owner/properties">
              <Building2 /> Owner dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <button type="submit" className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-slate-100 focus-visible:bg-slate-100">
            <LogOut className="size-4" /> Log out
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationMenu({currentUserId, notifications}: {currentUserId: string; notifications: MessageNotification[]}) {
  const unread = notifications.filter((item) => !item.is_read).length;
  const [replyId, setReplyId] = useState<string | null>(null);
  const selected = notifications.find((item) => item.id === replyId) ?? null;
  const [replyState, replyAction] = useActionState(sendMessageReplyAction, {});
  const [, startReadTransition] = useTransition();
  const [dismissedFailure, setDismissedFailure] = useState<string | null>(null);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(selected?.conversation ?? [], (messages, message: MessageNotification["conversation"][number]) => [...messages, message]);
  const replyPending = false;
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const thread = document.querySelector<HTMLDivElement>(".max-h-80.space-y-2.overflow-y-auto");
      if (thread) thread.scrollTop = thread.scrollHeight;
    });
    return () => cancelAnimationFrame(frame);
  }, [replyId, optimisticMessages.length]);

  function markRead(messageId: string) {
    const data = new FormData();
    data.set("messageId", messageId);
    startReadTransition(() => {
      void readMessageAction(data);
    });
  }
  function openReply(notification: MessageNotification) {
    setReplyId(notification.id);
    markRead(notification.id);
  }
  async function sendReply(data: FormData) {
    const content = String(data.get("message") ?? "").trim();
    if (content)
      addOptimisticMessage({
        id: `sent-${Date.now()}`,
        property_id: String(data.get("propertyId")),
        sender_id: currentUserId,
        receiver_id: String(data.get("otherUserId")),
        content,
        created_at: new Date().toISOString(),
      });
    const textarea = document.querySelector<HTMLTextAreaElement>('[role="dialog"] textarea[name="message"]');
    if (textarea) textarea.value = "";
    await replyAction(data);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative grid size-10 place-items-center rounded-full text-slate-700 outline-none ring-offset-2 transition-all hover:-translate-y-0.5 hover:scale-105 hover:bg-white/90 hover:text-teal-800 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-teal-600" aria-label={`Messages${unread ? `, ${unread} unread` : ""}`}>
            <Bell className="size-5" />
            {unread > 0 && <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-5 text-white">{unread}</span>}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96 rounded-xl p-2">
          <DropdownMenuLabel>Recent inquiries and replies</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length ? (
            notifications.map((notification) => (
              <div key={notification.id} className="rounded-lg p-3 hover:bg-slate-50">
                <NotificationPreview notification={notification} />
                <div className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-2">
                  <form action={readMessageAction}>
                    <input type="hidden" name="messageId" value={notification.id} />
                    <input type="hidden" name="intent" value="view" />
                    <Button type="submit" variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      <Eye /> View listing
                    </Button>
                  </form>
                  <Button type="button" variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => openReply(notification)}>
                    <MessageCircle /> Reply
                  </Button>
                  {notification.is_read ? (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400">
                      <Check className="size-3" /> Read
                    </span>
                  ) : (
                    <form action={readMessageAction} className="ml-auto">
                      <input type="hidden" name="messageId" value={notification.id} />
                      <Button type="submit" variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        Mark as read
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="px-3 py-6 text-center text-sm text-slate-500">No messages yet.</p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setReplyId(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl p-0">
          {selected && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{selected.propertyTitle}</DialogTitle>
                <DialogDescription>Property conversation</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b p-5">
                <div
                  className="min-h-24 rounded-xl bg-slate-100 bg-cover bg-center"
                  style={
                    selected.imageUrl
                      ? {
                          backgroundImage: `url(${JSON.stringify(selected.imageUrl)})`,
                        }
                      : undefined
                  }
                  role="img"
                  aria-label={`${selected.propertyTitle} cover`}
                />
                <div className="min-w-0 self-center">
                  <h2 className="truncate text-xl font-semibold text-slate-950">{selected.propertyTitle}</h2>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {selected.nightlyPrice && (
                      <span>
                        <strong>PKR {Number(selected.nightlyPrice).toLocaleString("en-PK")}</strong> / night
                      </span>
                    )}
                    {selected.monthlyPrice && (
                      <span>
                        <strong>PKR {Number(selected.monthlyPrice).toLocaleString("en-PK")}</strong> / month
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="max-h-80 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-4">
                  {optimisticMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm ${message.sender_id === currentUserId ? "rounded-br-sm bg-teal-700 text-white" : "rounded-bl-sm border bg-white text-slate-700"}`}>
                        <p className="whitespace-pre-wrap wrap-break-word">{message.content}</p>
                        <p className={`mt-1 text-[10px] ${message.sender_id === currentUserId ? "text-teal-100" : "text-slate-400"}`}>{message.id.startsWith("optimistic-") ? "Sending…" : new Date(message.created_at).toLocaleString("en-PK")}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form action={sendReply} className="mt-4 space-y-3">
                  <input type="hidden" name="propertyId" value={selected.property_id} />
                  <input type="hidden" name="otherUserId" value={selected.otherUserId} />
                  <Textarea name="message" required maxLength={1000} rows={3} placeholder="Write a reply..." />
                  <Button type="submit" className="w-full" disabled={replyPending}>
                    <MessageCircle /> {replyPending ? "Sending..." : "Send reply"}
                  </Button>
                </form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!replyState.error && replyState.attemptId !== dismissedFailure}
        onOpenChange={(open) => {
          if (!open) setDismissedFailure(replyState.attemptId ?? null);
        }}
      >
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-red-600" /> Failure to send inquiry
            </DialogTitle>
            <DialogDescription>{replyState.error}</DialogDescription>
          </DialogHeader>
          <Button type="button" onClick={() => setDismissedFailure(replyState.attemptId ?? null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

function NotificationPreview({notification}: {notification: MessageNotification}) {
  return (
    <div className="w-full min-w-0">
      <div className="flex items-center justify-between gap-3">
        <strong className="truncate text-sm text-slate-900">{notification.propertyTitle}</strong>
        <span className="flex shrink-0 items-center gap-2 text-[10px] text-slate-400">
          {notificationTime(notification.created_at)}
          {!notification.is_read && <span className="size-2 rounded-full bg-teal-600" />}
        </span>
      </div>
      <p className="mt-1 line-clamp-2 w-full text-xs leading-5 text-slate-600">{notification.content}</p>
    </div>
  );
}

function notificationTime(createdAt: string) {
  const date = new Date(createdAt),
    today = new Date();
  return date.toDateString() === today.toDateString()
    ? date.toLocaleTimeString("en-PK", {hour: "numeric", minute: "2-digit"})
    : date.toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
      });
}
