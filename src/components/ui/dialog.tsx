"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";

import { cn } from "@/lib/utils";

function Dialog({ ...props }: AlertDialog.Root.Props) {
  return <AlertDialog.Root {...props} />;
}

function DialogPortal({ ...props }: AlertDialog.Portal.Props) {
  return <AlertDialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogBackdrop({ className, ...props }: AlertDialog.Backdrop.Props) {
  return (
    <AlertDialog.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 transition-opacity duration-150",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function DialogPopup({ className, ...props }: AlertDialog.Popup.Props) {
  return (
    <AlertDialog.Popup
      data-slot="dialog-popup"
      className={cn(
        "fixed top-1/2 left-1/2 z-50 w-full max-w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-10 shadow-lg outline-none transition-all duration-150",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: AlertDialog.Title.Props) {
  return (
    <AlertDialog.Title
      data-slot="dialog-title"
      className={cn("text-center text-2xl font-semibold text-brand-blue", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: AlertDialog.Description.Props) {
  return (
    <AlertDialog.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-center text-sm", className)}
      {...props}
    />
  );
}

function DialogClose({ className, ...props }: AlertDialog.Close.Props) {
  return <AlertDialog.Close data-slot="dialog-close" className={cn(className)} {...props} />;
}

export { Dialog, DialogPortal, DialogBackdrop, DialogPopup, DialogTitle, DialogDescription, DialogClose };
