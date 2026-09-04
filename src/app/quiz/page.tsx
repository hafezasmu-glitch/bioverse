import type { Metadata } from "next";
import { getAllQuizzes } from "@/lib/content";
import { BioCard } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { QuizIcon } from "@/components/ui/MiscIcons";

export const metadata: Metadata = {
  title: "Quiz",
  description: "Biology quizzes with an explanation for every answer, not just right or wrong.",
};

export default function QuizIndexPage() {
  const quizzes = getAllQuizzes();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Quiz &amp; Challenges</h1>
        <p className="mt-2 text-fg-muted">Pick a quiz below. Every answer comes with a short explanation.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {quizzes.map((q) => (
          <BioCard key={q.slug} href={`/quiz/${q.slug}`} className="p-5">
            <IconTile icon={<QuizIcon className="h-5 w-5" />} size="sm" />
            <h2 className="mt-3 font-semibold">{q.title.en}</h2>
            <p className="mt-1 text-sm text-fg-muted">{q.description.en}</p>
            <span className="mt-3 inline-block text-xs uppercase tracking-wide text-fg-subtle">
              {q.questions.length} questions
            </span>
          </BioCard>
        ))}
      </div>
    </div>
  );
}
