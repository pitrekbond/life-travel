"use client";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useURLPosition from "../_geolocation/useURLPosition";
import { createCity } from "../_lib/actions";
import BackButton from "./BackButton";
import Message from "./Message";
import { StarRating } from "./StarRating";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

const BASE_URL_1 = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function Form() {
  const [cityLat, cityLng] = useURLPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const router = useRouter();

  useEffect(
    function () {
      if (!cityLat && !cityLng) return;

      async function getCityFromCoords() {
        try {
          setIsLoadingGeocoding(true);
          setLocationError("");
          const res = await fetch(
            `${BASE_URL_1}?latitude=${cityLat}&longitude=${cityLng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesnt seem to be a city. Click somewhere else."
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setLocationError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      getCityFromCoords();
    },
    [cityLat, cityLng]
  );

  if (!cityLat && !cityLng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (locationError) return <Message message={locationError} />;

  //doing this instead of calling createCity in the normal action prop so that we can display toast messages, which need to run on the client. also using onSubmit instead of action
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create FormData object from the form elements
    const formData = new FormData(e.target);

    // Call the createCity function
    const result = await createCity(formData);

    // Check the result and show appropriate toast
    if (result.error) {
      toast.error(result.error); // Show error toast
    } else {
      toast.success("City created successfully!");
      router.push("/map/cities");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-md bg-primary-400 px-6 py-6 box-border w-4/5 text-[1rem]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col relative gap-2">
        <label htmlFor="cityName" className="font-semibold">
          City name
        </label>
        <input
          id="cityName"
          className="px-4 py-2 rounded-md text-black outline-none bg-gray-200 focus:bg-white"
          onChange={(e) => setCityName(e.target.value)}
          defaultValue={cityName}
          name="cityName"
          required
        ></input>
        <span className="absolute right-4 text-2xl top-[29px]">{emoji}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="font-semibold">
          When was your trip?
        </label>
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          id="date"
          className="px-4 py-2 rounded-md text-black outline-none bg-gray-200 focus:bg-white w-full"
          name="date"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="notes" className="font-semibold">
          Notes
        </label>
        <textarea
          id="notes"
          className="text-black outline-none bg-gray-200 focus:bg-white w-full px-4 py-2 rounded-md"
          onChange={(e) => setNotes(e.target.value)}
          defaultValue={notes}
          name="notes"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rating" className="font-semibold">
          Your Rating
        </label>
        <StarRating initialRating={rating} onRatingChange={setRating} />
      </div>

      <div className="flex justify-between">
        <SubmitButton />
        <BackButton />
      </div>
      <input type="hidden" name="country" value={country} />
      <input type="hidden" name="emoji" value={emoji} />
      <input type="hidden" name="lat" value={cityLat} />
      <input type="hidden" name="lng" value={cityLng} />
      <input type="hidden" name="rating" value={rating} />
    </form>
  );
}
