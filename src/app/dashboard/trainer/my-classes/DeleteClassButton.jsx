"use client";

import { TriangleExclamation } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { deleteClass } from "@/lib/actions/classes";
import { toast } from "sonner";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function DeleteClassButton({ classId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (session?.user?.status === "blocked") {
      toast.error("Action restricted by Admin. You are blocked from deleting classes.");
      return;
    }
    setIsDeleting(true);
    try {
      await deleteClass(classId);
      toast.success("Class has been deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete class.");
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-rose-500 hover:text-white transition-all duration-300 font-semibold text-sm border border-transparent hover:border-rose-400 h-auto"
        disableRipple
        variant="light"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </Button>
      <AlertDialog.Backdrop
        className="bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
        variant="blur"
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="items-center text-center">
              <AlertDialog.Icon status="danger">
                <TriangleExclamation className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>
                Permanently delete this class?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-warning">
                This action cannot be undone. All your data, settings, and
                content will be permanently removed from our servers. The
                dramatic red backdrop emphasizes the severity and
                irreversibility of this decision.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex-col-reverse">
              <Button className="w-full" slot="close">
                Keep Class
              </Button>
              <Button
                className="w-full"
                slot="close"
                variant="danger"
                onPress={handleDelete}
              >
                Delete Forever
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
