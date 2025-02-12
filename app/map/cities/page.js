import CityList from "@/app/_components/CityList";
import { auth } from "@/app/_lib/auth";
import { getCities } from "@/app/_lib/data-service";

export const metadata = {
  title: "Cities",
};

export default async function Page() {
  const session = await auth();
  const cities = await getCities(session.user.guestId);

  return (
    <div className="relative">
      <CityList cities={cities} />
    </div>
  );
}
