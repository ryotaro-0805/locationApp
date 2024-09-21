// 'use client'
import { useEffect, useState } from "react";


export default function Home():JSX.Element {
  const [address,setAddress]=useState<string|null>(null);
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude}=position.coords;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDzTvZtowEb7v1SRNizfQ-D3vNZOzi7HDQ`)
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
  <h1>Weather App</h1>
  <p>現在の住所:{address? address:'取得中...'}</p>
</div>
  );
}
