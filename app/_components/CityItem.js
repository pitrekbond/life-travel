import { format } from "date-fns";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default function CityItem({
  city,
  activeCity,
  onSetActiveCity,
  currentPage,
  onDelete,
}) {
  const { cityName, emoji, date, id, lat, lng } = city;
  const formattedDate = format(date, "MMMM dd, yyyy");
  const isActive = activeCity?.id === city.id;

  const handleCityClick = () => {
    onSetActiveCity();
    localStorage.setItem("currentPage", currentPage); // Save the current page
  };

  return (
    <li>
      <Link
        onClick={handleCityClick}
        href={`/map/cities/${id}?lat=${lat}&lng=${lng}`}
        className={`flex gap-4 py-3 px-2 bg-primary-400 rounded-md items-center justify-center border-l-8 cursor-pointer decoration-none no-underline ${
          isActive ? "border-l-green-500" : "border-l-accent-300"
        }`}
      >
        <span className="text-3xl">{emoji}</span>
        <h3 className="font-semibold mr-auto">{cityName}</h3>
        <time className="text-xs">{formattedDate}</time>
        <DeleteButton id={id} onDelete={onDelete} />
      </Link>
    </li>
  );
}
