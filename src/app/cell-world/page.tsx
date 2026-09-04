import type { Metadata } from "next";
import { CellWorldExplorerLazy as CellWorldExplorer } from "@/components/three/CellWorldExplorerLazy";
import { BilingualPageIntro } from "@/components/ui/BilingualPageIntro";

export const metadata: Metadata = {
  title: "Cell World",
  description:
    "Explore animal and plant cells in real 3D: rotate, isolate organelles, toggle labels, and compare the two cell types side by side.",
};

export default function CellWorldPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <BilingualPageIntro
        worldKey="cell-world"
        title={{ en: "Cell World", bn: "কোষ জগৎ" }}
        description={{
          en: "Rotate the cell, select an organelle to learn its function, or compare animal and plant cells side by side.",
          bn: "কোষটি ঘোরান, কোনো অঙ্গাণু নির্বাচন করে তার কাজ জানুন অথবা প্রাণী ও উদ্ভিদকোষ পাশাপাশি তুলনা করুন।",
        }}
      />
      <CellWorldExplorer />
    </div>
  );
}
