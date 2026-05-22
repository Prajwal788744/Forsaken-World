import { Link, NavLink, useLocation } from "react-router-dom";
import { Skull, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/feed", label: "Stories" },
  { to: "/profile", label: "Profile" },
];

export const Navbar = () => {
  const loc = useLocation();
  const onAuth = loc.pathname === "/login" || loc.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-primary/10">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="grid place-items-center h-9 w-9 rounded-md bg-blood shadow-blood-sm group-hover:animate-pulse-blood transition-smooth">
            <Skull className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display font-black text-lg tracking-widest">
            FORSAKEN <span className="text-blood">WORLD</span>
          </span>
        </Link>

        {!onAuth && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium tracking-wide uppercase transition-smooth rounded-md",
                    isActive ? "text-primary text-glow-red" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Search className="h-4 w-4" />
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-blood shadow-blood-sm hover:shadow-blood transition-smooth font-display tracking-wider">
            <Link to="/signup">Enter</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
