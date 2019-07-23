const inputImgPreview = (inputDom, imgDom) => {
  const file = inputDom;
  const reader = new FileReader();
  if (file.value) {
    reader.readAsDataURL(file.files[0]);
    reader.onload = () => {
      imgDom.setAttribute('src', reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  } else {
    imgDom.setAttribute('src', '');
  }
};


export default inputImgPreview;
