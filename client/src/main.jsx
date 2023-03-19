import 'vite/modulepreload-polyfill'
import RefreshRuntime from 'http://localhost:5173/@react-refresh'
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import ProviderWrapper from './context/ProviderWrapper'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <ProviderWrapper>
                <App/>
            </ProviderWrapper>
        </React.StrictMode>
)
