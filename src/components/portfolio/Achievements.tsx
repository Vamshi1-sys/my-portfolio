import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Trophy, Youtube, Bot, Code2, BookOpen } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { achievements } from "@/lib/portfolio-data";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 1.6, ease: "easeOut" });
      return c.stop;
    }
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const cards = [
  { icon: Youtube, title: "YouTube Content Creator", text: "Sharing tech and creative content with a growing community." },
  { icon: Bot, title: "AI Project Builder", text: "Shipping AI-powered apps that solve real problems." },
  { icon: Code2, title: "Web Development Learner", text: "Mastering modern web stacks one project at a time." },
  { icon: BookOpen, title: "Consistent Self-Learner", text: "Daily coding, daily growth — no breaks, no excuses." },
];

export function Achievements() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Achievements" title="Numbers & milestones" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 text-center hover-lift"
            >
              <div className="text-3xl sm:text-4xl font-display font-bold text-gradient">
                <Counter to={a.value} suffix={a.suffix} />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-muted-foreground">{a.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 hover-lift"
            >
              <div className="size-10 rounded-xl bg-primary-gradient grid place-items-center text-primary-foreground glow-ring">
                <c.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted-foreground">
            <Trophy className="size-4 text-primary" /> Always shipping, always learning
          </div>
        </div>
      </div>
    </section>
  );
}
