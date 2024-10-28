// import { ImageProvider } from "../context/ImageContext";
import ImagePage from "./ImagePage";


function ImgPage() {
  return (
    // <ImageProvider>
      <div className="bg-gray-300 w-full min-h-screen absolute flex justify-center items-center">
        <ImagePage />
      </div>
    // </ImageProvider>
  );
}

export default ImgPage;