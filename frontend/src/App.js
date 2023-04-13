import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import ProfilePage from "./scenes/profilePage";

// TOHLE VSECHNO IMPORTUJI NA ZACATKU


// PO UDELANI THEME.JS
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material";
import {themeSettings} from "./theme";


function App() {
    /* PO UDELANI CSS JSEM DAL TOTO */
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    /* PO UDELANI CSS JSEM DAL TOTO */

    /* THEME PROVIDER A CSSBASELINE PRIDANY PO THEME.js */

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route path={"/"} element={<LoginPage/>}></Route>
                        <Route path={"/home"} element={<HomePage/>}></Route>
                        <Route path={"/profile/:userId"} element={<ProfilePage/>}></Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>

        </div>
    );
}

export default App;
