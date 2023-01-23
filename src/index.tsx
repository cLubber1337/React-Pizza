import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {orange} from "@mui/material/colors";
import {store} from "./redux/store";
import {Provider} from "react-redux";

const theme = createTheme({
    palette: {
        primary: {
            main: orange[500]
        },
        secondary: {
            main: '#fe5f1e',
        },
    },
});


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
        </Provider >
);


