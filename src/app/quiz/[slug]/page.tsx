import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllQuizzes, getQuiz, getOrgan } from "@/lib/content";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { ReferenceList } from "@/components/ui/ReferenceList";

export function generateStaticParams() {
  return getAllQuizzes().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) return {};
  return { title: quiz.title.en, description: quiz.description.en };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) notFound();

  const relatedOrgan = quiz.relatedOrganSlug ? getOrgan(quiz.relatedOrganSlug) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-xs text-fg-subtle" aria-label="Breadcrumb">
        <Link href="/quiz" className="hover:text-accent">
          Quiz
        </Link>{" "}
        / {quiz.title.en}
      </nav>
      <header className="mb-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{quiz.title.en}</h1>
        <p className="mt-1 text-lg text-fg-muted">{quiz.title.bn}</p>
        <p className="mt-2 text-fg-muted">{quiz.description.en}</p>
        {relatedOrgan && (
          <Link
            href={`/human-body/${relatedOrgan.slug}`}
            className="bio-focus-ring mt-3 inline-block text-sm text-accent hover:underline"
          >
            ← Review {relatedOrgan.name.en} first
          </Link>
        )}
      </header>

      <QuizPlayer quiz={quiz} />

      <ReferenceList sourceIds={quiz.sourceIds} />
    </div>
  );
}
