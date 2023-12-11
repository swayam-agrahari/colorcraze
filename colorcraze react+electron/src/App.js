import './App.css';
import React, { useState, useMemo } from "react";
import LoadImage from './component/LoadImage'
import Slider from './component/Slider'
import SideBarItem from './component/SideBarItem'

const getDefaultOptions = () => [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
];

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(getDefaultOptions());
  const [editedImages, setEditedImages] = useState([]);
  const [viewedImageIndex, setViewedImageIndex] = useState(null);

  const selectedOption = options[selectedOptionIndex];

  function handleSliderChange({ target }) {
    setOptions((prevOptions) =>
      prevOptions.map((option, index) =>
        index !== selectedOptionIndex
          ? option
          : { ...option, value: target.value }
      )
    );
  }

  const getImageStyle = useMemo(
    () => ({
      filter: options
        .map((option) => `${option.property}(${option.value}${option.unit})`)
        .join(" "),
    }),
    [options]
  );

  function resetStyle() {
    setOptions(getDefaultOptions());
  }

  function handleImageEdit(editedImageUrl) {
    setEditedImages((prevImages) => [...prevImages, editedImageUrl]);
  }

  function handleImageClick(index) {
    setViewedImageIndex(index);
  }

  function closeViewedImage() {
    setViewedImageIndex(null);
  }

  function handleBack() {
    setViewedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : null));
  }

  function handleNext() {
    setViewedImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex < editedImages.length - 1
        ? prevIndex + 1
        : null
    );
  }
  return (
    <div className="App">
      <div className="main">
        <LoadImage style={getImageStyle} resetStyle={resetStyle} onImageEdit={handleImageEdit} />

        <div className="side  bar">
          {options.map((option, index) => (
            <SideBarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          ))}
        </div>
        
        <div className="slider">
          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
        </div>
      </div>
      <div className='gallery-container'>
      <h2>Gallery : )</h2>
        <div className="gallery-navigation">
          <button onClick={handleBack} disabled={viewedImageIndex === 0}>
            Back
          </button>
          <button onClick={handleNext} disabled={viewedImageIndex === editedImages.length - 1}>
            Next
          </button>
        </div>
        <div className="gallery">
          
          {editedImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Edited Image ${index + 1}`}
              className="gallery-image"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        {viewedImageIndex !== null && (
          <div className="modal">
            <button onClick={closeViewedImage}>Close</button>
            <img
              src={editedImages[viewedImageIndex]}
              alt={`Viewed Image ${viewedImageIndex + 1}`}
              className="viewed-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}



export default App;
