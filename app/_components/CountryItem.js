export default function CountryItem({ country }) {
  return (
    <li className="bg-primary-400 rounded-md flex flex-col px-10 py-3 justify-center items-center border-l-8 border-l-accent-300 cursor-pointer decoration-none">
      <span className="text-3xl">{country.emoji}</span>
      <span className="font-semibold">{country.country}</span>
    </li>
  );
}
