import React, { useState, useRef, useEffect } from "react";

function LoadImage({ style,resetStyle,onImageEdit }) {
  const printRef = useRef();
  const [file, setFile] = useState();
  const [capturedImageUrl, setCapturedImageUrl] = useState();

  function handleChange(e) {
    setCapturedImageUrl(null);
    setFile(URL.createObjectURL(e.target.files[0]));
    resetStyle();
  }

  function downloadImage() {
    const imageElement = printRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");    
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    context.filter = style.filter;
    context.drawImage(imageElement, 0, 0);    
    const dataUrl = canvas.toDataURL();  
    setCapturedImageUrl(dataUrl);
    onImageEdit(dataUrl);
  
  }
  useEffect(() => {
    if (capturedImageUrl) {
      const a = document.createElement("a");
      a.href = capturedImageUrl;
      a.download = "captured_image.png"; 
      a.click();
    }
  }, [capturedImageUrl]);

  return (
    <>
      <h1 className="header">ColorCraze</h1>
      <div className="image-div">
        <img src={file} className="image-file" style={style} ref={printRef} />
      </div>
    <div className="image-buttons">
      <input type="file" id="choose-file-button" onChange={handleChange} />
      <button onClick={downloadImage} className="download-button">Download</button>
      </div>
    </>
  );
}

export default LoadImage;
