import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-10 mt-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          © {new Date().getFullYear()} <span className="text-gradient font-semibold">{profile.name}</span>. Crafted with passion & caffeine.
        </div>
        <div className="flex gap-5">
          <a href="#home" className="hover:text-foreground transition-colors">Home</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
