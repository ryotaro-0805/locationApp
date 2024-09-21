'use client'
import { useEffect, useState } from "react";


export default function Home():JSX.Element {
  const [address,setAddress]=useState<string|null>(null);
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude}=position.coords;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
  .then(response => response.json())
  .then((data)=>{
    const formattedAddress=data.results[0]?.formatted_address;
    setAddress(formattedAddress || '住所が取得できませんでした。');
  });
      });
    }
  },[]);

  return (
<div>
  <h1 className="m-3 text-3xl text-center">場所情報取得アプリ</h1>
  <h2 className="m-3 text-xl text-center">Created by <span className="text-violet-500">Ryotaro</span>.</h2>
  <hr />
  <p className="m-3 text-center">あなたがいる現在の場所は: <br /> {address? address:'取得中...'}です。</p>
</div>
  );
}
