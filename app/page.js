"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
  const [gifImages, setGifImages] = useState([]);
  const [value, setValue] = useState("a");
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${value}&limit=25&offset=0&lang=en&bundle=messaging_non_clips`
      console.log(url)
      const gifsData = await axios.get(url);
      const data = gifsData.data.data
      data.sort((a, b) => (new Date(a.import_datetime) - new Date(b.import_datetime)));
      const filtered = data.filter(s => s.username.length > 0);
      setGifImages(filtered)
    }
    fetchData()
  }, [value])
  return (
    <div className="flex flex-col ">
      <div>
        <input onChange={(e) => setValue(e.target.value)} />
      </div>
      <div className="grid items-center w-screen h-screen grid-cols-4 border border-black">
        {
          gifImages.map((e, i) => (
            <div key={i} className="border-[2px] border-black">
              <img src={e.images.original.url} ult={e.title} className="object-cover " />
            </div>
          ))
        }
      </div>
    </div>
  )
}