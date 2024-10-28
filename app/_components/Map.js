"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../_geolocation/useGeolocation";
import useURLPosition from "../_geolocation/useURLPosition";
import { useActiveCity } from "./ActiveCityContext";
import { CITIES_PER_PAGE } from "../_utils/constants";

export default function Map({ cities }) {
  const [mapPosition, setMapPosition] = useState([52.409538, 16.931992]);
  const { activeCity } = useActiveCity();
  const [cityLat, cityLng] = useURLPosition();
  const [lastPosition, setLastPosition] = useState(null); // New state to store the last valid position(without it when clicking first the marker and then one of cityitems the map doesnt move)
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const router = useRouter();

  useEffect(() => {
    if (cityLat && cityLng) {
      setMapPosition([cityLat, cityLng]);
      setLastPosition([cityLat, cityLng]); // Save the current city position as lastPosition
    }
  }, [cityLat, cityLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      setLastPosition([geolocationPosition.lat, geolocationPosition.lng]); // Save the geolocation position as lastPosition
      router.push("/map/cities");
    }
  }, [geolocationPosition, router]);

  useEffect(() => {
    if (activeCity) {
      setMapPosition([activeCity.lat, activeCity.lng]);
      setLastPosition([activeCity.lat, activeCity.lng]); // Save active city position as lastPosition
    }
  }, [activeCity]);

  // When no cityLat and cityLng, use lastPosition
  useEffect(() => {
    if (!cityLat && !cityLng && lastPosition) {
      setMapPosition(lastPosition);
    }
  }, [cityLat, cityLng, lastPosition]);

  return (
    <div className="w-full flex-1 relative">
      {!geolocationPosition && (
        <button
          className="bg-primary-800 rounded-md py-3 px-6 cursor-pointer font-semibold absolute z-[1000] bottom-20 left-50 left-1/2 -translate-x-1/2 uppercase hover:bg-primary-600 active:bg-primary-600 transition-colors duration-500"
          onClick={getPosition}
        >
          {isLoadingPosition ? "Loading position..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <MarkerWithClick
            key={city.id}
            position={[city.lat, city.lng]}
            city={city}
            cityIndex={cities.findIndex((c) => c.id === city.id)}
          />
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const router = useRouter();
  useMapEvents({
    click: (e) => {
      router.push(`/map/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 11);
  }, [position, map]);
  return null;
}

function MarkerWithClick({ position, city, cityIndex }) {
  const map = useMap();
  const router = useRouter();
  const { handleSetActiveCity, activeCity } = useActiveCity();

  const pageNumber = Math.floor(cityIndex / CITIES_PER_PAGE) + 1;

  const handleClick = function () {
    map.setView(position, 13);
    handleSetActiveCity(city);
    localStorage.setItem("currentPage", pageNumber);
    router.push(`/map/cities/${city.id}?lat=${city.lat}&lng=${city.lng}`);
  };

  return (
    <Marker position={position} eventHandlers={{ click: handleClick }}>
      <Popup open={activeCity?.id === city.id}>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
  );
}
