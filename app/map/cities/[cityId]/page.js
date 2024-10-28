import BackButton from "@/app/_components/BackButton";
import { StarRating } from "@/app/_components/StarRating";
import { getCity } from "@/app/_lib/data-service";
import { format } from "date-fns";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { cityName } = await getCity(params.cityId);
  return { title: `${cityName}` };
}

// export const revalidate = 20;

export default async function Page({ params }) {
  const city = await getCity(params.cityId);

  const { cityName, emoji, date, notes, rating } = city;
  const formattedDate = format(date, "MMMM dd, yyyy");

  return (
    <div className="flex bg-primary-400 rounded-md flex-col gap-4 px-6 py-6 box-border w-4/5">
      <div className="flex flex-col gap-1">
        <h6 className="uppercase font-semibold text-[0.625rem] text-primary-200">
          City name
        </h6>
        <div className="flex text-[1.4rem] gap-2 font-bold">
          <span className="text-[1.8rem]">{emoji}</span>
          {cityName}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h6 className="uppercase font-semibold text-[0.625rem] text-primary-200">
          You&apos;ve visited {cityName} on
        </h6>
        <p className="text-[1.1rem]">{formattedDate}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h6 className="uppercase font-semibold text-[0.625rem] text-primary-200">
          Your notes
        </h6>
        <p className="text-[1.1rem]">{notes}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h6 className="uppercase font-semibold text-[0.625rem] text-primary-200">
          Your rating of {cityName}
        </h6>
        <StarRating initialRating={rating} readOnly={true} />
      </div>

      <div className="flex flex-col gap-1">
        <h6 className="uppercase font-semibold text-[0.625rem] text-primary-200">
          Learn more
        </h6>
        <Link
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          className="text-[1.1rem] underline text-accent-300"
        >
          Check out {cityName} on Wikipedia &rarr;
        </Link>
      </div>
      <BackButton />
    </div>
  );
}
