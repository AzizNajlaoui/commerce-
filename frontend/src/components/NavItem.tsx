import { Link } from "react-router";
import { cn } from "@/lib/utils";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

export default function NavItem({
  to,
  children,
  isActive,
  onClick,
  className,
  icon,
}: NavItemProps) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "flex items-center gap-2  rounded-md text-lg",
          isActive
            ? "underline underline-offset-4 decoration-accent font-medium"
            : "",
          className
        )}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </li>
  );
}
