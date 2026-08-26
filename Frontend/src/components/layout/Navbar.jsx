import { Link, NavLink } from "react-router-dom";

const Logo = () => (
  <Link to="/">
    <svg width="32" height="32" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M256 256 L128 256 L0 128 L128 128 Z" fill="black" />
      <path d="M256 128 L128 128 L0 0 L128 0 Z" fill="black" />
    </svg>
  </Link>
);

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg shadow-black/5 px-4 py-2.5 w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 sm:gap-8 transition-all">
      <Logo />
      <div className="hidden sm:flex items-center gap-6">
        <Link to="#" className="text-gray-900 text-sm font-medium hover:text-black hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer">Our story</Link>
        <Link to="#" className="text-gray-900 text-sm font-medium hover:text-black hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer">Expertise</Link>
        <Link to="#" className="text-gray-900 text-sm font-medium hover:text-black hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer">Our work</Link>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `text-sm font-medium transition-opacity whitespace-nowrap cursor-pointer ${
              isActive ? 'text-black font-semibold' : 'text-gray-900 hover:text-black hover:opacity-70'
            }`
          }
        >
          Products
        </NavLink>
      </div>
      <a href="#" className="bg-black text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-neutral-800 active:scale-95 transition-all shadow-md ml-auto sm:ml-0">Start a project</a>
    </nav>
  );
}