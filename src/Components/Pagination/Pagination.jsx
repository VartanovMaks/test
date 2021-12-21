import React from 'react';
import { useEffect} from 'react';
import { useState } from 'react';
import PATHTO from '../Constants';
import PagesNumber from './PagesNumber';
import './Pagination.css'

function Pagination({setFetchData}) {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [filmsAmount, setFilmsAmount] = useState();
    const [totalPages, setTotalPages] = useState();
    const [itemsOnPage, setItemsOnPage] = useState(4);
    
    const fetchFilmsAmount = async () => {
        try{
            const response = await fetch(`${PATHTO.HOST_NAME}/films/count`);
            const result = await response.json();
            setFilmsAmount(result);
        } catch (error) {
            console.log('Ошибка загрузки заданий', error);
        }
      }
    
    useEffect(()=>{
        
        fetchFilmsAmount();
        if(filmsAmount>0) {
            const totPages = Math.ceil(filmsAmount/itemsOnPage);
            const currPage = localStorage.getItem("currentPage");
            console.log('useEffect #1. currPage totPages', currPage, totPages);
        
            if (!currPage || currPage > totPages ){
                localStorage.setItem("currentPage", 1);
                setCurrentPage(1);
            }
            setCurrentPage(currPage);
            setTotalPages(totPages);
        }
    },[itemsOnPage, filmsAmount]);

    useEffect(()=>{
        const storedCurrentPage = localStorage.getItem("currentPage");
        let skip;
        console.log('useEffect #2. currentPage storedCurrentPage', currentPage, storedCurrentPage);
        if (storedCurrentPage){ 
            if(!(currentPage === "") )  
                setCurrentPage(storedCurrentPage);
            skip = (storedCurrentPage-1) * itemsOnPage;
            }
        else skip = 0;
        
        setFetchData({limit:itemsOnPage, skip})
    },[currentPage, itemsOnPage]);

    const onChangeHandler = (e) =>{
        debugger;
        const regex = /[0-9]+$/;
        // var reg = /^\d+$/;
        let {target:{value} } = e;
        if(value === "" ){
            setCurrentPage(value);
            return;
        } 
        if(regex.test(value)) {
            if(value > totalPages) value = totalPages;
            if ( value <= 1) value = 1;
            localStorage.setItem("currentPage",value);
            setCurrentPage(value);
        }
    }

    const onKeyPressed = (e)=>{
        let value = e.target.value;
        if (e.key === "Enter"){
            if (value === ""){
                const ls=localStorage.getItem("currentPage");
                setCurrentPage(ls);
            }
        } 
    }

    const onPageChange = (page)=>{
        
        if(page > totalPages) page = totalPages;
        if ( page <= 1) page = 1;
        localStorage.setItem("currentPage",page);
        setCurrentPage(page);
    }

    return (
        <div className="pagination-container">
            <div className='select-pages-amount'>
                <PagesNumber setItemsOnPage={setItemsOnPage}/>
            </div>
            <div className="pagination-div" onClick={()=>onPageChange(1)}>1</div>
            <div className="pagination-div" onClick={()=>onPageChange(+currentPage-1)}>prev</div>
            <input 
                type='text' 
                value={currentPage}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressed}
            >
            </input>
            <div className="pagination-div" onClick={()=>onPageChange(+currentPage+1)}>next</div>
            <div className="pagination-div" onClick={()=>onPageChange(totalPages)}>{totalPages}</div>
            <div style={{width: "10%"}}></div>

        </div>
    );
}

export default Pagination;