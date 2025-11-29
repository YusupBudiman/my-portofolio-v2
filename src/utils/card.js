import Link from "next/link";

export default function Pro({ title, description, tools, github, demo }) {
  return (
    <div className="border rounded-xl p-4 shadow">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {tools.map((tool, index) => (
          <span
            key={index}
            className="bg-red-800 px-2 py-1 rounded-full text-center text-xs font-bold text-white"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="flex space-x-2">
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          github
        </Link>
        <Link
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          demo
        </Link>
      </div>
    </div>
  );
}
