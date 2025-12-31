import { topics } from "@/data";

export function searchQuestions(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return topics.flatMap(topic =>
    (topic.problems ?? [])
      .filter(problem =>
        problem.title.toLowerCase().includes(q) ||
        problem.difficulty.toLowerCase().includes(q)
      )
      .map(problem => ({
        ...problem,
        topic: topic.title,
      }))
  );
}
