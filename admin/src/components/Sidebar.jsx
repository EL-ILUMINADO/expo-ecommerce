import { useUser } from "@clerk/clerk-react";
import { ShoppingBagIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { NAVIGATION } from "./Navbar";

function Sidebar() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer"
        className="drawer-overlay"
        aria-label="Toggle Sidebar Close"
      ></label>

      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <div className="p-4 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <ShoppingBagIcon className="size-6 text-primary-content" />
            </div>
            <span className="text-xl font-bold is-drawer-close:hidden">
              Admin
            </span>
          </div>
        </div>

        {/* SIDEBAR */}
        <ul className="menu w-full grow flex flex-col gap-2">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-primary-content " : ""}`}
                >
                  {item.icon}
                  <span className="is-drawer-close:hidden">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="p-4 w-full">
          <div className="flex items-center gap-3">
            <div className="avatar shrink-0">
              <img
                src={user?.imageUrl}
                alt={user?.fullName}
                className="w-10 h-10 rounded-full"
              />
            </div>

            <div className="flex-1 min-w-0 is-drawer-close:hidden">
              <p className="text-sm font-semibold truncate">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
