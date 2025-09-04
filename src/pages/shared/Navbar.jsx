import { useEffect, useState } from "react";
import { FaXmark, FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Library", path: "/library" },
        { link: "Blog", path: "/blog" },
        { link: "Dashboard", path: "/admin/dashboard" },
    ];

    return (
        <header className="w-full fixed top-0 left-0 right-0 z-50">
            <nav
                className={`transition-all duration-300 px-4 lg:px-24 py-4 
                    ${isSticky ? "bg-white shadow-md" : "bg-black bg-opacity-50"}
                `}
            >
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className={`text-2xl font-bold flex items-center gap-2 transition-colors
                            ${isSticky ? "text-gray-900" : "text-white"}
                        `}
                    >
                        📚 BookStore
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex space-x-8 items-center">
                        {navItems.map(({ link, path }) => (
                            <Link
                                key={link}
                                to={path}
                                className={`uppercase text-[1rem] font-semibold transition-colors 
                                    ${isSticky ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-yellow-400"}
                                `}
                            >
                                {link}
                            </Link>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            {isMenuOpen ? (
                                <FaXmark className="h-6 w-6 text-white" />
                            ) : (
                                <FaBarsStaggered className="h-6 w-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden mt-4 bg-black bg-opacity-90 rounded-md transition-all duration-300
                        ${isMenuOpen ? "block" : "hidden"}
                    `}
                >
                    <ul className="flex flex-col px-4 py-4 space-y-3">
                        {navItems.map(({ link, path }) => (
                            <Link
                                key={link}
                                to={path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white text-lg hover:text-yellow-400 transition"
                            >
                                {link}
                            </Link>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
