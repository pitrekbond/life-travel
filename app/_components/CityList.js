"use client";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import CityItem from "./CityItem";
import { useActiveCity } from "./ActiveCityContext";
import Pagination from "./Pagination";
import { CITIES_PER_PAGE } from "../_utils/constants";
import { deleteCity } from "../_lib/actions";

export default function CityList({ cities }) {
  const { activeCity, setActiveCity, handleSetActiveCity } = useActiveCity();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCity = currentPage * CITIES_PER_PAGE;
  const indexOfFirstCity = indexOfLastCity - CITIES_PER_PAGE;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);

  useEffect(
    function () {
      // Restore the page number from localStorage
      const storedPage = localStorage.getItem("currentPage");
      if (storedPage) {
        setCurrentPage(Number(storedPage)); // Restore the saved page
      }

      // Restore the active city
      const storedCityId = localStorage.getItem("activeCityId");
      if (storedCityId && cities.length > 0) {
        const foundCity = cities.find(
          (city) => city.id === Number(storedCityId)
        );
        if (foundCity) {
          setActiveCity(foundCity);
        }
      }
    },
    [cities, setActiveCity]
  );

  //Im calling the action deleteCity here and later pass it down to DeleteButton.js so that when deleting the last city in a page, the page gets set to the previous one and we dont see an empty page. After awaiting the action we need to check the length of cities -1 (still old state is reflected immediately after deletion, probably because we render cities from the parent component and it takes a while)
  async function handleDeleteCity(cityId) {
    const result = await deleteCity(cityId);
    if (result.error) {
      toast.error(result.error); // Show error toast
    } else {
      toast.success("City deleted successfully!");
    }
    const remainingCities = cities.length - 1;
    const remainingPages = Math.ceil(remainingCities / CITIES_PER_PAGE);
    if (remainingPages < currentPage) {
      localStorage.setItem("currentPage", currentPage - 1);
    }
  }

  if (cities.length === 0)
    return (
      <p className="text-center text-2xl w-4/5 font-semibold bg-primary-400 rounded-md p-2 border-4 border-accent-300 ml-12">
        Add your first city by clicking on the map
      </p>
    );

  return (
    <>
      <ul className="list-none flex flex-col gap-4">
        {currentCities.map((city) => (
          <CityItem
            city={city}
            key={city.id}
            activeCity={activeCity}
            onSetActiveCity={() => handleSetActiveCity(city)}
            onDelete={() => handleDeleteCity(city.id)}
            currentPage={currentPage}
          />
        ))}
      </ul>
      <Pagination
        totalItems={cities.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={CITIES_PER_PAGE}
      />
      <p className="text-gray-200 text-sm absolute bottom-[-5rem] left-8">
        © Copyright 2025 by Piotr Tomaszek
      </p>
    </>
  );
}
