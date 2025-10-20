import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold">Open Source Tools</span>
        </Link>
        <div className="flex-1 px-4 md:px-6">
          <input
            type="search"
            placeholder="Search tools..."
            className="w-full rounded-md border bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            Filters
          </button>
          {/* Dark/Light mode switch will go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
