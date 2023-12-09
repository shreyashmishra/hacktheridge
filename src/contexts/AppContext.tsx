import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect
} from "react";
import { Product } from "../types/types";
import { Coordinate } from "../types/coordinate";

type AppContextValue = {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    addProduct: (arg0: Product) => void;
    location?: Coordinate;
    setLocation?: Dispatch<SetStateAction<Coordinate>>;
    DistanceMatrixService: google.maps.DistanceMatrixService;
    Geocoder: google.maps.Geocoder;
    cart: Product[];
    addToCart: (arg0: Product) => void;
    removeFromCart: (arg0: Product, arg1?: number) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<Coordinate>([
        43.48897815074335, -79.69918168264917,
    ]);

    const service = new google.maps.DistanceMatrixService();
    const geocoder = new google.maps.Geocoder();

    // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //         console.log(position);
    //         setLocation([position.coords.longitude, position.coords.latitude]);
    //     },
    //     (err) => console.error(err)
    // );

    const [products, setProducts] = useState<Product[]>([
        {
            name: "Muffins",
            image: "https://cdn.discordapp.com/attachments/1162120421026578522/1163135343869042688/image.png?ex=653e7933&is=652c0433&hm=68dd1ce6cf28d5f2f1b8e55aea5c0775867d2efed7b54beaa82fb9c2bd7e2640&",
            left: 2,
            storeName: "Hack the Ridge",
            storeIcon:
                "https://cdn.discordapp.com/icons/1157000436503564430/9e7a4fcd2cdccac03ad9eb2e7dc175b6.webp?size=96",
            pickupTime: "6pm-9pm",
            cost: "$0.69",
            location: [43.52122534880629, 79.688214441330222],
            //43.52122534880629, -79.68821444133022
        },
        {
            name: "Curry Sauce",
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg?quality=90&resize=440,400",
            left: 2,
            storeName: "Metro",
            storeIcon:
                "https://silverspoononline.com/wp-content/uploads/2020/04/Logo.png",
            pickupTime: "6pm-8pm",
            cost: "$0.72",
            location: [43.48380122036387, -79.69494305308623],
            //43.48380122036387, -79.69494305308623
        },
        {
            name: "Milk",
            image: "https://www.tampabay.com/resizer//qVyNWUKJvqdZM2nZvW9IMTqX0iM=/900x506/smart/filters:format(webP)/arc-anglerfish-arc2-prod-tbt.s3.amazonaws.com/public/HBKH7YGH6EI6TJTLIBWI6S7HAY.jpg",
            left: 5,
            storeName: "Walmart Supercentre",
            storeIcon:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEVHcEw/WGnLmjXjrjxDW0b2tS+mlU38ujD8ujCKg037uTDiqzXeqDTztjT8uS/Inzv/uy/qsDTtrzD2tzLapDDpsDf+uy/Vq0Hysi7orTP3tS5RPCkhAAAAG3RSTlMABTU3Er0U3dAMxnBkprEo/px1eZpQ5xfGReX/NcVzAAAApklEQVR4Ab1RAwLAMAzcas7+/z9n23Vz4cX4YZgAboMIY7INUroNmozxFWl7Y9H+zQHjUjXutNW4V3LwYAvHBdXD8+ucA0fYg2WoI1EZx3FllkQ6HMcmoStUHchUiRvOcyaw9WRD8iKvCHRuAZ9DaZD0CQUpGkOhmzFZlkGqciTL3HBEQuJoWNnJmgSoJyT4ckIfkT7fJt4wN1p2q9lIiB3q0tT4YRQZhQaNlGZesQAAAABJRU5ErkJggg==",
            pickupTime: "3pm-5pm",
            cost: "$0.49",
            location: [43.482834102939115, -79.71847568960094],
            //43.482834102939115, -79.71847568960094
        },
        {
            name: "Rotisserie Chicken",
            image: "https://cdn.discordapp.com/attachments/1162120421026578522/1162931896133619863/chicken.png?ex=653dbbba&is=652b46ba&hm=6bcba85c6bc73cd0f0c7142ebbc8b7d57a0c72c2781a900c01f3f0782fa45bec&",
            left: 7,
            storeName: "Costco Wholesale",
            storeIcon:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsElEQVR4AWLMy8vTUVNTW8nHx6fw+/dvQGfkEDDLEUXh71ZVd/82Ytu2vYpt21jGXMe2vYlt206e/cbT013ITM8q25wyrs5pAQEAkf8OuhCQyESxs/nMm2+++ThuueWWv8L/xK233jrHtCMvD1CtVvEAcYxKEnwI2Pc/xL/5NvkffyIIbRuUMSSbb8rIGaei+/tHTZZlNWDUA76vD9Ga5lPPkt50G+HHnwlJBChEOg481KqEdz6gduB+pDZvGiAAMDgACM0LLiF78FFkaBBZcfnCEGshyxGtEBOh116DbGKMvJWGjmsABCE96wJaDzyCLL8cMj4OIeAXLCR0jKenCM7jZ80ijI/QiBN8mmFQCoDs8afIHn4MtcpKSBwTrCWUSsRHHk7PuaejJicIixZjb7odN9BHdfFCvHMYoqjr4KHHkKGhwhgRWFIiOe4o+q66DE8XZvnlMTdczYJ5c2nNmQfOoehJIM2wM/6BtuciI+/xeYbZbVcEuhzkGQDVZoNyp6zcAqCUKGg2oZGCNhTQGtXXT+vOu8krFcQYJIrJv/mGxa+9Sa4UntCV1bdaMDqMXnEFqNaK6AVGhnCffkF9132oHXYM1f0Opb7DnvTceU9RqguuUEjRcQAkJx+PqpSh0SyciFLIyDAhTbGffUFoR9c9CX6DDYqMbO66GUgIAtB39BHYC89FymXM/PnoUgndbKKBKE6KVYsm23pzQivFW4u0YeIo6gFYvHQx844/kmTLTRl6/kWSv/9G1eto53BxAklMc+UVSddcndq8eUieY4zpkQceeOD3Qw89dPV/ZswgC4EwOEDo6yVUa+hSuWDbxhGufZfHMfmcOdh6g0hrPvnkkxmy5ZZbbn3EEUc8qrWets5lXW4FpxRBa4IE8CA2h9wBXpIojpxz8x966KEL/wXom4HtQRrNHQAAAABJRU5ErkJggg==",
            pickupTime: "3pm-5pm",
            cost: "$2.99",
            location: [43.75961103483255, -79.29779819951865],
        },
        {
            name: "Bananas",
            image: "https://th.bing.com/th/id/OIP.SQVdxKvswNRbvU-UwXk03gAAAA?pid=ImgDet&rs=1",
            left: 1,
            storeName: "Food Basics",
            storeIcon:
                "https://cdn.discordapp.com/attachments/1162120421026578522/1162984791092760666/a.png?ex=653decfd&is=652b77fd&hm=d68c49e67d5ba89e694c3b4911f57f32884057a1d80bece6c12d49d318421848&",
            pickupTime: "3pm-5pm",
            cost: "$0.99",
            location: [43.48349228000922, -79.722115557726014],
            //43.48349228000922, -79.72211555772601
        },
        {
            name: "Pho Combo",
            image: "https://i.redd.it/kxi5axqo9uo91.jpg",
            left: 1,
            storeName: "Little Saigon",
            storeIcon:
                "https://d1ralsognjng37.cloudfront.net/087ac1a5-e01a-4ed1-8eac-542bba658742.webp",
            pickupTime: "3pm-5pm",
            cost: "$4.99",
            location: [43.49765666261458, -79.70596973702345],
            //43.49765666261458, -79.70596973702345
        }, 
        {
            name: "Peas",
            image: "https://pbs.twimg.com/media/F3G4dfRbwAA1k17?format=jpg&name=small",
            left: 3,
            storeName: "Chick-fil-a",
            storeIcon: "https://pbs.twimg.com/profile_images/1148729107406041088/emlH0Rv4_400x400.png",
            pickupTime: "9am-3pm",
            cost: "$0.67",
            location: [29.776231188843123, -95.38097121247154]
        },
        {
            name: "Burger patties",
            image: "https://a.storyblok.com/f/171241/1500x600/4dba9cd613/burgers-stack_crispy-yellow-bg.jpeg/m/",
            left: 4,
            storeName: "Mr. Beast Burger",
            storeIcon: "https://play-lh.googleusercontent.com/E-pOBgGK0ssb4D5d_ufM__FTPW4MIJghKx5kzqy3-_OAca2cC04cVAWqa71LFNiEgQ",
            pickupTime: "11am-4pm",
            cost: "$0.78",
            location: [43.529540559158946, -80.248260518712]
        },
        {
            name: "Pasta",
            image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.616.493.suffix/1615916524567.jpeg",
            left: 12,
            storeName: "Hack the North",
            storeIcon: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/000/152/961/datas/large.png",
            pickupTime: "3pm-8pm",
            cost: "$0.10",
            location: [43.47291864733404, -80.53969245368356]
        },
        {
            name: "Pizza Dough",
            image: "https://static01.nyt.com/images/2018/01/18/dining/pizzadough-2/pizzadough-2-threeByTwoMediumAt2X-v2.jpg",
            left: 4,
            storeName: "Big Bite Pizza",
            storeIcon: "https://bigbitepizza.toeat.ca/sitedata/images/logo.png?1",
            pickupTime: "9am-2pm",
            cost: "$1.03",
            location: [43.48973379201621, -79.70778903042894]
        },
        {
            name: "Fried Chicken",
            image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/d0/d0/53/overcooked-fried-chicken.jpg",
            left: 4,
            storeName: "Kentucky Fried Chicken",
            storeIcon: "https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/2048px-KFC_logo.svg.png",
            pickupTime: "10am-1pm",
            cost: "$2.34",
            location: [43.48860548502764, -79.71883632870107]
        },
        {
            name: "ดาร์ธ เวเดอร์กินสุนัขของฉัน",
            image: "https://www.google.com/maps/place/Geylang+Serai+Market+and+Food+Centre/@1.3163459,103.8984807,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipO57xIgFcmokVAG-R6iugJnBQRSDuYn3F38S3NY!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO57xIgFcmokVAG-R6iugJnBQRSDuYn3F38S3NY%3Dw86-h114-k-no!7i6936!8i9248!4m7!3m6!1s0x31da1810a1928cf5:0xe32ae7206bb3ada7!8m2!3d1.3167284!4d103.8982767!10e5!16s%2Fg%2F11b76gjzdf?entry=ttu#",
            left: 1,
            storeName: "Geylang Serai Market and Food Centre",
            storeIcon:
                "https://wallpapers.com/images/hd/big-luffy-smile-ej9gxxz5rfs2om9m.jpg",
            pickupTime: "2pm-5:30pm",
            cost: "$3.43",
            location: [1.3167901136442113, 103.8983060507915],
        },
        {
            name: "Pho Broth (Pork)",
            image: "https://d1ralsognjng37.cloudfront.net/087ac1a5-e01a-4ed1-8eac-542bba658742.webp",
            left: 2,
            storeName: "Little Saigon",
            storeIcon:
                "https://d1ralsognjng37.cloudfront.net/087ac1a5-e01a-4ed1-8eac-542bba658742.webp",
            pickupTime: "6pm-8pm",
            cost: "$1.20",
            location: [43.49765666261458, -79.70596973702345],
            //43.48380122036387, -79.69494305308623
        },
        {
            name: "Pepperoni Pizza Slice",
            image: "https://storage.googleapis.com/phx2-uat-wordpress-uploads/1/2023/09/Stuffed-Crust-Pizza-National.jpg?cache_key=54",
            left: 8,
            storeName: "Pizza Pizza",
            storeIcon:
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAABQYEA//EACkQAAIBAwMCBAcAAAAAAAAAAAECAwAEEQUSIRNBFBUxMgYiI1FhcrH/xAAXAQADAQAAAAAAAAAAAAAAAAABAgYD/8QAHBEAAgIDAQEAAAAAAAAAAAAAAQIDEQAEBRIh/9oADAMBAAIRAxEAPwDZRTjSIrZbJri4S0ObpYma7JCqm0s23B93HFMJYtJFvKll4BmaNOkt0HWVSRyzdz+oHrnmp6HnPKgYEfcqJuikTlPJ+ZL0VU3q6ZF1Hih01jFs3kh9rpgl8AcK5JGASTipy8RIrudIgekJH6ROeU3Hafzxjmk2dJ9cWTeaau8mwaArOulyJHqNmZpAsC3EbvvbCDBHJ7emeabx/EFv4YwXHmM25g7TiUCTO9WKqc5CfL9889qnaKEG7JAvlcM+lHO3p8pG+I4N11KPMXknkVyjsnTKjH09u4gA4wTgnFL9U1GK8txGr3srCdpQ90VJUEe0Y9Bn+UroppOhNIhQ1RxY+dDG4dbsZ//Z",
            pickupTime: "6pm-8pm",
            cost: "$1.09",
            location: [43.49815128716817, -79.70665517301019],
            //43.48380122036387, -79.69494305308623
        },
        {
            name: "Tilapia Fish",
            image: "https://worldfishcenter.org/sites/default/files/styles/900x6/public/images/bg/news/1111.jpg?itok=iJbSTpZX",
            left: 2,
            storeName: "Cynthia's Chinese Resturaunt",
            storeIcon:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAARVBMVEVHcEwBiD4BiD0BiT8BiT4BiT4AiT4BiT4BiT4AiD4BiT0AiD8AhECmwCAlkzfb1w/s3wVJnTKHtiQKkTf/6ADI0BJzqi6WXopEAAAADHRSTlMAIE+ZxvD/nOIUh0VNIhMBAAABEklEQVR4AWSS4RKEIAiEtZKsw1TF3v9RT2+OoPp+OeO6sIgR7DQvDsAt82TNG7t6uPDrU7Lt8GDfbvceXnil+DhgEIFxn+u93EMIhyi2lz9CTAcC3qvsYp9DSuWoJXOnv3zA5ESptUhEJ3uMtCu/7/eUAWtQgrUbeBY0ooLjEETgrZmABUQUEAYigMnMfKzUKSMBnhmY2SzA0KBllJidxThQPQziWUFwBhg86U+ryoIFnPNHykrglOIo7IFSYgEFQok0QGlyBiYrlyox1aBOvNKoQcmo/5WxqB68VZ9FFA7sRJViVd+NI1/IpRFJSqsWBluuI0MsMur9vnLIK/dc7O9wJ1qCyZ5wxiGc9QhnXoLZHwCtzx1gqdwaTQAAAABJRU5ErkJggg==",
            pickupTime: "6pm-8pm",
            cost: "$1.65",
            location: [43.49815128716817, -79.70665517301019],
            //43.48380122036387, -79.69494305308623
        },
        {
            name: "Tilapia Fish",
            image: "https://worldfishcenter.org/sites/default/files/styles/900x6/public/images/bg/news/1111.jpg?itok=iJbSTpZX",
            left: 2,
            storeName: "Food Basics",
            storeIcon:
            "https://cdn.discordapp.com/attachments/1162120421026578522/1162984791092760666/a.png?ex=653decfd&is=652b77fd&hm=d68c49e67d5ba89e694c3b4911f57f32884057a1d80bece6c12d49d318421848&",
            pickupTime: "6pm-8pm",
            cost: "$1.65",
            location: [43.49815128716817, -79.70665517301019],
            //43.48380122036387, -79.69494305308623
        },
        {
            name: "Chocolate Dip Donut",
            image: "https://timhortons.ph/upload/assets/8i4G0WlZshMNYHrGeuzPdaE1L6qnOtuDS9xV0sA2f5E00aOWhQ.jpg",
            left: 2,
            storeName: "Tim Hortons",
            storeIcon:
                "https://fiu-original.b-cdn.net/fontsinuse.com/use-images/168/168197/168197.png?filename=Tim_Hortons_Maple_Leaf.png",
            pickupTime: "6pm-8pm",
            cost: "$2.50",
            location: [43.483981, -79.723087],
            //43.48380122036387, -79.69494305308623
        },
    ]);

    useEffect(() => {
        service
        .getDistanceMatrix({
            origins: [{ lat: location[0], lng: location[1] }],
            destinations: products.map((p) => {
                return { lat: p.location[0], lng: p.location[1] };
            }),
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((res) => {
            const tempProducts = [...products];
            res.rows[0].elements.map((element, i) => {
                tempProducts[i].DistanceMatrixResponseElement = element;
            });
            setProducts(tempProducts);
        });
    }, [])

    const [cart, setCart] = useState<Product[]>([]);

    const providerValue: AppContextValue = {
        products,
        setProducts,
        addProduct: (newProduct: Product) => {
            setProducts((p) => [...p, newProduct]);
        },
        location,
        setLocation,
        Geocoder: geocoder,
        DistanceMatrixService: service,
        cart,
        addToCart: (cartItem: Product) => {
            setCart((prevCart) => [...prevCart, cartItem]);
        },
        removeFromCart: (cartItem: Product, max?: number) => {
            console.log(cartItem, max || 100)
            let current = 0
            setCart(cart.filter((item) => {
                console.log(item.name)
                if (item.name === cartItem.name) {
                    if ((max || 100) > current) {
                        current += 1
                        return false
                    }
                }
                return true
            }));
        },
    };
    return (
        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>
    );
};
