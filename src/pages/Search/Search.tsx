import { useParams, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { useAppContext } from "../../hooks/useAppContext";
import { Product } from "../../types/types";
import Card from "../../components/Card/Card";

const Search = () => {
    const { products } = useAppContext();
    const { query } = useParams();
    const navigate = useNavigate();

    if (!query) {
        navigate("/");
        return <></>;
    }

    const fuse = new Fuse(products, { keys: ["name", "storeName"] });
    const searchedProducts: Product[] = fuse
        .search(query)
        .map((searched) => searched.item)
        .filter((product) => product.left > 0);

    return (
        <div className="page">
            <h2 className="text-[2rem] mb-4">Search results for "{query}"</h2>
            {searchedProducts.length ? (
                <div className="card-container">
                    {searchedProducts.map((product, i) => (
                        <Card {...{ product, key: i }} />
                    ))}
                </div>
            ) : (
                <div>
                    <h2>No results found</h2>
                </div>
            )}
        </div>
    );
};

export default Search;
