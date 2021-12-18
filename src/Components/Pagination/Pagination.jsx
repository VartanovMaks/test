import React from 'react';
import { useEffect} from 'react';
import { useState } from 'react';
import PATHTO from '../Constants';
import './Pagination.css'

function Pagination({itemsOnPage, setFetchData}) {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [filmsAmount, setFilmsAmount] = useState();
    const [totalPages, setTotalPages] = useState();
    
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
            if (!currPage)
                localStorage.setItem("currentPage", 1);
            else if (currPage > totPages ){
                localStorage.setItem("currentPage", 1);
                setCurrentPage(currPage);
            }
            setTotalPages(totPages);
        }
    },[itemsOnPage, filmsAmount]);

    useEffect(()=>{
        const storedCurrentPage = localStorage.getItem("currentPage");
        let skip;
        
        if (storedCurrentPage){ 
            if(!(currentPage === "") )  
                setCurrentPage(storedCurrentPage);
            skip = (storedCurrentPage-1) * itemsOnPage;
            }
        else skip = 0;
        
        setFetchData({limit:itemsOnPage, skip})
    },[currentPage]);

    const onChangeHandler = (e) =>{
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
            <div onClick={()=>onPageChange(1)}>1</div>
            <div onClick={()=>onPageChange(+currentPage-1)}>prev</div>
            <input 
                type='text' 
                value={currentPage}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressed}
            >
            </input>
            <div onClick={()=>onPageChange(+currentPage+1)}>next</div>
            <div onClick={()=>onPageChange(totalPages)}>{totalPages}</div>
        </div>
    );
}

export default Pagination;