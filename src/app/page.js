import HomeLogic from '@/components/HomeLogic';

export const metadata = {
  title: 'Anurag | Creative Full-Stack Developer',
  description: 'Welcome to the digital playground of Anurag Mishra. Explore creative projects, technical skills, and a journey through modern web development.',
  openGraph: {
    title: 'Anurag | Creative Full-Stack Developer',
    description: 'Welcome to the digital playground of Anurag Mishra. Explore creative projects, technical skills, and a journey through modern web development.',
    url: 'https://anurag.tech',
  },
};

export default function Home() {
  return <HomeLogic />;
}
