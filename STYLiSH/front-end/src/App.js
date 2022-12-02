import ReactDOM from 'react-dom/client';
import React, { useDebugValue, useEffect, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Router, Routes, Route, Link } from "react-router-dom";
import './index.css';
import Header from './header.js';
import Footer from './footer.js';

function App() {

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Footer />
            </div>
        </BrowserRouter>
    );

}

export default App;