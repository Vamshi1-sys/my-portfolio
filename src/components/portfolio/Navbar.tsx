import { useEffect, useState } from "react";
import { Menu, X, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all ${
          scrolled ? "glass-strong" : "bg-transparent"
        }`}
      >
        <a href="#home" className="font-display text-lg font-bold text-gradient">
          &lt;Vamshi/&gt;
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary-gradient after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2">
          {isAdmin && (
            <span className="inline-flex items-center gap-1 rounded-full glass px-3 py-1.5 text-xs text-primary">
              <ShieldCheck className="size-3.5" /> Admin
            </span>
          )}
          {user ? (
            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-2 text-xs hover:text-foreground text-muted-foreground"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-2 text-xs hover:text-foreground text-muted-foreground"
              aria-label="Admin login"
            >
              <LogIn className="size-3.5" />
            </Link>
          )}
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-primary-gradient px-4 py-2 text-sm font-medium text-primary-foreground glow-ring hover:scale-[1.03] transition-transform"
          >
            Hire Me
          </a>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden grid place-items-center size-10 rounded-lg glass"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mx-auto mt-2 max-w-6xl px-4">
          <ul className="glass-strong rounded-2xl p-4 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-border">
              {user ? (
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <LogOut className="size-4" /> Sign out {isAdmin && "(Admin)"}
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <LogIn className="size-4" /> Admin Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
