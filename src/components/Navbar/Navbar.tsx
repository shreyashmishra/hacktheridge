import { FunctionComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import budgetbites from "../../assets/budgetbites.png";
import "./Navbar.scss";
import { IconMap, IconChefHat, IconShoppingCart } from "@tabler/icons-react";

const Navbar: FunctionComponent = () => {
    return (
        <nav className="bg-[#161a42] sticky h-screen py-5">
            <Link to="/" className="home-link">
                <div className="flex items-center justify-center mb-8">
                    <img
                        src={budgetbites}
                        className="w-[60px] h-[60px] rounded-full object-cover inline"
                    />
                    <h1 className="text-white text-2xl inline"> WasteEDU</h1>
                </div>
            </Link>
            <NavLink className="text-white flex gap-3 text-lg" to="/lessons">
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

export default Navbar;
