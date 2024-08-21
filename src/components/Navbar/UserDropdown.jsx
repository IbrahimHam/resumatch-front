import React, { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleDropdownClose = () => {
    document.body.style.overflow = "auto";
    setIsDropdownOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={handleDropdownToggle}>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-black dark:text-white text-sm mr-2">
            {user?.fullName}
          </span>
          <img
            src="https://avatar.vercel.sh/user"
            alt="User Avatar"
            className="rounded-full w-8 h-8 cursor-pointer"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClose={handleDropdownClose}
        className="bg-white shadow-xl dark:bg-slate-900 p-2"
      >
        <DropdownMenuLabel>
          {user?.fullName}
          <span className="block text-gray-400 text-xs">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem className="hover:bg-blue-600 transition-colors text-xs hover:text-white cursor-pointer rounded-md px-2">
            <User className="mr-2 size-5" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link to="/settings">
          <DropdownMenuItem className="hover:bg-blue-600 transition-colors text-xs hover:text-white cursor-pointer rounded-md px-2">
            <Settings className="mr-2 size-5" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={logout}
          className="hover:bg-red-600 transition-colors text-xs text-red-500 hover:text-white cursor-pointer rounded-md px-2"
        >
          <LogOut className="mr-2 size-5" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
