import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogPopup,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface SaveConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
  description?: string;
}

const actionButtonClassName =
  "h-auto gap-2 rounded-2xl px-3 py-2 text-[1.25rem] font-normal [&_svg:not([class*='size-'])]:size-6";

export function SaveConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  description = "Are you sure you want to save these changes?",
}: SaveConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col items-center gap-10">
            <div className="bg-brand-tangerine-light flex items-center rounded-full p-5">
              <Icon icon="solar:like-linear" className="text-brand-tangerine size-12" />
            </div>

            <div className="flex flex-col items-center gap-5">
              <DialogTitle>{description}</DialogTitle>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className={`${actionButtonClassName} text-brand-blue`}
                  onClick={() => onOpenChange(false)}
                  disabled={isPending}
                >
                  <Icon icon="mynaui:edit" />
                  Cancel
                </Button>
                <Button
                  type="button"
                  className={`${actionButtonClassName} bg-brand-tangerine text-brand-blue hover:bg-brand-tangerine-light`}
                  onClick={onConfirm}
                  disabled={isPending}
                >
                  <Icon icon="charm:tick" />
                  {isPending ? "Saving..." : "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
