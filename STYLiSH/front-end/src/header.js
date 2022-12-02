import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import './index.css';
import logo from './images/logo.png';
import search from './images/search.png';
import cart from './images/cart.png';
import member from './images/member.png';
import banner from './images/banner.jpg';
import dot from './images/dottt.png';
import Text from './text.js';
import Product from './product.js';
import Checkout from './checkout.js'
import Thank from './thank.js';
import Login from './login.js'
import { isDOMComponent } from 'react-dom/test-utils';
import Signup from './signup.js';
import Carousel from "./MyCarousel.js";
function Header() {
   
    const [text, setText] = useState([]);
    const [searchkey, setSearchkey] = useState("");
    var [num, setNum] = useState(0);

    useEffect(() => {
        const res = fetch("http://44.226.224.61:8000/api/v1/all/product?paging=0")
            .then(res => res.json())
            .then(data => setText(data))   
            var numm = localStorage.getItem('invnum');
            document.querySelector('#cart').innerText=parseInt(numm);
    },[])

    var page1 = async () => {
            const res = await fetch("http://44.226.224.61:8000/api/v1/product/women?paging=0")
                .then(r => r.json())
                .then(data => setText(data))
    }
    
    var page2 = async () => {
        const res = await fetch("http://44.226.224.61:8000/api/v1/product/men?paging=0")
            .then(r => r.json())
            .then(data => setText(data))
    }
    
    var page3 = async () => {
        const res = await fetch("http://44.226.224.61:8000/api/v1/product/accessories?paging=0")
            .then(r => r.json())
            .then(data => setText(data))
    }
    
    var seaching = async () => {
        if(searchkey==""){
            alert("請輸入搜索詞")
        }
        // console.log(searchkey);
        const res = await fetch("http://44.226.224.61:8000/api/v1/product/search?keyword=" + searchkey.toString())
            .then(r => r.json())
            .then(data => setText(data))
    }

    function cartnum (nums) {
        setNum(nums);
        // console.log(nums)
        document.querySelector('#cart').innerText=nums;
        window.location.reload();
    }

    return (
        
        <div className='wrapper'>
            <header className="header">
                <a className="logo-link" href="http://44.226.224.61/index.html"><img src={logo} className="logo" /></a>
                <div className="cate1">

                <Link to="/cate/women">
                    <button className="astext1" id="cate1" onClick={page1}>女   裝</button>
                </Link>
                    <p> | </p>
                <Link to="/cate/men">
                <button className="astext1" id="cate2" onClick={page2}>男   裝</button>
                </Link>
                    <p> | </p>
                <Link to="/cate/accessories">
                <button className="astext1" id="cate3" onClick={page3}>配   件</button>
                </Link>
                </div>
                <div className="box">
                    <div className="container-1">
                        <input type="search" className="search1" id="search1" placeholder="" onChange={(e) => { setSearchkey(e.target.value) }} />
                        <Link to={"/search/"+searchkey.toString()} style={{ textDecoration: 'none'}}>
                            <div className='bigsearch'>
                            <button className="searchbtn1" type="button" id="searchbtn1" onClick={seaching}><img src={search} /></button>
                            </div>
                        </Link>
                    </div>
                    <Link to={"/cart"} style={{ textDecoration: 'none'}}><div className='cartnumm'>
                    <button className="cart" type="button"><img src={cart} /></button>
                    <button className="cartnums" id='cart'></button>
                    </div></Link>
                    <Link to="/login" style={{ textDecoration: 'none'}}>
                        <div className='memberbig'>
                        <button className="cart" type="button"><img src={member} /></button>
                        </div></Link>
                    
                </div>
                <div className="container-1">
                    <input type="search" className="search2" id="search2" placeholder="" onChange={(e) => { setSearchkey(e.target.value) }} />
                    <Link to={"/search/"+searchkey.toString()} style={{ textDecoration: 'none'}}>
                        <div className='bigsearch'>
                        <button className="searchbtn2" type="button" id="searchbtn2" onClick={seaching}><img src={search} /></button>
                        </div>
                    </Link>
                </div>
            </header>

            <div className="hr">
                <div className="cate2">
                <Link to="/cate/women">
                <button className="astext2" id="cates1" onClick={page1}>女   裝</button>
                </Link>
                    <font color="white">|</font>
                <Link to="/cate/men">
                    <button className="astext2" id="cates2" onClick={page2}>男   裝</button>
                </Link>
                    <font color="white">|</font>
                <Link to="/cate/accessories">
                    <button className="astext2" id="cates3" onClick={page3}>配   件</button>
                </Link>    
                </div>
            </div>
            <nav className="nav">
                <div className='Carousel'>
                <Carousel/>
                </div>
                <div className="bigarticle">
                    <article className="article">
                        <Routes>

                            <Route exact path="/" element={text.map((text,index) =>
                                    <Text key={index} text={text}></Text>)}/>
                            <Route exact path="/index.html" element={text.map((text,index) =>
                                    <Text key={index} text={text}></Text>)}/>
                            <Route path="/cate/:cate" element={text.map((text,index) =>
                                    <Text key={index} text={text}></Text>)}/>
                            <Route path="/search/:keyword" element={text.map((text,index) =>
                                    <Text key={index} text={text}></Text>)}/>        
                            <Route path="/details/:id" element={ <Product cartnum={cartnum}/>}></Route>
                            <Route path="/cart" element={<Checkout/>}></Route>
                            <Route path="/thankyou" element={<Thank/>}></Route>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route path="/signup" element={<Signup/>}></Route>
                        
                        </Routes>
                    </article>
                    </div>
            </nav>
        </div>
        
    );
}



export default Header;