import imageCompression from 'browser-image-compression';

async function imgCompression(event, callback) {
  const imageFile = event.target.files[0];

  let options = {
    maxSizeMB: 0.02,
    maxWidthOrHeight: 280,
    useWebWorker: true,
  };
  try {
    const compressedFile =
      imageFile.size > options.maxSizeMB * 1024
        ? await imageCompression(imageFile, options)
        : imageFile;
    await callback(compressedFile);
  } catch (error) {
    console.log(error);
  }
}

export default imgCompression;
