import './index.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import React, { useDebugValue, useEffect, useContext , useState, useSyncExternalStore} from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink , useParams} from "react-router-dom";
const Product = (props) => {
    
    let githubURL = new URL(window.location.href);
    let params = githubURL.pathname;
    var key = params.substring(9, params.length);
    const [item, setItem] = useState([]);
    var [num, setNum] = useState(0);
    var [limit, setLimit] = useState(0);
    var [size, setSize] = useState("");
    var [colorselect, setColor] = useState("");
    var color = [];
    var oldnum =  localStorage.getItem('invnum');

    if((JSON.parse(localStorage.getItem('itemName'))||[]).length!=0){
        var itemName = JSON.parse(localStorage.getItem('itemName'));
    }else{
        var itemName = [];
    }
    if((JSON.parse(localStorage.getItem('itemPrice'))||[]).length!=0){
        var itemPrice = JSON.parse(localStorage.getItem('itemPrice'));
    }else{
        var itemPrice = [];
    }
    if((JSON.parse(localStorage.getItem('itemId'))||[]).length!=0){
        var itemId = JSON.parse(localStorage.getItem('itemId'));
    }else{
        var itemId = [];
    }
    if((JSON.parse(localStorage.getItem('itemSize'))||[]).length!=0){
        var itemSize = JSON.parse(localStorage.getItem('itemSize'));
    }else{
        var itemSize = [];
    }
    if((JSON.parse(localStorage.getItem('itemColor'))||[]).length!=0){
        var itemColor = JSON.parse(localStorage.getItem('itemColor'));
    }else{
        var itemColor = [];
    }
    if((JSON.parse(localStorage.getItem('itemNum'))||[]).length!=0){
        var itemNum = JSON.parse(localStorage.getItem('itemNum'));
    }else{
        var itemNum = [];
    }
    if((JSON.parse(localStorage.getItem('itemImg'))||[]).length!=0){
        var itemImg = JSON.parse(localStorage.getItem('itemImg'));
    }else{
        var itemImg = [];
    }
    if(JSON.parse(localStorage.getItem('itemLimit')).length!=0){
        var itemLimit = JSON.parse(localStorage.getItem('itemLimit'));
    }else{
        var itemLimit = [];
    }

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        const res = fetch("http://44.226.224.61:8000/api/v1/product/details/"+key)
            .then(r => r.json())
            .then(data => setItem(data))   
    },[])

    if(item.length!=0){
 
                for(var i=0;i<item.length;i++){
                    if(color.indexOf(item[i].color)==-1){
                        color.push(item[i].color)
                    }
                }
                
                var colorcode = color.map((color,index) =><button className="cobtn" type="button" onClick={(event)=>{ getcolor(event.target.value)}} value={color}
                style= {{backgroundColor:color,width:'24px',height:'24px'}}></button>)
        
                var getcolor = (e) => {
                    setColor(e)
                    setNum(0)
                }
    
                var getsize = (e) => {
                    setSize(e);
                    setNum(0)
                }

                var plus = () => {
                    var nummm = 0;
                    for(var i=0;i<item.length;i++){
                        if(item[i].color==colorselect && item[i].size==size){
                                nummm = item[i].num;
                        }
                    }
                    if(num<nummm){
                        setNum(num=num+1);
                    } 
                }
                    
                var minus = () => {
                    if(num>0){
                        setNum(num=num-1);
                    }
                }

                var addCart = () => {
                    itemName.push(item[0].name);
                    itemPrice.push(item[0].price);
                    itemId.push(item[0].p_id);
                    itemSize.push(size);
                    itemColor.push(colorselect);
                    itemImg.push(item[0].img)
                    itemNum.push(parseInt(num));
                    
                    var numlimit = 0;
                    for(var i=0;i<item.length;i++){
                        if(item[i].color==colorselect && item[i].size==size){
                                numlimit = item[i].num;
                        }
                    }
                    itemLimit.push(numlimit);

                    let itemNameString= JSON.stringify(itemName);
                    let itemPriceString= JSON.stringify(itemPrice);
                    let itemIdString= JSON.stringify(itemId);
                    let itemSizeString= JSON.stringify(itemSize);
                    let itemColorString= JSON.stringify(itemColor);
                    let itemNumString= JSON.stringify(itemNum);
                    let itemImgString= JSON.stringify(itemImg);
                    let itemLimitString= JSON.stringify(itemLimit);

                    localStorage.setItem('itemName', itemNameString);
                    localStorage.setItem('itemPrice', itemPriceString);
                    localStorage.setItem('itemId', itemIdString);
                    localStorage.setItem('itemSize', itemSizeString);
                    localStorage.setItem('itemColor', itemColorString);
                    localStorage.setItem('itemNum', itemNumString);
                    localStorage.setItem('itemImg', itemImgString);
                    localStorage.setItem('itemLimit', itemLimitString);
                    
                    localStorage.setItem('invnum', parseInt(oldnum)+1);
                    props.cartnum(parseInt(oldnum)+1);
                
                }
    
        return (
            <div>
                <div className="psection" id='psection'>
                    <div className="bigpitembtn">
                        <button className="pitembtn" type="button"><img className="pitemimg" id="pitemimg"
                                src={item[0].img} /></button>
                    </div>
        
                    <div className="pdetail" id="pdetail">
                        <div className="product" id="productname">{item[0].name}</div>
                        <font color="grey">201807201824</font>
                        <div className="product" id="productprice">TWD. {item[0].price}</div>
                        <hr/>
        
                        <div className="itemchoice">
                            <p>顏色 |&nbsp;&nbsp;</p>
                            {colorcode}
                        </div>

                        <div className="itemchoice">
                            <p>尺寸 |&nbsp;&nbsp;</p>
                            <button className="cobtns" type="button" onClick={(event)=>{ getsize(event.target.value)}} value="S"
                                style={{backgroundColor:'#f9f6f6',width:'26px',height:'26px'}}>S</button>
                            <button className="cobtns" type="button" onClick={(event)=>{ getsize(event.target.value)}} value="M"
                                style={{backgroundColor:'#ffffff',width:'26px',height:'26px'}}>M</button>
                            <button className="cobtns" type="button" onClick={(event)=>{ getsize(event.target.value)}} value="L"
                                style={{backgroundColor:'#ffffff',width:'26px',height:'26px'}}>L</button>
                        </div>
                        <div className="itemchoice1">
                            <p className="num">數量 |&nbsp;</p>
                            <form id='myform' method='POST' action='#'>
                                <input type='button' value='-' className='qtyminus' field='quantity' onClick={minus}/>
                                <input type='text' id="id" name='quantity' value={num} className='qty'></input>
                                <input type='button' value='+' className='qtyplus' field='quantity' onClick={plus}/>
                            </form>
                            
                        </div>
                        <div>
                            <button className="itembtn1" type="button" onClick={addCart}
                                style={{color: '#ffffff', backgroundColor:'#000000',width:'78%',height:'40px'}}>加入購物車</button>
                            <button className="itembtn2" type="button" onClick={addCart}
                                style={{color: '#ffffff', backgroundColor:'#000000',width:'95%',height:'50px'}}>
                                <i className="btnfont">加入購物車</i></button>
                        </div>
                        <div className="mateiralfont">
                            <font className="mateiralf" color="black">實品顏色依單品照為主 <br/><br/> 棉 100%<br/> 厚薄：薄<br/> 彈性：無 <br/><br/>
                                清洗：手洗，溫水<br/> 產地：中國 </font><br/>
                        </div>
                    </div>
        
                </div>
                <div className="itemdetail">
                    <font color="brown">更多產品資訊 </font>
                    <hr width="88%"/>
                </div>
                <div className="itemmore">
                    <font color="black">O.N.S is all about options, which is why we took our staple polo shirt and
                        upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer
                        style extra-breezy. </font>
                </div>
                <div className="bigitemimg">
                    <img className="itemimg" src= {image1} />
                    <img className="itemimg" src= {image2} />
                </div>
                </div>
        );
            

    }

        
    
};

export default Product;