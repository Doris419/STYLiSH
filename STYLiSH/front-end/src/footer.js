import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import './index.css';
import line from './images/line.png';
import twitter from './images/twitter.png';
import facebook from './images/facebook.png';
import cartmobile from './images/cart-mobile.png';
import membermobile from './images/member-mobile.png';
import Product from './product.js';

function Footer() {
    
    useEffect(() => {   
            var numm = localStorage.getItem('invnum');
            document.querySelector('#cart1').innerText=parseInt(numm);
    })

    return (
        <div>
            <footer className="footer1">
                <div className="about">
                    <button className="fabout" type="button">關於STYLiSH</button>
                    <font color="white">|</font>
                    <button className="fabout" type="button">服務條款</button>
                    <font color="white">|</font>
                    <button className="fabout" type="button">隱私政策</button>
                    <font color="white">|</font>
                    <button className="fabout" type="button">聯絡我們</button>
                    <font color="white">|</font>
                    <button className="fabout" type="button">FAQ</button>
                </div>
                <div className="fpicture">
                    <button className="mediabtn" type="button"><img src={line}/></button>
                    <button className="mediabtn" type="button"><img src={twitter}/></button>
                    <button className="mediabtn" type="button"><img src={facebook}/></button>
                </div>
                <p style={{color:'grey'}}> ©2018. All rights reserved.</p>
            </footer>
            <footer className="footer2">
                <div className="btnabout">
                    <div className="about">
                        <div className="about1">
                            <button className="fabout" type="button">關於STYLiSH</button>
                            <button className="fabout" type="button">服務條款</button>
                        </div>
                        <div className="about2">
                            <button className="fabout" type="button">隱私政策</button>
                            <button className="fabout" type="button">聯絡我們</button>
                        </div>
                        <div className="about2">
                            <button className="fabout" type="button">FAQ</button>
                        </div>
                    </div>
                    <div className="fpicture">
                        <button className="mediabtn" type="button"><img src={line}/></button>
                        <button className="mediabtn" type="button"><img src={twitter}/></button>
                        <button className="mediabtn" type="button"><img src={facebook}/></button>
                    </div>
                </div>
                <p style={{color:'grey'}} className="patent"> ©2018. All rights reserved.</p>
            </footer>
            <div className="fixedbanner">
                <div className="fixedbtn">
                <Link to={"/cart"} style={{ textDecoration: 'none'}}><div className='cartnumm'>
                    <button className="fixedbtn1"><img src={cartmobile}/>購物車</button>
                    <button className="cartnums" id="cart1" style={{color: '#000000'}}></button>
                    </div></Link>
                    <font color="white">|</font>
                    <button className="fixedbtn1"><img src= {membermobile}/>會員</button>
                </div>
            </div>
        </div>
    );
}
export default Footer;