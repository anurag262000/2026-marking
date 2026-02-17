import ContactPage from "@/components/sections/Contact";

export const metadata = {
  title: "Contact",
  description: "Let's build something amazing together. Get in touch for freelance opportunities, collaborations, or just to say hi. Based in Kurukshetra, India.",
  keywords: [
    "contact developer",
    "hire full-stack developer",
    "freelance web developer",
    "collaboration",
    "Kurukshetra",
    "India"
  ],
  openGraph: {
    title: "Contact | Anurag - Full-Stack Developer",
    description: "Let's build something amazing together. Get in touch for freelance opportunities, collaborations, or just to say hi.",
    url: 'https://anurag.tech/contact',
  },
};

export default function Page() {
  return <ContactPage />;
}
