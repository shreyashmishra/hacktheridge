import { FunctionComponent, useEffect, useRef } from "react";
import { useMemo } from "react";
import "./Map.scss";


interface MapProps {
    long: number;
    lat: number;
}

const Map: FunctionComponent<MapProps> = ({ lat, long }) => {
    const center = useMemo(() => {
        return { lat: lat, lng: long };
    }, [lat, long]);
    console.log(center);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        new window.google.maps.Map(ref.current, {
            center,
            zoom: 20,
        });
    }, [center]);

    return (
        <div className="Map map-container" ref={ref} />
    );
};

export default Map;
