import React, { useEffect, useState } from 'react';
import Preview from './Preview';

function PhotoPreview({field, filesFormData}) {
    
    const [previewFile, setPreviewFile] = useState([]);
    
    useEffect(()=>{
        
        let filesArray=[];
        if(filesFormData){
            for(let [name, value] of filesFormData) {
              if(name === field) filesArray.push(value);
            }
            setPreviewFile(filesArray);
        }
    },[filesFormData]);
    
    return (
        <div>
          {previewFile && previewFile.map(file=> <Preview preview={file}/>)}
        </div>
    );
}

export default PhotoPreview;