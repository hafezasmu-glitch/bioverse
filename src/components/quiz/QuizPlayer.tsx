"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Quiz } from "@/lib/content/types";
import { CheckIcon, XIcon } from "@/components/ui/MiscIcons";

export function QuizPlayer({ quiz }: { quiz: Quiz }) {
  const { b, t } = useLanguage();
  // answers[questionId] = selected option id
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(0);

  const answeredCount = Object.keys(answers).length;
  const total = quiz.questions.length;
  const score = useMemo(
    () =>
      quiz.questions.reduce((acc, q) => {
        const chosen = answers[q.id];
        const opt = q.options.find((o) => o.id === chosen);
        return acc + (opt?.correct ? 1 : 0);
      }, 0),
    [answers, quiz.questions]
  );
  const allAnswered = answeredCount === total;

  function choose(questionId: string, optionId: string) {
    if (answers[questionId]) return; // lock after first answer, like the spec's "explain why" flow
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  function retake() {
    setAnswers({});
    setAttempt((a) => a + 1);
  }

  return (
    <div key={attempt}>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-fg-muted">
          {answeredCount}/{total} answered
        </p>
        {allAnswered && (
          <p className="text-sm font-semibold text-accent">
            {t.common.score}: {score}/{total}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {quiz.questions.map((q, qi) => {
          const chosen = answers[q.id];
          return (
            <fieldset key={q.id} className="bio-panel rounded-2xl p-5">
              <legend className="mb-3 px-1 text-sm font-semibold">
                {qi + 1}. {b(q.prompt)}
              </legend>
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isChosen = chosen === opt.id;
                  const revealed = !!chosen;
                  const showCorrect = revealed && opt.correct;
                  const showWrongChosen = revealed && isChosen && !opt.correct;
                  return (
                    <div key={opt.id}>
                      <button
                        type="button"
                        onClick={() => choose(q.id, opt.id)}
                        disabled={revealed}
                        aria-pressed={isChosen}
                        className={`bio-focus-ring flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                          showCorrect
                            ? "border-success bg-success/10 text-success"
                            : showWrongChosen
                              ? "border-danger bg-danger/10 text-danger"
                              : "border-panel-border text-fg-muted hover:border-accent/40 hover:text-fg disabled:hover:border-panel-border"
                        }`}
                      >
                        <span>{b(opt.text)}</span>
                        {showCorrect && <CheckIcon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                        {showWrongChosen && <XIcon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                      </button>
                      {revealed && (isChosen || opt.correct) && (
                        <p
                          className={`mt-1 px-1 text-xs ${opt.correct ? "text-success" : "text-fg-muted"}`}
                        >
                          {b(opt.explanation)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      {allAnswered && (
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-panel-border p-5">
          <p className="font-semibold">
            {t.common.score}: {score}/{total} ({Math.round((score / total) * 100)}%)
          </p>
          <button
            onClick={retake}
            className="bio-focus-ring rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg"
          >
            {t.common.retake}
          </button>
        </div>
      )}
    </div>
  );
}
