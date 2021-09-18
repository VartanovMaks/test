import React, {useState} from 'react';
import PATHTO from './Constants';

const INIT_FILM_DATA={
    name:"",
    year:"",
    country:"",
    poster:"",
}

function FilmCreate(props) {

    const [filmData, setFilmData]=useState(INIT_FILM_DATA);
    
    const filesFieldNames=['poster','actors','images'];
    
    function dataToSend () {
        const fd = new FormData();
        console.log(filmData);

        filesFieldNames.forEach(element => {
            const file = document.getElementById(element);
            Array.from(file.files).forEach( innerFile => {
                fd.append(element, innerFile);
            })
        });
        fd.append('data', JSON.stringify(filmData));
        console.log([...fd]);
        return fd;
    }
    
    const submitData = async (e)=>{
        // alert(JSON.stringify(filmData, null, 2));
        e.preventDefault();
        const sendData = dataToSend();
        
            try{
                    const response = await fetch(`${PATHTO.HOST_NAME}/films`, {
                        method: 'POST',
                        body: sendData,
                    });
                    const result = await response.json();
                    console.log(result);
                } catch (error) {
                      console.log('Ошибка загрузки заданий', error);
                }
        setFilmData(INIT_FILM_DATA);
    }

    const updateFilmData = (e) =>{
        const {target:{value, id} } = e;
        setFilmData({...filmData,[id]:value})
    }
    

    return (
        <form id="myForm">
        <div>
        <div className="form-group row">
          <label for="name" className="col-sm-2 col-form-label">Film name</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="name" value={filmData.name} onChange={updateFilmData}/>
          </div>
        </div>
        <div className="form-group row">
          <label for="country" className="col-sm-2 col-form-label">Country</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="country" value={filmData.country} onChange={updateFilmData} />
          </div>
        </div>
        <div className="form-group row">
          <label for="year" className="col-sm-2 col-form-label">Year</label>
          <div className="col-sm-5">
            <input type="number" className="form-control" id="year" value={filmData.year} onChange={updateFilmData}/>
          </div>
        </div>
        <div className="form-group row">
          <label for="poster" className="col-sm-2 col-form-label">Poster</label>
          <div className="col-sm-5">
            <input type="file" className="form-control" id={filesFieldNames[0]} value={filmData.poster} onChange={updateFilmData} />
          </div>
        </div>
        <div className="form-group row">
          <label for="actors" className="col-sm-2 col-form-label">actors</label>
          <div className="col-sm-5">
            <input type="file" className="form-control" id={filesFieldNames[1]}  multiple  />
          </div>
        </div>
        <div className="form-group row">
          <label for="images" className="col-sm-2 col-form-label">Images</label>
          <div className="col-sm-5">
            <input type="file" className="form-control" id={filesFieldNames[2]} multiple  />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5 offset-sm-2">
            <button className="btn btn-primary" onClick={submitData}>Send data</button>
          </div>
        </div>
        </div>
         </form>
    );
}

export default FilmCreate;
