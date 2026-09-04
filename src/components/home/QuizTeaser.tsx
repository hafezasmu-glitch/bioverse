import { getAllQuizzes } from "@/lib/content";
import { BioCard } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuizIcon } from "@/components/ui/MiscIcons";

export function QuizTeaser() {
  const quizzes = getAllQuizzes();
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading title="Quiz & Challenges" subtitle="Every question comes with an explanation, not just right or wrong." />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {quizzes.map((q) => (
          <BioCard key={q.slug} href={`/quiz/${q.slug}`} className="p-5">
            <IconTile icon={<QuizIcon className="h-5 w-5" />} size="sm" />
            <h3 className="mt-3 font-semibold">{q.title.en}</h3>
            <p className="mt-1 text-sm text-fg-muted">{q.description.en}</p>
            <span className="mt-3 inline-block text-xs uppercase tracking-wide text-fg-subtle">
              {q.questions.length} questions
            </span>
          </BioCard>
        ))}
      </div>
    </section>
  );
}
