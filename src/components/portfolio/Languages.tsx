import { motion } from "framer-motion";
import { Languages as LangIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { languages } from "@/lib/portfolio-data";

export function Languages() {
  return (
    <section id="languages" className="relative py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow="Languages" title="Languages I speak" />
        <div className="grid sm:grid-cols-3 gap-5">
          {languages.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover-lift text-center"
            >
              <div className="mx-auto size-12 rounded-2xl bg-primary-gradient grid place-items-center text-primary-foreground glow-ring">
                <LangIcon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{l.name}</h3>
              <p className="text-sm text-muted-foreground">{l.level}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
