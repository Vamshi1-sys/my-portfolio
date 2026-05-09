import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const profile = {
  name: "Siliveru Vamshi",
  role: "Web Developer | AI & Data Science Student",
  tagline: "Building modern digital experiences with AI & creativity",
  email: "svamshi282@gmail.com",
  phone: "+91 93907 75645",
  location: "Khammam, Telangana, India",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
};

export const skills = [
  { name: "Python", level: 90 },
  { name: "C Programming", level: 85 },
  { name: "Java Programming", level: 80 },
  { name: "Web Development", level: 88 },
  { name: "UI / UX Design", level: 84 },
  { name: "AI Tools", level: 86 },
  { name: "Video Editing", level: 90 },
  { name: "Problem Solving", level: 88 },
];

export const softSkills = [
  "Communication",
  "Leadership",
  "Teamwork",
  "Time Management",
  "Client Handling",
];

export const projects = [
  {
    title: "ERP System Development",
    description:
      "Developed an ERP system to manage organizational data and streamline workflows efficiently.",
    image: project1,
    tech: ["Python", "Database Management", "UI Design"],
    github: "#",
    demo: "#",
  },
  {
    title: "Restaurant KOT System",
    description:
      "Designed a Kitchen Order Ticket system that improves communication between restaurant staff and kitchen teams.",
    image: project2,
    tech: ["Python", "UI Design", "System Management"],
    github: "#",
    demo: "#",
  },
  {
    title: "UI / UX Design Project",
    description:
      "Created modern user-friendly interface designs focused on usability, accessibility, and user experience.",
    image: project3,
    tech: ["Figma", "UI/UX Design"],
    github: "#",
    demo: "#",
  },
  {
    title: "AI YouTube Script Generator",
    description:
      "AI-powered system that generates engaging Telugu YouTube scripts automatically using trending topics.",
    image: project1,
    tech: ["AI Tools", "Python", "Automation"],
    github: "#",
    demo: "#",
  },
];

export const timeline = [
  {
    year: "2025 — Present",
    title: "Freelance Video Editor",
    place: "Self-Employed · Delivered professional edits, managed clients, met every deadline.",
    kind: "Experience",
  },
];

export const education = [
  {
    year: "2023 — 2027",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    place: "Dhanalakshmi Srinivasan University",
  },
  {
    year: "2021 — 2023",
    degree: "Intermediate (MPC)",
    place: "Krishnaveni Junior College",
  },
  {
    year: "2021",
    degree: "SSC (10th Grade)",
    place: "Triveni Talent School",
  },
];

export const achievements = [
  { value: 2, suffix: "nd", label: "Hackathon — ERP System" },
  { value: 2, suffix: "nd", label: "UI/UX Design Competition" },
  { value: 50, suffix: "+", label: "Freelance Projects" },
  { value: 4, suffix: "", label: "Featured Projects" },
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Telugu", level: "Native" },
  { name: "Tamil", level: "Conversational" },
];
