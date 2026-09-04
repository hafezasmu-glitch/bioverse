import type { Metadata } from "next";
import { getAllTerms } from "@/lib/content";
import { DictionaryBrowser } from "@/components/dictionary/DictionaryBrowser";
import { IconTile } from "@/components/ui/IconTile";
import { BookIcon } from "@/components/ui/MiscIcons";

export const metadata: Metadata = {
  title: "Biological Dictionary",
  description:
    "Search the BioVerse biological dictionary in English or বাংলা — bilingual, cross-linked definitions of key biology terms.",
};

export default function DictionaryPage() {
  const terms = getAllTerms();
  return (
    <div>
      <div className="bio-grid border-b border-panel-border">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <IconTile icon={<BookIcon className="h-7 w-7" />} size="lg" className="mx-auto" />
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Biological Dictionary</h1>
          <p className="mx-auto mt-2 max-w-xl text-fg-muted">
            {terms.length} verified sample entries in this build — English and বাংলা side by side. The
            content architecture (see the project README) is built to scale to thousands of entries.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <DictionaryBrowser terms={terms} />
      </div>
    </div>
  );
}
