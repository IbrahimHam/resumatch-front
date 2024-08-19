import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { AuthContext } from "@/context/AuthContext";
import UserDropdown from "./UserDropdown";
import { Link, NavLink } from "react-router-dom";
import {
  House,
  BriefcaseBusiness,
  BookUser,
  MessageCircleQuestion,
} from "lucide-react";

const Navbar = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const recruiterNavItems =
    isLoggedIn && user.role === "recruiter"
      ? { title: "Post Job", path: "/post-job", icon: BriefcaseBusiness }
      : null;

  const userNavItems =
    isLoggedIn && user.role === "user"
      ? { title: "Create Resume", path: "/resume", icon: House }
      : null;

  const navItems = [
    { title: "Home", path: "/create-resume/1", icon: House },
    { title: "Jobs", path: "/jobs", icon: BriefcaseBusiness },
    { title: "Hire", path: "/hire", icon: BookUser },
    recruiterNavItems,
    userNavItems,
    { title: "FAQ", path: "/faq", icon: MessageCircleQuestion },
  ].filter(Boolean);

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 max-sm:px-0">
        <nav className="flex justify-between items-center py-4">
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <img
                src="/1.png"
                alt="Logo"
                className="h-10 w-auto transition duration-500 hover:contrast-200 hover:brightness-110"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-6 md:hidden">
            <Link to="/">
              <img
                src="/2.png"
                alt="Logo"
                className="h-10 w-auto transition duration-200 hover:scale-110"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-black dark:text-white max-sm:space-x-0">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 transition-colors hover:text-blue-600"
                    : "transition-colors hover:text-blue-600"
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-4 max-sm:space-x-2">
            <ThemeToggle />
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 text-white">Register</Button>
                </Link>
              </>
            )}
            <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 p-4 absolute top-full left-0 right-0 shadow-md">
          {/* Mobile Menu */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {navItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 hover:bg-blue-100 hover:dark:bg-slate-600 border border-gray-100/10 p-4 rounded-md shadow-lg"
              >
                {/* Add your icon component here */}
                <span className="text-2xl">
                  <item.icon />
                </span>
                <span className="mt-2">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
