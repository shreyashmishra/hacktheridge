import { useNavigate, useParams } from "react-router-dom";


const Store = () => {
    
    const { query } = useParams();
    const navigate = useNavigate();

    if (!query) {
        navigate("/");
        return <></>;
    }

    return <div className="page"></div>;
};

export default Store;
