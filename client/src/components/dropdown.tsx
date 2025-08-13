import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
// import { User } from "lucide-react";
import CurentUserImages from "./curentUserImage";

interface DropdowmItem {
  name: string;
  url: string;
}
interface DropdownProps {
  data: DropdowmItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CurentUserImages className="w-8 h-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-1">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                to={item.url}
                className="w-full flex items-center gap-8 cursor-pointer"
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
