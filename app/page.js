"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import GifGrid from "./Components/GifGrid";
import { debounce } from "lodash";

export default function Home() {
const [gifImages, setGifImages] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [selectedImage, setSelectedImage] = useState(null);
const [imageSize, setImageSize] = useState("original");
const [relatedGifImages, setRelatedGifImages] = useState([]);

const fetchTrendingGIFs = async () => {
  const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/trending`, {
      params: {
        api_key: apiKey,
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
    setGifImages(filteredData);
  } catch (error) {
    console.error("Error fetching trending GIFs:", error);
    setGifImages([]);
  }
};

useEffect(() => {
  fetchTrendingGIFs();
}, []);

const debouncedSearch = debounce((query) => {
  if (query.trim() !== "") {
    fetchData(query, false);
  } else {
    setGifImages([]);
  }
}, 500);

const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  debouncedSearch(query);
};

const fetchData = async (query, isRelated) => {
  const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: apiKey,
        q: query,
        limit: isRelated ? 10 : 25,
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

const handleImageClick = (index) => {
  // console.log(gifImages[index].title);
  setSelectedImage(gifImages[index]);
  fetchData(gifImages[index].title.substring(0, 37), true);
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
    <div className="w-full max-w-4xl px-4">
      <div className="flex flex-col items-center mt-5">
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for gifs..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
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
                className={`p-2 ${imageSize == "original" ? "bg-green-500":"bg-blue-500"} text-white rounded-md mr-2`}
              >
                Smaller Size
              </button>
              <button
                onClick={() => changeImageSize("bigger")}
                className={`p-2 ${imageSize == "bigger" ? "bg-green-500":"bg-blue-500"} text-white rounded-md`}
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
