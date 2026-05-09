import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { education } from "@/lib/portfolio-data";

export function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          description="The foundations behind the engineer I'm becoming."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="glass rounded-3xl p-6 hover-lift relative overflow-hidden"
            >
              <div className="absolute -inset-px rounded-3xl opacity-0 hover:opacity-100 transition-opacity bg-aurora blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="size-11 rounded-xl bg-primary-gradient grid place-items-center text-primary-foreground glow-ring">
                  <GraduationCap className="size-5" />
                </div>
                <div className="mt-4 text-xs text-gradient font-medium">{e.year}</div>
                <h3 className="mt-1 font-semibold">{e.degree}</h3>
                <p className="text-sm text-muted-foreground">{e.place}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
