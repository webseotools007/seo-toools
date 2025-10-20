'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ToolCard from '../components/ToolCard';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Tool {
  _id: string;
  name: string;
  slug: string;
  description: string;
  stars: number;
  language: string;
  category: Category;
}

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('/api/tools');
        if (!res.ok) {
          throw new Error('Failed to fetch tools');
        }
        const data = await res.json();
        setTools(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-gray-100 py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-6xl">
            Discover the Best Open Source Tools.
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A curated directory of the best open-source tools for developers.
          </p>
          <Link
            href="/submit-tool"
            className="mt-8 inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Submit a Tool
          </Link>
        </div>
      </section>
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Tools</h2>
            {/* Filters will go here */}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : tools.length > 0 ? (
              tools.map((tool) => <ToolCard key={tool._id} tool={tool} />)
            ) : (
              <p>No tools found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
