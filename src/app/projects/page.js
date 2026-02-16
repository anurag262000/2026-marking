import ProjectsPage from "./Projects";

export const metadata = {
  title: "Projects",
  description: "Explore a curated collection of my full-stack development projects, ranging from immersive web apps to functional mobile applications. Built with React, Next.js, and more.",
  keywords: [
    "full-stack developer projects",
    "web development portfolio",
    "react projects",
    "next.js projects",
    "mobile apps",
    "creative coding",
    "case studies"
  ],
  openGraph: {
    title: "Projects | Anurag - Full-Stack Developer",
    description: "Explore a curated collection of my full-stack development projects, ranging from immersive web apps to functional mobile applications.",
    url: 'https://anurag.tech/projects',
  },
};

export default function Page() {
  return <ProjectsPage />;
}
