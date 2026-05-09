import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { skills } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I work with"
          description="A blend of engineering, design, and AI — the toolbox I keep sharpening every day."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass rounded-2xl p-5 hover-lift relative overflow-hidden"
            >
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-aurora blur-2xl pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <h3 className="font-semibold">{s.name}</h3>
                <span className="text-xs text-muted-foreground">{s.level}%</span>
              </div>
              <div className="relative mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.05, ease: "easeOut" }}
                  className="h-full bg-primary-gradient rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
