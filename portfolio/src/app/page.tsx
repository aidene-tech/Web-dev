import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";


import { HomeContent } from "@/components/home-content";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <HomeContent />
    </main>
  );
}
