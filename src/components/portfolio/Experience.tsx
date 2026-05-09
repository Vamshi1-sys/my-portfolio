import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { timeline } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading
          eyebrow="Journey"
          title="Education & Experience"
          description="Milestones, certifications, and moments that shaped my path."
        />
        <div className="relative pl-6 sm:pl-10">
          <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative mb-8"
            >
              <div className="absolute -left-[14px] sm:-left-[22px] top-3 size-3 rounded-full bg-primary-gradient glow-ring animate-pulse-glow" />
              <div className="glass rounded-2xl p-5 hover-lift">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t.kind}
                  </span>
                  <span className="text-xs text-gradient font-medium">{t.year}</span>
                </div>
                <h3 className="mt-2 font-semibold text-lg">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.place}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
