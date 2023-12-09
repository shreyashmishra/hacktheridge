import { useParams } from "react-router-dom";
import { default as MapComponent } from "../../components/Map/Map";


function Map() {
    const { lat, long } = useParams();

    return (
        <div className="page p-0">
            <MapComponent
                {...{
                    lat: lat ? parseFloat(lat) : 43.78709226329809,
                    long: long ? parseFloat(long) : -79.18961737715792,
                }}
            />
        </div>
    );
}

export default Map;
