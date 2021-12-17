import React from 'react';
import { useEffect} from 'react';
import { useState } from 'react';
import PATHTO from '../Constants';
import './Pagination.css'

function Pagination(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsOnPage = 5;
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
        if(filmsAmount>0) setTotalPages(Math.ceil(filmsAmount/itemsOnPage));
    },[filmsAmount]);

    useEffect(()=>{
        const storedCurrentPage = localStorage.getItem("currentPage");
        if (storedCurrentPage) setCurrentPage(storedCurrentPage);
    },[]);

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
                localStorage.setItem("currentPage",1);
                setCurrentPage(1);
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
            <div onClick={()=>onPageChange(currentPage-1)}>prev</div>
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