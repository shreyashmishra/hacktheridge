import { FunctionComponent } from "react";
import Card from "../../components/Card/Card";
import { useAppContext } from "../../hooks/useAppContext";
import Button from "../../components/Button/Button";
import "./Home.scss";


const Home: FunctionComponent = () => {
    const { products } = useAppContext();
    const rec = products.filter(() => Math.random() < 0.5);
    const byDistance = products.sort(
        (a, b) =>
            (a.DistanceMatrixResponseElement?.distance?.value || 99999999) -
            (b.DistanceMatrixResponseElement?.distance?.value || 99999999)
    );

    const byDuration = products.sort(
        (a, b) =>
            (a.DistanceMatrixResponseElement?.duration?.value || 99999999) -
            (b.DistanceMatrixResponseElement?.duration?.value || 99999999)
    );
    return (
        <div className="Home page">
            <h2>Recommended for you</h2>
            <div className="card-container">
                {rec.filter((product) => product.left > 0).map((product, i) => (
                    <Card {...{ product, key: i }} />
                ))}
            </div>
            <h2>All</h2>
            <div className="card-container">
                {products.filter((product) => product.left > 0).map((product, i) => (
                    <Card {...{ product, key: i }} />
                ))}
            </div>
            <h2>Nearest by Distance</h2>
            <div className="card-container">
                {byDistance.filter((product) => product.left > 0).map((product, i) => (
                    <Card {...{ product, key: i }} />
                ))}
            </div>
            <h2>Nearest by Time</h2>
            <div className="card-container">
                {byDuration.filter((product) => product.left > 0).map((product, i) => (
                    <Card {...{ product, key: i }} />
                ))}
            </div>
            {/**/}
            <div className="custom-container">
                <Button label="Add Your Own" />
            </div>
        </div>
    );
};

export default Home;
