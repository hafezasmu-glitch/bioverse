"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { WORLDS } from "@/lib/design/worlds";
import { IconTile } from "./IconTile";

export function BilingualPageIntro({
  worldKey,
  title,
  description,
}: {
  worldKey: keyof typeof WORLDS;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
}) {
  const { b } = useLanguage();
  const world = WORLDS[worldKey];

  return (
    <header className="mb-6 flex max-w-3xl items-start gap-4">
      <IconTile icon={<world.Icon className="h-6 w-6" />} color={world.color} />
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">{b(title)}</h1>
        <p className="mt-2 text-fg-muted">{b(description)}</p>
      </div>
    </header>
  );
}
