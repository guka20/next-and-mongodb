import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <span className="navbar-brand">Note App</span>
      </Link>
      <Link href="/new">
        <span className="create">Create note</span>
      </Link>
    </nav>
  );
};

export default Navbar;
