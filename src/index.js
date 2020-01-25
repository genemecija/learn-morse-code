import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {GameModeContextProvider} from "./contexts/gameModeContext"
import { KeyTypeContextProvider } from './contexts/keyTypeContext';
import { WPMContextProvider } from './contexts/wpmContext';


ReactDOM.render(
    <KeyTypeContextProvider>
        <WPMContextProvider>
            <GameModeContextProvider>
                <App />
            </GameModeContextProvider>
        </WPMContextProvider>
    </KeyTypeContextProvider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
