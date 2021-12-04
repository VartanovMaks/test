/* eslint-disable no-useless-concat */
import React, { useEffect, useState } from 'react';
import './Home.css'

function Home(props) {

    const [protocol, setProtocol]=useState([]);

    const arr1=[1,3,5,7,9];
    const arr2=[2,4,5,6,8,9];
    const rez = arr1.filter(el => {
        return !arr2.includes(el)
      });
    
    function startRandomChoice (e){
        setProtocol([]);
        let initArr =[1,2,3,4,5,6,7,8];
        let intervalsArr=[];    
        let sequenceArr=[];    
        let tmpArr=[...initArr];
        
        for(let i=8; i>0; i--){
            let koeficient = 10/tmpArr.length;
            let randomValue = Math.random()*10;
            let index = Math.ceil(randomValue/koeficient)-1;
            let  magnetNumber =tmpArr[index];
            sequenceArr.push(magnetNumber);
            tmpArr.splice(index,1);
        }
        // console.log('sequenceArr', sequenceArr);
        
        for(let i=8; i>0; i--){
            let randomDelay = Math.round(Math.random()*10000, 2);
            if (randomDelay < 2000 ) randomDelay += 2000;
            intervalsArr.push(randomDelay)
        }
        // console.log('intervalsArr', intervalsArr);
    
        const delay = ms => new Promise(res => setTimeout(res, ms));
        
        const yourFunction = async () => {
            e.target.innerText="Отсчет пошел";
            for(let i=0; i<intervalsArr.length; i++){
                await delay(intervalsArr[i]);
                const counter= e.target.className
                if (i===0) e.target.className = counter +" " + "counter";
                e.target.innerText=sequenceArr[i];
                console.log(`Magtnet ${sequenceArr[i]} waited ${intervalsArr[i]/1000} s`);
            }
            await delay(5000);
            e.target.className = "home-btn";
            e.target.innerText="Начать отсчет";
            let t=[];
            intervalsArr.forEach((item, index)=>t.push({value:sequenceArr[index], delay:intervalsArr[index]/1000}));
            setProtocol(t);
        };
        yourFunction();
    }

    
    return (
        <div className='container'>
            <button className="home-btn" onClick={(e)=>startRandomChoice(e)}> Начать отсчет</button>
            <div>
                {protocol.length===8 && <h4> Протокол </h4>}
                {!!protocol && protocol.map(item=><p>Магнит {item.value} задержка {item.delay} сек.</p>)}
            </div>
        </div>)
}

export default Home;