import { useParams } from "react-router-dom";
import { default as MapComponent } from "../../components/Map/Map";


function Map() {
    const { lat, long } = useParams();

    return (
        <div className="page p-0">
            <MapComponent
                {...{
                    lat: lat ? parseFloat(lat) : 43.48897815074335,
                    long: long ? parseFloat(long) : -79.69918168264917,
                }}
            />
        </div>
       
    );
}

export default Map;
