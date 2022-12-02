import React, { useDebugValue, useEffect, useState, useSyncExternalStore} from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink} from "react-router-dom";
import './index.css';
import thank from "./images/thank-you-page.webp";
const Thank = () => {


    return(
        <div className='thankyoupage'>
            <img src={thank}></img>
        </div>
        
    );
}

export default Thank;