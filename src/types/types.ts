import { Coordinate } from "./coordinate";

export type Product = {
    name: string;
    image: string;
    left: number;
    storeName: string;
    storeIcon: string;
    pickupTime: string;
    cost: string;
    location: Coordinate;
    DistanceMatrixResponseElement?: google.maps.DistanceMatrixResponseElement;
};
