import React, { useDebugValue, useEffect, useState, useSyncExternalStore} from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink} from "react-router-dom";
import './index.css';
const Signup = () => {

    return(
        <div className='loginpagebigbig'>
            <div className='SignUp'>SignUp</div>
            <hr className='SignUphr'></hr>
        <form className="formm" action="http://44.226.224.61:8000/user/SignUp.html" method="POST">
            <div className='loginpassword'>
            <input className='loginemail1' type="text" id="username" name="username" placeholder="帳號" required/>
            </div>
            <div className='loginpassword'>
            <input className='loginemail1' type="password" id="password" name="password" placeholder="密碼" required/>
            </div>
            <div className='loginemail'>
            <input className='loginemail1'  type="text" id="email" name="email" placeholder="E-mail" required/>
            </div>
            <div className='loginsubmitbig'>
            <button type="submit" value="登入" className="loginsubmit1" onClick="">註冊</button>
            <Link to="/login" style={{ textDecoration: 'none'}}><button value="註冊" className="loginsubmit1" onClick="">登入</button></Link>
            </div>           
            </form>  
        </div>
    );
}

export default Signup;