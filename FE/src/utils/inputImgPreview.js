const inputImgPreview = (inputDom, imgDom) => {
  const file = inputDom;
  const reader = new FileReader();
  reader.readAsDataURL(file.files[0]);
  reader.onload = () => {
    console.log(reader.result);
    imgDom.setAttribute('src', reader.result);
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
};


export default inputImgPreview;
