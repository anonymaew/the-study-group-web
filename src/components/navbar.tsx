import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const { company } = router.query;
  if (company === undefined) return null;
  return (
    <nav className="fixed top-0 left-0 h-12 w-full bg-purple-800 text-white ">
      <div className="container mx-auto flex h-full w-full items-center px-8">
        <Link href={`/${company as string}`}>
          <a className="mx-4 text-lg font-bold hover:underline">
            {(company as string)
              .split("-")
              .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
              .join(" ")}
          </a>
        </Link>
        <Link href={`/${company as string}/courses/`}>
          <a className="mx-4 hover:underline">Courses</a>
        </Link>
        <Link href={`/${company as string}/users?type=teacher`}>
          <a className="mx-4 hover:underline">Teachers</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
