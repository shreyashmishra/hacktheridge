import {
    FunctionComponent,
    useState,
    ChangeEvent,
    FormEvent,
    useEffect,
} from "react";
import "./Header.scss";
import { IconSearch, IconUserCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

const Header: FunctionComponent = () => {
    const { Geocoder, location } = useAppContext();
    const [search, setSearch] = useState("");
    const [city, setCity] = useState("Loading...");
    const navigate = useNavigate();

    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!search) navigate("/");
        else navigate(`/search/${encodeURIComponent(search)}`);
    }

    useEffect(() => {
        if (!location) return;
        Geocoder.geocode({
            location: { lat: location[0], lng: location[1] },
        }).then((res) => setCity(res.results[6].formatted_address));
    }, [Geocoder, location, setCity]);

    return (
        <header className="bg-[#0b0d29] w-full py-5 px-10 items-center grid grid-flow-column">
            <div className="text-[#D9D9D9] text-left justify-self-start">
                {city}
            </div>
            <div className="rounded-full bg-[#D9D9D9] justify-self-stretch px-[5px] flex">
                <IconSearch size={24} className="m-2" color="#444444" />
                <form onSubmit={handleSearch}>
                    <input
                        name="search"
                        placeholder="Search..."
                        className="w-full h-full bg-transparent block py-3 border-none outline-none"
                        value={search}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearch(e.target.value)
                        }
                    />
                </form>
            </div>
            <div className="justify-self-end">
                <IconUserCircle size={48} color="#CCCCCC" />
            </div>
        </header>
    );
};

export default Header;
