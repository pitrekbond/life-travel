import CountryList from "@/app/_components/CountryList";
import { auth } from "@/app/_lib/auth";
import { getCities } from "@/app/_lib/data-service";

export const metadata = {
  title: "Countries",
};

const BASE_URL = "http://localhost:9000/cities";

// export const revalidate = 1;

export default async function Page() {
  const session = await auth();
  const cities = await getCities(session.user.guestId);

  return (
    <div>
      <CountryList cities={cities} />
    </div>
  );
}
