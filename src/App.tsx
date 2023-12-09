
// Importing necessary styles and routing components
import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// Importing components and pages
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import Search from "./pages/Search/Search";
import Store from "./pages/Store/Store";
import Recipe from "./pages/Recipe/Recipe";
import { AppContextProvider } from "./contexts/AppContext";
import MyCart from "./pages/MyCart/MyCart";
import Success from "./pages/Success/Success";
import Lessons from "./pages/Lessons/Lessons";

// Defining the App function component
function App() {
    return (
        <BrowserRouter>
            <AppContextProvider>
                {/* Wrapper div for the application grid layout */}
                <div className="wrapper grid grid-flow-row">
                    {/* Navigation component */}
                    <Navbar />
                    <div className="flex flex-col w-full">
                        {/* Header component */}
                        <Header />
                        {/* Routes for different pages */}
                        <Routes>
                            {/* Home page route */}
                            <Route path="/" element={<Home />}></Route>
                            {/* Lessons page route */}
                            <Route path="lessons" element={<Lessons />}></Route>
                            {/* Map page route */}
                            <Route path="/map" element={<Map />}></Route>
                            {/* Map page route with latitude and longitude parameters */}
                            <Route
                                path="/map/:lat/:long"
                                element={<Map />}
                            ></Route>
                            {/* Search page route with query parameter */}
                            <Route
                                path="/search/:query"
                                element={<Search />}
                            ></Route>
                            {/* Store page route with query parameter */}
                            <Route
                                path="/store/:query"
                                element={<Store />}
                            ></Route>
                            {/* MyCart page route */}
                            <Route path="/cart" element={<MyCart />} />
                            {/* Recipe page route */}
                            <Route path="/recipe" element={<Recipe />} />
                            {/* Success page route */}
                            <Route path="/success" element={<Success />} />
                        </Routes>
                    </div>
                </div>
            </AppContextProvider>
        </BrowserRouter>
    );
}

export default App;