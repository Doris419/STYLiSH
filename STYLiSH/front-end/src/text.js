import React, { useDebugValue, useEffect, useState, useSyncExternalStore} from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink} from "react-router-dom";
import './index.css';
    
    const Text = (props) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        const text = props.text;
        const [detail, setDetail] = useState([]);
        var color = [];
    
        useEffect(() => {
            const res = fetch("http://44.226.224.61:8000/api/v1/product/details/"+text.p_id)
            .then(r => r.json())
            .then(data => setDetail(data)) 
        },[text])
        
        for(var i=0;i<detail.length;i++){
            if(color.indexOf(detail[i].color)==-1){
                color.push(detail[i].color)
            }
        }  

        var colorcode = color.map((color,index) =><button className="cobtn" type="button"
        style= {{backgroundColor:color,width:'24px',height:'24px'}}></button>)
        
        return (
            <div className="section">
                <Link to={"/details/"+text.p_id}><button className="pdbtn" type="button"><img className="productimg" src={text.img} /></button></Link>
                <div className="colorchoice">
                    {colorcode}
                </div>
                <div className="product">{text.name}</div>
                <div className="product">TWD. {text.price}</div>                    
            </div>
        );
    }
export default Text;
