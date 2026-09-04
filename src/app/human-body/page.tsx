import type { Metadata } from "next";
import { getAllOrgans } from "@/lib/content";
import { HumanBodyExplorerLazy as HumanBodyExplorer } from "@/components/three/HumanBodyExplorerLazy";
import { BioCard } from "@/components/ui/Card";
import { BilingualPageIntro } from "@/components/ui/BilingualPageIntro";
import { WORLDS } from "@/lib/design/worlds";

export const metadata: Metadata = {
  title: "Human Body Explorer",
  description:
    "A real WebGL 3D human anatomy explorer: toggle skin, skeletal and organ layers, use the X-ray slider, explode organs apart, and animate circulation with Make It Alive.",
};

export default function HumanBodyPage() {
  const organs = getAllOrgans();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BilingualPageIntro
        worldKey="human-body"
        title={{ en: "Human Body Explorer", bn: "মানবদেহ এক্সপ্লোরার" }}
        description={{
          en: "Rotate the figure, drag the X-ray slider, and select an organ to study it. Six referenced organs across five systems are included; each organ page lists its sources.",
          bn: "মানবদেহটি ঘোরান, এক্স-রে স্লাইডার ব্যবহার করুন এবং কোনো অঙ্গ নির্বাচন করে সেটি জানুন। পাঁচটি তন্ত্রের ছয়টি তথ্যসূত্রযুক্ত অঙ্গ রয়েছে; প্রতিটি অঙ্গের পাতায় উৎস দেওয়া আছে।",
        }}
      />

      <HumanBodyExplorer />

      <section className="mt-10">
        <h2 className="sr-only">Available organs / উপলভ্য অঙ্গসমূহ</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {organs.map((organ) => (
            <BioCard key={organ.slug} href={`/human-body/${organ.slug}`} accent={WORLDS["human-body"].color} className="p-3 text-center">
              <div className="text-sm font-medium">{organ.name.en}</div>
              <div className="text-xs text-fg-muted">{organ.name.bn}</div>
            </BioCard>
          ))}
        </div>
      </section>
    </div>
  );
}
