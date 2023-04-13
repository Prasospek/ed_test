import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import ProfilePage from "./scenes/profilePage";

// TOHLE VSECHNO IMPORTUJI NA ZACATKU

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LoginPage/>}></Route>
                    <Route path={"/home"} element={<HomePage/>}></Route>
                    <Route path={"/profile/:userId"} element={<ProfilePage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
