import { Loader2, LogInIcon, LogOutIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import NavItem from "@/components/NavItem";
import { Link, useLocation } from "react-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
type ActiveLink = "/" | "/products" | "/about";

export default function Header() {
  const { pathname } = useLocation();
  const [signOutLoading, setSignOutLoading] = useState(false);

  const { data: session } = authClient.useSession();

  const links: { to: ActiveLink; label: string }[] = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="container mx-auto pt-4">
      <div className="flex items-center justify-between gap-4">
        <div className="logo flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-accent">My</span>Store
          </h1>
        </div>

        <nav>
          <ul className="flex gap-6 text-gray-200 text-xl">
            {links.map((link) => (
              <NavItem
                key={link.to}
                to={link.to}
                isActive={pathname === link.to}
              >
                {link.label}
              </NavItem>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            <ShoppingCartIcon />
            {session ? (
              <Button
                variant={"secondary"}
                onClick={async () => {
                  setSignOutLoading(true);
                  await authClient.signOut();
                  setSignOutLoading(false);
                }}
              >
                {signOutLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <LogOutIcon />
                )}
              </Button>
            ) : (
              <Link to="/auth/signin">
                <Button variant={"secondary"}>
                  <LogInIcon />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
