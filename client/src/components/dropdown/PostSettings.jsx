import { FilePenLine, Settings, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ConfirmDelete } from "../dialog/ConfirmDelete";
import { useState } from "react";

const PostSettings = ({ slug, _id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ConfirmDelete isOpen={isOpen} setIsOpen={setIsOpen} postId={_id} />
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Settings />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Post settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <Link
              to={`/blog/edit/${slug}`}
              className="flex w-full items-center gap-2 px-2 py-1.5"
            >
              <FilePenLine size={15} />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2 text-destructive focus:bg-destructive/20 focus:text-destructive"
            onClick={() => setIsOpen(true)}
          >
            <Trash2 size={15} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PostSettings;
