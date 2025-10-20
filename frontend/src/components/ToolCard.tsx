import Link from 'next/link';

interface ToolCardProps {
  tool: {
    slug: string;
    name: string;
    description: string;
    stars: number;
    language: string;
    category: {
      name: string;
    };
  };
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Link href={`/tool/${tool.slug}`}>
      <div className="block rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700">
        <h3 className="text-lg font-bold">{tool.name}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {tool.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="font-semibold">{tool.language}</span>
          <span>⭐ {tool.stars}</span>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
