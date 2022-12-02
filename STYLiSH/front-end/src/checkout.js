import React, { useDebugValue, useEffect, useState, useSyncExternalStore} from 'react';
import { BrowserRouter,useNavigate, Switch , Route , Routes , Link , NavLink} from "react-router-dom";
import './index.css';
import Item from './item.js';

    const Checkout = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var invnum = localStorage.getItem('invnum');
        var [tprice, setTprice] = useState(0);
        var itemPrice = JSON.parse(localStorage.getItem('itemPrice'));
        var itemNum = JSON.parse(localStorage.getItem('itemNum'));
        var itemId= JSON.parse(localStorage.getItem('itemId'));
        var itemColor = JSON.parse(localStorage.getItem('itemColor'));
        var itemSize = JSON.parse(localStorage.getItem('itemSize'));
        var totalprice = 0;
        useEffect(()=>{
        
            for(var i=0;i<itemPrice.length;i++){
                totalprice+=parseInt(itemPrice[i])*parseInt(itemNum[i])
            }
            setTprice(totalprice)
        })

        useEffect(() => {
            getTPDirect().then((TPDirect) => {
                TPDirect.setupSDK(12348, "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF", "sandbox")
    
                var fields = {
                number: {
                    element: '#card-number',
                    placeholder: '**** **** **** ****'
                },
                expirationDate: {
                    element: document.getElementById('card-expiration-date'),
                    placeholder: 'MM / YY'
                },
                ccv: {
                    element: '#card-ccv',
                    placeholder: '後三碼'
                }
                }
    
                TPDirect.card.setup({
                    fields: fields,
                    styles: {
                        'input': {
                            'color': 'gray'
                        },
                        'input.ccv': {
                            // 'font-size': '16px'
                        },
                        'input.expiration-date': {
                            // 'font-size': '16px'
                        },
                        'input.card-number': {
                            // 'font-size': '16px'
                        },
                        ':focus': {
                            'color': 'black'
                        },
                        '.valid': {
                            'color': 'green'
                        },
                        '.invalid': {
                            'color': 'red'
                        },
                    },
                    isMaskCreditCardNumber: true,
                    maskCreditCardNumberRange: {
                        beginIndex: 6, 
                        endIndex: 11
                    }
                })
                }) 
        },[])

        var payment = () => {
            if(localStorage.getItem('token')!=null||localStorage.getItem('token')!=""){
            getTPDirect().then((TPDirect) => {
            const tappayStatus = TPDirect.card.getTappayFieldsStatus()
            console.log('status', tappayStatus)
            if (tappayStatus.canGetPrime === false) {
                alert('can not get prime')
                return
            }
            TPDirect.card.getPrime(function (result) {
                var prime = result.card.prime
                if (result.status !== 0) {
                    console.log('getPrime 錯誤')
                    return
                }
                alert('getPrime 成功'+prime)                            

                var name = document.querySelector('#name').value
                var phone = document.querySelector('#phone').value
                var address = document.querySelector('#address').value
                var email = document.querySelector('#email').value
                var time = document.querySelector('input[name="time"]:checked').value;

                var list = []
                for(var i=0;i<itemPrice.length;i++){
                    var p = {
                        "id" : itemId[i],
                        "price" : itemPrice[i],
                        "color" : itemColor[i],
                        "size" : itemSize[i],
                        "qty" : itemNum[i]    
                    }
                    list.push(p)
                }
                
                fetch('http://44.226.224.61:8000/pay-by-prime',{
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({'prime': prime, 'name': name, 'phone': phone, 'address': address, 'email': email, 'time': time, 'total': tprice+30,'list': list})
                })
                .then(res => {
                    console.log(tprice+30);
                    console.log(list[0]+"haha")
                    alert('付款成功');
                    window.location.assign("http://44.226.224.61/thankyou");
                    // return res.json();
                })
                .catch((err) => {
                    console.log('錯誤:', err);
                });      

                //新增資料

                // for(var i=0 ; i<10 ; i++){
                //     var list = [];
                //     var tprice =0;
                //     const colors= ["#f6b73c","#f57f7f","#b8f4ea"];
                //     const sizes = ["S","M","L"];
            
                //             var p = {
                //                 "id" : Math.round(Math.random()*10)+1,
                //                 "price" : Math.round(Math.random()*2000)+500,
                //                 "color" : colors[Math.round(Math.random()*3)],
                //                 "size" : sizes[Math.round(Math.random()*3)],
                //                 "qty" : Math.round(Math.random()*10)+1    
                //             }
                //             list.push(p)
            
                //         for(var i=0; i<list.length;i++){
                //             tprice += parseInt(list[i]["price"])*parseInt(list[i]["qty"])
                //         }
                
                
                //     console.log(list)
                //     console.log(tprice)
                    
                //     fetch('http://localhost:8000/pay-by-prime',{
                //         method: 'POST',
                //         headers: {
                //             'Authorization': localStorage.getItem('token'),
                //             'Content-Type': 'application/json; charset=UTF-8'
                //         },
                //         body: JSON.stringify({'prime': prime, 'name': name, 'phone': phone, 'address': address, 'email': email, 'time': time, 'total': tprice+30,'list': list})
                //     })
                //     .then(res => {
                //         console.log(tprice+30);
                //         console.log(list[0]+"haha")
                //     })
                //     .catch((err) => {
                //         console.log('錯誤:', err);
                //     });
                
        })
                })
                localStorage.setItem('itemSize','[]');
                localStorage.setItem('itemColor','[]');
                localStorage.setItem('itemId','[]');
                localStorage.setItem('itemLimit','[]');
                localStorage.setItem('itemImg','[]');
                localStorage.setItem('invnum',0);
                localStorage.setItem('itemName','[]');
                localStorage.setItem('itemNum','[]');
                localStorage.setItem('itemPrice','[]');
            }else{
                alert("請先登入!");
            }
        }
        
    
