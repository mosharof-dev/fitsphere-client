"use client";

import { AlertDialog, Button as HeroButton } from "@heroui/react";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function DeleteConfirmDialog({ 
  onConfirm, 
  isLoading, 
  title = "Delete Item?", 
  description = "Are you sure you want to delete this item? This action cannot be undone. All data related to this item will be permanently removed."
}) {
  return (
    <AlertDialog>
      <HeroButton
        isIconOnly
        variant="light"
        className="h-8 w-8 min-w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors rounded-md"
        isDisabled={isLoading}
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </HeroButton>
      <AlertDialog.Backdrop className="bg-slate-900/80" variant="blur">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] bg-slate-900 border border-slate-800">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="items-center text-center">
              <AlertDialog.Icon status="danger">
                <AlertTriangle className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading className="text-slate-100">{title}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="text-slate-300">
              <p>{description}</p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex-col-reverse">
              <HeroButton className="w-full bg-slate-800 text-slate-300 hover:bg-slate-700" slot="close" isDisabled={isLoading}>
                Cancel
              </HeroButton>
              <HeroButton className="w-full bg-red-500 text-white hover:bg-red-600" slot="close" onPress={onConfirm} isLoading={isLoading}>
                Delete Forever
              </HeroButton>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
