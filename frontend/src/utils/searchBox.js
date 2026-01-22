import { topics } from "@/data";

export function searchQuestions(query) {
  const q = query.toLowerCase().trim();
  const isNumber = /^\d+$/.test(q);

  if (!q) return [];

  return topics.flatMap(topic =>
    (topic.problems ?? [])
      .filter(problem =>
        problem.title.toLowerCase().includes(q) ||
        problem.difficulty.toLowerCase().includes(q) ||
        (isNumber && String(problem.q_id)===(q))
        
      )
      .map(problem => ({
        ...problem,
        topic: topic.title,
      }))
  );
}
