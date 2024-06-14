"use client";
import React, { useState } from "react";
import axios from "axios";
import GifGrid from "./componenets/GifGrid";

export default function Home() {
  const [gifImages, setGifImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSize, setImageSize] = useState("original");
  const [relatedGifImages, setRelatedGifImages] = useState([]);

  const fetchData = async (query, isRelated) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: apiKey,
          q: query,
          limit: 25,
          offset: 0,
          lang: "en",
          bundle: "messaging_non_clips",
        },
      });
      const data = response.data.data;
      const sortedData = data.sort(
        (a, b) => new Date(a.import_datetime) - new Date(b.import_datetime)
      );
      const filteredData = sortedData.filter((gif) => gif.username.length > 0);
      if (isRelated) {
        setRelatedGifImages(filteredData);
      } else {
        setGifImages(filteredData);
      }
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setGifImages([]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetchData(searchQuery, false);
    } else {
      setGifImages([]);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(gifImages[index]);
    console.log(gifImages[index].title);
    fetchData(gifImages[index].title, true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setRelatedGifImages([]);
  };

  const changeImageSize = (size) => {
    setImageSize(size);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl px-4">
        <div className="flex flex-col items-center mt-5">
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search GIFs..."
              className="p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="p-2 ml-2 text-white bg-blue-500 rounded-lg"
            >
              Search
            </button>
          </div>
          <GifGrid
            gifImages={gifImages}
            handleImageClick={handleImageClick}
            related={false}
          />
        </div>
        {selectedImage && (
          <div
            className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75"
            onClick={handleCloseModal}
          >
            <div
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2">
                <button
                  onClick={() => changeImageSize("original")}
                  className="p-2 mr-2 text-white bg-blue-500 rounded-lg"
                >
                  Original Size
                </button>
                <button
                  onClick={() => changeImageSize("bigger")}
                  className="p-2 text-white bg-blue-500 rounded-lg"
                >
                  Bigger Size
                </button>
              </div>
              <img
                src={selectedImage.images.original.url}
                alt={selectedImage.title}
                className={`${
                  imageSize === "bigger" ? "w-[400px]" : "w-[200px]"
                } max-h-full`}
              />
               <GifGrid
                gifImages={relatedGifImages}
                handleImageClick={handleImageClick}
                related={true}
                setSelectedImage={setSelectedImage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}