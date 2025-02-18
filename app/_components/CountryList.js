"use client";

import { useState } from "react";
import CountryItem from "./CountryItem";
import Pagination from "./Pagination";
import { COUNTRIES_PER_PAGE } from "../_utils/constants";

export default function CountryList({ cities }) {
  const [currentPageCountries, setCurrentPageCountries] = useState(1);

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  const indexOfLastCountry = currentPageCountries * COUNTRIES_PER_PAGE;
  const indexOfFirstCountry = indexOfLastCountry - COUNTRIES_PER_PAGE;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  if (cities.length === 0)
    return (
      <p className="text-center text-2xl w-4/5 font-semibold bg-primary-400 rounded-md p-2 border-4 border-accent-300 ml-12">
        Add your first city by clicking on the map
      </p>
    );

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 list-none">
        {currentCountries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
      <Pagination
        totalItems={countries.length}
        currentPage={currentPageCountries}
        onPageChange={setCurrentPageCountries}
        itemsPerPage={COUNTRIES_PER_PAGE}
      />
    </>
  );
}
