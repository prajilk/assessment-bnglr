import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

const Sidebar = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Simple Blog</SheetTitle>
        </SheetHeader>
        <div className="my-7 flex flex-col gap-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
