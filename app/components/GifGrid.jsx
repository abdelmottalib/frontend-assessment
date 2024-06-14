import React from "react";

const GifGrid = ({gifImages, handleImageClick, related, setSelectedImage}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {gifImages.map((gif, index) => (
        <div
          key={index}
          className={`${related ? "w-[100px]" : "w-full"} border border-gray-300 rounded-lg overflow-hidden cursor-pointer flex flex-col`}
          onClick={() => {
            related ? setSelectedImage(gifImages[index]):
            handleImageClick(index)
        }}
        >
          <img
            src={gif.images.fixed_width_small.url}
            alt={gif.title}
            className={"w-full h-full object-cover"}
          />
        </div>
      ))}
    </div>
  );
};

export default GifGrid;