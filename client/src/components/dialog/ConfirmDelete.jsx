import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { useMediaQuery } from "../../hooks/use-media-query";
import { useDeletePost } from "../../api/deletePost";
import { toast } from "sonner";
import LoadingButton from "../ui/loading-button";
import { useNavigate } from "react-router-dom";

export function ConfirmDelete({ isOpen, setIsOpen, postId }) {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)"); // Calling custom hook to get screen size

  // onSuccess function execute after Successful response from server
  function onSuccess() {
    toast.success("Post deleted successfully!");
    navigate("/");
  }

  const delete_mutation = useDeletePost(onSuccess); // React-Query Mutation function to send a DELETE method to delete a post

  function handleDelete() {
    delete_mutation.mutate(postId); // Call the DELETE request (sending postID to server);
  }

  // Display a Dialog in Larger devices
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              post from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <LoadingButton
              isLoading={delete_mutation.isPending}
              size="sm"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Display a Drawer in Smaller devices
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the post
            from our servers.
          </DialogDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <LoadingButton
            isLoading={delete_mutation.isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
