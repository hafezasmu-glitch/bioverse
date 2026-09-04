import type { Metadata } from "next";
import Link from "next/link";
import { DNAHelixCanvasLazy as DNAHelixCanvas } from "@/components/three/DNAHelixCanvasLazy";
import { PunnettSquare } from "@/components/genetics/PunnettSquare";
import { IconTile } from "@/components/ui/IconTile";
import { WORLDS } from "@/lib/design/worlds";

export const metadata: Metadata = {
  title: "Genetics Lab",
  description:
    "An interactive 3D DNA double helix and a fully working Punnett Square simulator for exploring Mendelian inheritance.",
};

export default function GeneticsPage() {
  const world = WORLDS.genetics;
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex max-w-2xl items-start gap-4">
        <IconTile icon={<world.Icon className="h-6 w-6" />} color={world.color} />
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Genetics Lab</h1>
          <p className="mt-2 text-fg-muted">
            DNA <Link href="/dictionary/dna" className="text-accent-2 hover:underline">→ Gene</Link> →{" "}
            <Link href="/dictionary/chromosome" className="text-accent-2 hover:underline">Chromosome</Link> →{" "}
            <Link href="/dictionary/genome" className="text-accent-2 hover:underline">Genome</Link>. Hover a
            rung on the helix to see its base pair, and try the Punnett Square below.
          </p>
        </div>
      </header>

      <DNAHelixCanvas />

      <div className="mt-10">
        <PunnettSquare />
      </div>
    </div>
  );
}
