import {useNavigate} from "@tanstack/react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <button
        className="text-xl font-bold tracking-wide hover:text-gray-200 transition duration-200"
        onClick={() => navigate({to: "/"})}>
        👽 TabLE
      </button>

      <button
        onClick={() => navigate({to: "/home"})}
        className="bg-amber-400 hover:bg-amber-500 text-black font-medium px-4 py-2 rounded-md transition duration-200">
        Home
      </button>
    </nav>
  );
};

export default Navbar;
