import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import Search from "./pages/Search/Search";
import Store from "./pages/Store/Store";
import { AppContextProvider } from "./contexts/AppContext";
import Success from "./pages/Success/Success";

function App() {
    return (
        <BrowserRouter>
            <AppContextProvider>
                <div className="wrapper grid grid-flow-row">
                    <Navbar />
                    <div className="flex flex-col w-full">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/map" element={<Map />}></Route>
                            <Route
                                path="/map/:lat/:long"
                                element={<Map />}
                            ></Route>
                            <Route
                                path="/search/:query"
                                element={<Search />}
                            ></Route>
                            <Route
                                path="/store/:query"
                                element={<Store />}
                            ></Route>
                           
                            <Route path="/success" element={<Success />} />
                        </Routes>
                    </div>
                </div>
            </AppContextProvider>
        </BrowserRouter>
    );
}

export default App;