return (
<div className="bigitemintro">
    <div className="itemintro">
            <div className="itemintroinfo">
                購物車({invnum})
            </div>
            <div className="itemintronum">
                數量
            </div>
            <div className="itemintrop">
                單價
            </div>
            <div className="itemintrotp">
                小計
            </div>
    </div>
        <div className="itemarea">
            <Item/>
        </div>
        <div className="order" style={{color: '#3F3A3A', fontWeight: 'bolder', fontSize: 'medium'}}>訂購資料</div>
        <div className="orderhr"><hr width="100%"/></div>

        <div id="orderper" style={{width: '100%', margin: '50px auto'}}>
            <div className="data">
                <div className="cardholder">收件人姓名</div>
                <input className="cardholderd" type="text" id="name" style={{height:'23px'}} name="name" placeholder="Name" required/><br/>
            </div>
            <font className="complete">務必填寫完整收件人姓名，避免包裹無法順利簽收</font>
            <div className="data">
                <div className="cardholder">E-mail</div> 
                <input className="cardholderd" type="text" id="email" style={{height:'23px'}} name="email" placeholder="E-mail" required/><br/>
            </div>
            <div className="data">
                <div className="cardholder">手機</div>
                <input className="cardholderd" type="phone" id="phone" style={{height:'23px'}} name="phone" placeholder="Phone" required/><br/>
            </div>
            <div className="data">
                <div className="cardholder">地址</div> 
                <input className="cardholderd" type="address" id="address" style={{height:'23px'}} name="address" placeholder="Address" required/><br/>
            </div>
            <div className="data">
                <div className="cardholder">配送時間</div>  
                <input type="radio" name="time"  value="8:00-12:00"/> 8:00-12:00
                <input type="radio" name="time"  style={{marginLeft:'50px'}} value="14:00-18:00"/> 14:00-18:00
                <input type="radio" name="time" style={{marginLeft:'50px'}}  value="不指定"/> 不指定
            </div>
        </div>
        
        <div className="order" style={{color: '#3F3A3A', fontWeight: 'bolder', fontSize:'medium'}}>付款資料</div>
        <div className="orderhr"><hr width="100%"/></div>  
        <div id="orderper" style={{width: '100%', margin: '50px auto'}}>
            <div className="data">
            <div className="cardholder">信用卡號碼</div>
            <div className="tpfield" id="card-number" style={{height:'25px'}}></div>
            </div>
            <div className="data">
            <div className="cardholder">有效期限</div>
            <div className="tpfield" id="card-expiration-date" style={{height:'25px'}}></div>
            </div>
            <div className="data">
            <div className="cardholder">安全碼</div>
            <div className="tpfield" id="card-ccv" style={{height:'25px'}}></div>
            </div>
        </div> 
        
        <div className="totalsum">
            <div className="totalsumm">
                <div className="totalsummm">
                    <div className="totalsuminfo" style={{color: '#000000', fontWeight: 'bolder', fontSize:'medium'}}>總金額</div>
                    <div className="totalsump" style={{color: '#000000', fontWeight: 'bolder', fontSize:'larger'}}>NT.{tprice}</div>
                </div>
                <div className="totalsummm">
                    <div className="totalsuminfo" style={{color: '#000000', fontWeight: 'bolder', fontSize:'medium'}}>運費</div>
                    <div className="totalsump" style={{color: '#000000', fontWeight: 'bolder', fontSize:'larger'}}>NT.30</div>
                </div>
                <hr className="payhr"/>
                <div className="totalsummm">
                    <div className="totalsuminfo" style={{color: '#000000', fontWeight: 'bolder', fontSize:'medium'}}>應付金額</div>
                    <div className="totalsump" style={{color: '#000000', fontWeight: 'bolder', fontSize:'larger'}}>NT.{tprice+30}</div>
                </div>
                <div className="totalpaybtn">
                <button className="paybtn" onClick={payment} type="button" style={{color: '#ffffff', backgroundColor: '#000000', width: '100%', height: '50px', cursor:'pointer'}}>
                    <i className="btnfont">確認付款</i>
                    </button>
                </div>
            </div>
            <div className="totalpaybtn1">
            <button className="paybtn" type="button" onClick={payment} style={{color: '#ffffff', backgroundColor: '#000000', width: '100%', height: '50px', cursor:'pointer'}}>
                <i className="btnfont">確認付款</i>
                </button>
            </div>
        </div>

</div>

        );
    }
    
export default Checkout;

export function getTPDirect(){
    return new Promise((resolve, reject) => {
        if (typeof window.TPDirect !== 'undefined') {
            return resolve(window.TPDirect)
        } else {
            const script = window.document.createElement('script')
            script.src = "https://js.tappaysdk.com/tpdirect/v5.1.0"
            script.async = true
            script.onload = () => {
                if(typeof window.TPDirect !== 'undefined') {
                       resolve(window.TPDirect)
                } else {
                       reject(new Error('failed to load TapPay sdk'))
                }
            }
            script.onerror = reject
            window.document.body.appendChild(script);
        }
    })
}