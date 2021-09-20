import React, {useState} from 'react';
import PATHTO from './Constants';

const INIT_FILM_DATA={
    name:"",
    year:"",
    country:"",
    poster:"",
    actors: [
      {
        name:"",
        photo:"",
      }
    ]
}

function FilmCreate(props) {

    const [filmData, setFilmData]=useState(INIT_FILM_DATA);
    const [filesToSend, setFilesToSend] = useState(new FormData());
    
    const filesFieldNames={poster:'poster', actors:'actors', images:'images'};
    // const filesFieldNames={poster:'poster', actors:'actors', images:'images'};
    
    function dataToSend () {
        const fd = new FormData();
        for(let [name, value] of filesToSend) {
          fd.append(name, value);
        }
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
    const updateActors = (e) =>{
        const {target:{value, id} } = e;
        let arr = [...filmData.actors];
        let index=Number(id.split('-').pop());
        arr[index].name=value;
        setFilmData({...filmData, actors:arr});
    }
    
    const addActor = ()=>{
      let arr = [...filmData.actors];
      arr.push({name:"", photo:""})
        setFilmData({...filmData, actors:arr})
        console.log(filmData);
    }

    const addActorPhoto = (e)=>{
      const {target:{files, id} } = e;
      let arr = [...filmData.actors];
      let index=Number(id.split('-').pop());
      arr[index].photo=files[0].name;
      setFilmData({...filmData, actors:arr});
      let fd=new FormData();
      for(let [name, value] of filesToSend) {
        fd.append(name, value);
      }
      // fd.delete(filesFieldNames.actors)
      fd.append(filesFieldNames.actors, files[0]);
      console.log([...fd]);
      console.log(filmData);
      setFilesToSend(fd);
    }

    const addImages=({target})=>{
      const {id} = target;
      const images = document.getElementById(id);
    
      let fd=new FormData();
      for(let [name, value] of filesToSend) {
        fd.append(name, value);
      }
      fd.delete(id)
      let imagesNames=[];
      Array.from(images.files).forEach( innerFile => {
        fd.append(id, innerFile);
        imagesNames.push(innerFile.name);
      })
      console.log([...fd]);
      setFilesToSend(fd);
      setFilmData({...filmData, images:imagesNames});  

    }

    const addPoster=(e)=>{
      const {target:{value, id} } = e;
      const poster = value.split('\\').pop().split('/').pop();
      console.log(id,poster);
      setFilmData({...filmData,[id]:poster})
      const file = document.getElementById(id);
      let fd=new FormData();
      for(let [name, value] of filesToSend) {
        fd.append(name, value);
      }
      fd.delete(id)
      console.log(file.files[0]);
      fd.append(filesFieldNames.poster, file.files[0]);
      console.log([...fd]);
      console.log(filmData);
      setFilesToSend(fd);
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
            <input type="file" className="form-control" id={filesFieldNames.poster} onChange={addPoster} />
          </div>
        </div>
        <hr/>
         {/* ==================================================================== */}
         { filmData.actors.map((actor, index) => {
            return (
            <div className="form-group row" key={index}>
            <label for="actors" className="col-1 col-form-label">actors</label>
            <div className="col-3">
              <input type="text" className="form-control" id={`actor-${index}`} value={filmData.actors[index].name} onChange={updateActors} />
            </div>
            <div className="col-4">
              <input type="file" className="form-control" id={`actor-photo-${index}`} onChange={addActorPhoto} />
            </div>
            </div>
            )
         })
        }
        <button type="button" className="btn btn-secondary col-3 mt-3" onClick={addActor}>Add actor</button>
        {/* ==================================================================== */}
          <hr/>
        <div className="form-group row">
          <label for="images" className="col-sm-2 col-form-label">Images</label>
          <div className="col-sm-5">
            <input type="file" className="form-control" id={filesFieldNames.images} multiple onChange={addImages} />
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
