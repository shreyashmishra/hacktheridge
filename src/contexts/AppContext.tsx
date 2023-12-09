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
        43.78668240105278, -79.18963816316345,
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
            storeName: "Hack the Valley",
            storeIcon:
                "https://cdn.discordapp.com/icons/1157000436503564430/9e7a4fcd2cdccac03ad9eb2e7dc175b6.webp?size=96",
            pickupTime: "6pm-9pm",
            cost: "$0.69",
            location: [43.786736298196494, -79.18997273691392],
        },
        {
            name: "Curry Sauce",
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg?quality=90&resize=440,400",
            left: 2,
            storeName: "Silver Spoon",
            storeIcon:
                "https://silverspoononline.com/wp-content/uploads/2020/04/Logo.png",
            pickupTime: "6pm-8pm",
            cost: "$0.72",
            location: [43.791962083132965, -79.25144371163064],
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
            location: [43.79823453032201, -79.2007036978067],
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
            location: [43.81011637266236, -79.27037412310364],
        },
        {
            name: "Chicken On The Rocks",
            image: "https://i.redd.it/kxi5axqo9uo91.jpg",
            left: 1,
            storeName: "Lazeez",
            storeIcon:
                "https://cdn.discordapp.com/attachments/1162120421026578522/1162991156683079681/lazeez.png?ex=653df2eb&is=652b7deb&hm=ea976f04bd06949d07e74121ba66aeba41994ee91420977134d33a382515f83d&",
            pickupTime: "3pm-5pm",
            cost: "$4.99",
            location: [43.78323022514291, -79.16968970436169],
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
            image: "https://i.stack.imgur.com/sHZwp.jpg",
            left: 4,
            storeName: "Big Bite Pizza",
            storeIcon: "https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-1/305482076_749346869835000_3141189432076105167_n.png?stp=dst-png_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tQVJenhu8y8AX8YyLVZ&_nc_ht=scontent-yyz1-1.xx&oh=00_AfCI3lk7nvvJ83MiemFzBuhF5btYeYkdM57Fok-CjDJU1g&oe=652FFCB5",
            pickupTime: "9am-2pm",
            cost: "$1.03",
            location: [43.470819418177655, -80.5933605143783]
        },
        {
            name: "Fried Chicken",
            image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/d0/d0/53/overcooked-fried-chicken.jpg",
            left: 4,
            storeName: "Kentucky Fried Chicken",
            storeIcon: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/1200px-KFC_logo-image.svg.png",
            pickupTime: "10am-1pm",
            cost: "$2.04",
            location: [36.95984861835326, -84.09387789559345]
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
