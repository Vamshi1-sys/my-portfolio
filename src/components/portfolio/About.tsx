import { motion } from "framer-motion";
import { Brain, Lightbulb, Users, Rocket, Target } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const traits = [
  { icon: Lightbulb, title: "Problem-Solving Mindset", text: "Breaking down complex problems into elegant, working solutions." },
  { icon: Target, title: "Leadership", text: "Driving projects forward with clarity, ownership, and direction." },
  { icon: Users, title: "Teamwork", text: "Collaborating openly and building together with strong communication." },
  { icon: Brain, title: "Continuous Learning", text: "Constantly exploring new tech, frameworks, and AI tools." },
  { icon: Rocket, title: "Innovation Mindset", text: "Turning ambitious ideas into premium, production-ready experiences." },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="About Me" title="Crafting ideas into experiences" />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8 hover-lift"
          >
            <p className="text-lg leading-relaxed text-foreground/90">
              I am a motivated and detail-oriented <span className="text-gradient font-semibold">B.Tech student</span> specializing in Artificial Intelligence and Data Science, with strong interests in web development, software engineering, UI/UX design, and AI-powered applications.
            </p>
            <p className="mt-4 text-muted-foreground">
              I enjoy building modern, efficient digital solutions using Python, C, Java, and modern web technologies. I'm also experienced in freelance video editing, client communication, and creative content production — always learning emerging tech and sharpening both my technical and creative skills.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {traits.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-5 hover-lift"
              >
                <div className="size-10 rounded-xl bg-primary-gradient grid place-items-center text-primary-foreground glow-ring">
                  <t.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
