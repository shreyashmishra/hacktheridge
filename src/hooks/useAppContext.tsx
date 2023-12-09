import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context)
        throw TypeError(
            "useAppContext must be used inside of AppContextProvider"
        );
    return context;
};
