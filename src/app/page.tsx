import { Hero } from "@/components/home/Hero";
import { WorldsGrid } from "@/components/home/WorldsGrid";
import { ScaleExplorer } from "@/components/home/ScaleExplorer";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { DictionaryTeaser } from "@/components/home/DictionaryTeaser";
import { QuizTeaser } from "@/components/home/QuizTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <WorldsGrid />
      <ScaleExplorer />
      <CredibilityStrip />
      <DictionaryTeaser />
      <QuizTeaser />
    </>
  );
}
