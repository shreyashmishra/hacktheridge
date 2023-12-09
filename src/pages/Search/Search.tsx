import { useParams, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { useAppContext } from "../../hooks/useAppContext";
import Card from "../../components/Card/Card";

const Search = () => {
    const { products } = useAppContext();
    const { query } = useParams();
    const navigate = useNavigate();

    if (!query) {
        navigate("/");
        return null;
    }

    const fuse = new Fuse(products, { keys: ["name", "storeName"] });
    const searchedProducts = fuse
        .search(query)
        .map(({ item }) => item)
        .filter(({ left }) => left > 0);

    if (!searchedProducts.length) {
        return (
            <div>
                <h2>No results found</h2>
            </div>
        );
    }

    return (
        <div className="page">
            <h2 className="text-[2rem] mb-4">Search results for "{query}"</h2>
            <div className="card-container">
                {searchedProducts.map((product, i) => (
                    <Card {...{ product, key: i }} />
                ))}
            </div>
        </div>
    );
};

export default Search;
