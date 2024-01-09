import { useEffect, useState } from "react";

// import icons from react icons
import { FaXmark, FaBars, FaBarsStaggered, FaBlog } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LuBookmarkPlus } from "react-icons/lu";
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
            }
            else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Library", path: "/shop" },
        { link: "Blog", path: "/blog" },
        { link: "Menu", path: "/admin/dashboard/favorite" },
        { link: <LuBookmarkPlus />, path: "/admin/dashboard/favorite"}
    ];
    return (
        <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 text-bold">
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-white" : ""
                }`}>
                <div className="flex justify-between items-center text-base gap-8">
                    <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2"></Link>

                    <ul className="md:flex space-x-12 hidden navitems">

                        {
                            navItems.map(({ link, path }) => <Link key={link} to={path} style={{ fontSize: '150%', fontFamily: 'fantasy'}} className="link block text-base cursor-pointer uppercase text-black text-bold hover:text-neutral-500">
                                {link}
                            </Link>)
                        }
                    </ul>

                    <div className="space-x-12 hidden lg:flex items-center"></div>

                    {/* menu btn, visible on mobile screen */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-black focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <FaXmark className="h-6 w-6 text-black" />
                            ) : (
                                <FaBarsStaggered className="h-5 w-5 text-black" />
                            )}
                        </button>
                    </div>
                </div>

                <div
                    className={`space-y-4 px-4 mt-16 py-7 bg-black ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}
                >
                    {
                        navItems.map(({ link, path }) => <a
                            Link={path} 
                            key={link}
                            onClick={toggleMenu}
                            className="block text-white hover:text-gray-500"
                        >
                            {link}
                        </a>)
                    }
                </div>
            </nav>
        </header>
    );
};

export default Navbar;