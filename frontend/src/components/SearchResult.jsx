import { MoveRight } from "lucide-react";


export default function SearchResults({ results }) {
  if (results.length === 0) {
    return <p className="text-gray-400">No results found</p>;
  }

  return (
    <ul className="space-y-2">
      {results.map(q => (
        <li
          key={q.id}
          className="bg-(--bg-color) p-3 rounded text-white flex "
        >
          <MoveRight />
          <a href={q.url} target="_blank" className="hover:text-blue-400 pl-4">{q.title}</a>
          <span className="text-sm text-gray-400">
            {" "}— {q.topic}
          </span>
        </li>
      ))}
    </ul>
  );
}
