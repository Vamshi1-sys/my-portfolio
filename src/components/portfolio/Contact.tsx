import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Github, Linkedin, Instagram, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { profile } from "@/lib/portfolio-data";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Amazing Together"
          description="Have an opportunity, idea, or project? My inbox is always open."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold">Reach out directly</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                I usually reply within 24 hours.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-foreground/90 hover:text-gradient">
                  <Mail className="size-4 text-primary" /> {profile.email}
                </a>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-foreground/90 hover:text-gradient">
                  <Phone className="size-4 text-primary" /> {profile.phone}
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-4 text-primary" /> {profile.location}
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { Icon: Github, href: profile.socials.github, label: "GitHub" },
                { Icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
                { Icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid place-items-center size-11 rounded-full glass hover:scale-110 transition-transform"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-8 space-y-4"
          >
            <div>
              <label className="text-xs text-muted-foreground">Name</label>
              <input
                required
                type="text"
                className="mt-1 w-full rounded-xl bg-secondary/60 px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input
                required
                type="email"
                className="mt-1 w-full rounded-xl bg-secondary/60 px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                className="mt-1 w-full rounded-xl bg-secondary/60 px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors resize-none"
                placeholder="Tell me about your idea..."
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-5 py-3 text-sm font-medium text-primary-foreground glow-ring hover:scale-[1.02] transition-transform"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="size-4" /> Message sent
                </>
              ) : (
                <>
                  <Send className="size-4" /> Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
