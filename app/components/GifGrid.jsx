import React from "react";
import Image from "next/image";

const GifGrid = ({
  gifImages,
  handleImageClick,
  related,
  setSelectedImage,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {gifImages.map((gif, index) => (
        <div
          key={index}
          className={`${
            related ? "w-[100px]" : "w-full"
          } border border-gray-300 rounded-lg overflow-hidden cursor-pointer flex flex-col relative`}
          onClick={() => {
            related
              ? setSelectedImage(gifImages[index])
              : handleImageClick(index);
          }}
        >
          {/* <img
            src={gif.images.fixed_width_small.url}
            alt={gif.title}
            className={"w-full h-full object-cover"}
          /> */}
          <Image
            src={gif.images.original.url}
            alt={gif.title}
            width={gif.images.original.width}
            height={gif.images.original.height}
            onError={(e) => {
            }}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
};

export default GifGrid;
