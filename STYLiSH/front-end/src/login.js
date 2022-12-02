import React, { useDebugValue, useEffect, useState, useSyncExternalStore} from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink} from "react-router-dom";
import './index.css';
const Login = () => {

    function login() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var header = {'Content-Type': 'application/json; charset=UTF-8'}
        fetch("http://44.226.224.61:8000/user/SignIn",{
            method: 'POST',
            headers: header,
            body: JSON.stringify({'email': email, 'password': password})
        })
        .then(res => {
            return(res.json()) 
        })
        .then(data =>{
            localStorage.setItem("token",data.token)
            alert("登入成功!")
            window.location.assign("http://44.226.224.61/");
        })
        .catch((error) => {
            alert("帳號或密碼錯誤!")
        })
    }

    return(
        <div className='loginpagebigbig'>
            <div className='SignUp'>LogIn</div>
            <hr className='SignUphr'></hr>
            <div className='loginemail'>
            <input className='loginemail1' type="text" id="email" name="email" placeholder="Email" required/>
            </div>
            <div className='loginpassword'>
            <input className='loginpassword1' type="password" id="password" name="password" placeholder="密碼" required/>
            </div>
            <div className='loginsubmitbig'>
            <button value="登入" className="loginsubmit1" onClick={login}>登入</button>
            <Link to="/signup" style={{ textDecoration: 'none'}}><button value="註冊" className="loginsubmit1" onClick="">註冊</button></Link>
            </div>
        </div>
    );
}

export default Login;