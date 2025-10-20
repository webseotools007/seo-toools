import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Categories</h3>
            <Link href="/categories" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              All Categories
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Community</h3>
            <Link href="/submit-tool" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Submit a Tool
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Resources</h3>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              GitHub
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">About</h3>
            <Link href="/about" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
