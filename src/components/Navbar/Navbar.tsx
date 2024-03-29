
// Importing necessary modules and components
import { FunctionComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import budgetbites from "../../assets/budgetbites.png";
import "./Navbar.scss";
import { IconMap, IconChefHat, IconShoppingCart, IconBook } from "@tabler/icons-react";

// Defining the Navbar component
const Navbar: FunctionComponent = () => {
    // Rendering the Navbar component
    return (
        <nav className="bg-[#161a42] sticky h-screen py-5">
            {/* Home link with logo */}
            <Link to="/" className="home-link">
                <div className="flex items-center justify-center mb-8">
                    <img
                        src={budgetbites}
                        className="w-[100px] h-[100px] rounded-full object-cover inline"
                    />
                    <h1 className="text-white text-2xl inline"> WasteEDU</h1>
                </div>
            </Link>

            {/* Navigation links */}
            <NavLink className="text-white flex gap-3 text-lg" to="/lessons">
                <IconBook />
                <span className="block">Lessons</span>
            </NavLink>
            <NavLink className="text-white flex gap-3 text-lg" to="/map">
                <IconMap />
                <span className="text-white block">Map</span>
            </NavLink>
            <NavLink className="text-white flex gap-3 text-lg" to="/recipe">
                <IconChefHat />
                <span className="block">Recipe</span>
            </NavLink>
            <NavLink className="text-white flex gap-3 text-lg" to="/cart">
                <IconShoppingCart />
                <span className="block">My Cart</span>
            </NavLink>
        </nav>
    );
};

// Exporting the Navbar component
export default Navbar;
