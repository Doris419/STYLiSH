import React, { useDebugValue, useEffect, useState, useSyncExternalStore} from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink} from "react-router-dom";
import './index.css';
import remove from './images/cart-remove.png';

    const Item = () => {
        var itemName = JSON.parse(localStorage.getItem('itemName'));
        var itemPrice = JSON.parse(localStorage.getItem('itemPrice'));
        var itemCate = JSON.parse(localStorage.getItem('itemCate'));
        var itemSize = JSON.parse(localStorage.getItem('itemSize'));
        var itemColor = JSON.parse(localStorage.getItem('itemColor'));
        var itemNum = JSON.parse(localStorage.getItem('itemNum'));
        var itemImg = JSON.parse(localStorage.getItem('itemImg'));
        var itemLimit = JSON.parse(localStorage.getItem('itemLimit'));
        var invnum = localStorage.getItem('invnum');
        

var itemall = itemName.map((itemName,index)=>{

    var itemArray=[];
        for(var i=1;i<=itemLimit[index];i++){
            itemArray.push(i)   
        }
        
        var changeNum = (num) => {
            itemNum.splice(index,1,parseInt(num))
            localStorage.setItem('itemNum',JSON.stringify(itemNum))
            var newinvNum = 0
            itemNum.map((itemnum,index) => {
                newinvNum=newinvNum+itemnum;
            })
            localStorage.setItem('invnum',newinvNum)
            window.location.reload();
        }

        var removeItemmm = () => { 
            var newitemName = JSON.parse(localStorage.getItem('itemName'))
            newitemName.splice(index,1)
            localStorage.setItem('itemName',JSON.stringify(newitemName))
            itemPrice.splice(index,1)
            localStorage.setItem('itemPrice',JSON.stringify(itemPrice))
            itemCate.splice(index,1)
            localStorage.setItem('itemCate',JSON.stringify(itemCate))
            itemSize.splice(index,1)
            localStorage.setItem('itemSize',JSON.stringify(itemSize))
            itemColor.splice(index,1)
            localStorage.setItem('itemColor',JSON.stringify(itemColor))
            itemNum.splice(index,1)
            localStorage.setItem('itemNum',JSON.stringify(itemNum))
            itemImg.splice(index,1)
            localStorage.setItem('itemImg',JSON.stringify(itemImg))
            itemLimit.splice(index,1)
            localStorage.setItem('itemLimit',JSON.stringify(itemLimit))
            
            invnum=invnum-1;
            localStorage.setItem('invnum',parseInt(invnum))
            window.location.reload();
        }
    
return (
<div style={{width: '100%'}}>
    <hr className="hr1"/>
                <div className="itemall">
                    <div className="iteminfo">
                        <button className="itempic" type="button"><img className="itempicture" src={itemImg[index]} /></button>
                        <div className="i">
                                <div className="item">{itemName}</div>
                                <div className="item">201807201824</div>
                                <div className="item">
                                    <p>顏色 |&nbsp;</p>
                                    <p>{itemColor[index]}</p>
                                </div>
                                <div className="item">
                                    <p>尺寸 |&nbsp;</p>
                                    <p>{itemSize[index]}</p>
                                </div>
                        </div>
                    </div>
                    <div className="itemnum">
                        <select className="selectnum" id="test" onChange={(e) => {changeNum(e.target.value)}}>
                        <option select hidden value={itemNum[index]}>{itemNum[index]}</option>
                        {itemArray.map((i) => <option value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div className="itemprice">
                        <div id="itemprice">TWD. {itemPrice[index]}</div>
                    </div>
                    <div className="itemprice">
                        <div id="itemtotalp">TWD. {itemPrice[index]*itemNum[index]}</div>
                    </div>
                    <div className="itemremove">
                        <button className="itemtrash" onClick={removeItemmm}><img  src={remove} /></button>
                    </div>
                </div>
                
                <div className="itemmmmmmm0">
                    <div className="itemintronum1">
                        數量
                    </div>
                    <div className="itemintrop1">
                        單價
                    </div>
                    <div className="itemintrotp1">
                        小計
                    </div>
                </div>

                <div className="itemmmmmmm">
                    <div className="itemnum1">
                        <select className="selectnum1" id="test1" onChange={(e) => {changeNum(e.target.value)}}>
                        <option select hidden value={itemNum[index]}>{itemNum[index]}</option>
                        {itemArray.map((x) => <option value={x}>{x}</option>)}
                        </select>
    
                    </div>
                    <div className="itemprice1">
                        <div id="itemprice">TWD. {itemPrice[index]}</div>
                    </div>
                    <div className="itemprice1">
                        <div id="itemtotalp1">TWD. {itemPrice[index]*itemNum[index]}</div>
                    </div>
                </div>
</div>
        );
    })  

    return itemall;
    }

export default Item;