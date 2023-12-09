// Importing necessary modules and components
import { FunctionComponent, CSSProperties } from "react";
import { Product } from "../../types/types";
import { IconMapPin, IconShoppingCartPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import "./Card.scss";
import { useAppContext } from "../../hooks/useAppContext";
import { ToastContainer, toast } from 'react-toast';

// Defining the properties for the Card component
interface CardProps {
    product: Product;
}

// Defining the Card component
const Card: FunctionComponent<CardProps> = ({ product }) => {
    // Using App context for managing state
    const { addToCart, setProducts, products } = useAppContext();

    // Rendering the Card component
    return (
        <div
            className="Card flex-shrink-0 rounded-[40px] bg-[#D9D9D9] w-80 h-64 overflow-clip relative"
            style={{ "--image": `url('${product.image}')` } as CSSProperties}
        >
            {/* Top section of the card */}
            <div className="top h-1/2 flex flex-col justify-end items-start p-4 bg-center">
                <h3 className="text-white font-semibold text-2xl">
                    {product.name}
                </h3>
                <div
                    className="text-[#C5C5C5] rounded-full px-3"
                    style={{
                        backgroundColor: `hsl(${
                            4 + 10.8 * Math.min(10, product.left - 1)
                        }, 59%, 45%)`,
                    }}
                >
                    {product.left} left
                </div>
                {/* Add to cart button */}
                <div
                    className="absolute right-4 top-4 h-8 w-8 rounded-full bg-green-400 hover:bg-green-500 transition flex items-center justify-center cursor-pointer"
                    onClick={() => {
                        const i = products.indexOf(product);

                        addToCart(product);
                        let productsCopy = [...products];
                        productsCopy[i].left -= 1;
                        
                        // if (productsCopy[i].left <= 0) productsCopy.splice(i, 1)

                        setProducts(productsCopy);
                        toast.success(`Added ${product.name} to cart.`);
                    }}
                >
                    <IconShoppingCartPlus size={24}/>
                </div>
            </div>

            {/* Bottom section of the card */}
            <div className="h-1/2 flex flex-col justify-evenly p-4">
                {/* Store information */}
                <div className="flex gap-4 items-center font-bold">
                    <img
                        src={product.storeIcon}
                        className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                    <h4>{product.storeName}</h4>
                </div>

                {/* Product details */}
                <div className="flex flex-col justify-start">
                    <p className="text-left">
                        Pick up: today at {product.pickupTime}
                    </p>
                    <p className="text-left">Cost: {product.cost}</p>
                </div>

                {/* Distance and Map link */}
                <div className="absolute bottom-4 right-6 text-xs text-[#818181]">
                    <span className="mr-1">
                        {product.DistanceMatrixResponseElement?.status ==
                        "ZERO_RESULTS"
                            ? "Cannot drive"
                            : product.DistanceMatrixResponseElement?.distance
                                  ?.text +
                              " | " +
                              product.DistanceMatrixResponseElement?.duration
                                  ?.text}
                    </span>
                    <Link
                        to={`/map/${product.location[0]}/${product.location[1]}`}
                    >
                        <div className="inline-block bg-[#0E694A] h-8 w-8 p-auto rounded-full relative top-2">
                            <IconMapPin
                                className="inline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                color="#CCCCCC"
                            />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Toast container for notifications */}
            <ToastContainer
                position="bottom-right"
            />
        </div>
    );
};

// Exporting the Card component
export default Card;
