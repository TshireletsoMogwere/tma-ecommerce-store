import { Link } from "react-router-dom";
import Search from "./Search";

function Header({ setSearchTerm }) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-orange-500">
        e-commerce store
      </Link>

      <Search setSearchTerm={setSearchTerm} />
    </header>
  );
}

export default Header;
