import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Download, FolderGit2, ArrowRight } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { profile } from "@/lib/portfolio-data";

const phrases = [
  "Web Developer",
  "AI & Data Science Student",
  "UI / UX Designer",
  "Creative Content Producer",
];

function useTyping(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDel(true), pause);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return text;
}

export function Hero() {
  const typed = useTyping(phrases);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background blobs */}
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
      <div aria-hidden className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-aurora opacity-30 blur-3xl animate-blob" />
      <div aria-hidden className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-primary-gradient opacity-25 blur-3xl animate-blob animation-delay-4s" />

      <div className="mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-primary animate-pulse-glow" />
            Available for internships
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Hi, I'm <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
            {profile.role}
          </p>
          <p className="mt-3 max-w-xl text-foreground/80">
            Passionate about building modern digital experiences using AI, web technologies, and creative problem-solving.
          </p>
          <p className="mt-6 text-2xl sm:text-3xl font-display font-semibold">
            I build <span className="text-gradient caret">{typed}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary-gradient px-5 py-3 text-sm font-medium text-primary-foreground glow-ring hover:scale-[1.03] transition-transform"
            >
              <FolderGit2 className="size-4" /> View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover-lift"
            >
              <Download className="size-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border border-border hover:bg-secondary transition-colors"
            >
              <Mail className="size-4" /> Contact Me
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {[
              { Icon: Github, href: profile.socials.github, label: "GitHub" },
              { Icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
              { Icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
              { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid place-items-center size-11 rounded-full glass hover:text-foreground text-muted-foreground hover:scale-110 transition-all"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 -m-6 rounded-full bg-aurora opacity-50 blur-3xl animate-pulse-glow" />
          <div className="relative size-[280px] sm:size-[360px] rounded-full p-[2px] bg-aurora glow-ring animate-float">
            <div className="size-full rounded-full overflow-hidden glass-strong">
              <img
                src={profileImg}
                alt={`${profile.name} portrait`}
                width={768}
                height={768}
                className="size-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
