import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center mb-14"
    >
      <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
        <span className="text-gradient">{title}</span>
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
