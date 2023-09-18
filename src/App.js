/**
 * This React component integrates various features, including:
 * 
 * - A Google Map with markers for "Torri Restaurant" and "Cirkewwa Ferry Terminal."
 * - A video carousel using the react-elastic-carousel library.
 * - Dynamic loading of Google Maps using the useLoadScript hook.
 * - Handling of marker clicks to display information windows.
 * - Loading and displaying images from video URLs.
 * 
 **/


import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from "@react-google-maps/api";
import { useMemo } from "react";
import { useState } from "react";
import "./App.css";
import Carousel from "react-elastic-carousel";
import Item from "./item";

const videos = [1, 2, 3, 4, 5, 6, 7, 8]

const markers = [
  { lat: 35.91781020661272, lng: 14.499177511793086, name: "Torri Restaurant"},
  { lat: 35.98819515176397, lng: 14.328951893593441, name: "Cirkewwa Ferry Terminal" },
];

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDp6VnLXEvQYm0XJLvHu6Nh0Q2cRd86IPo",
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const center = useMemo(() => ({ lat: 35.8992, lng: 14.5141 }), []);
  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div>
    <div className="Carousel">
      
      <Carousel breakPoints={breakPoints}>
        {videos.map((video, key) => { return <Item>
          <a href={video} target="_blank"><img src="https://embed.skylinewebcams.com/img/439.jpg" alt="【LIVE】 Ċirkewwa - Ferry Terminal Boarding Area | SkylineWebcams"></img></a>
          </Item>;
        })}
      </Carousel>
    </div>
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
          options={{mapId: "a8b5c2a59e9d5079"}}
        >
        {markers.map(({ name, lat, lng }, ind) => (
            <MarkerF
              key={ind}
              position={{ lat, lng }}
              onClick={() => {
                handleMarkerClick(ind, lat, lng, name);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindowF
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.address}</h3>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
    </div>
  );
};

export default App;
