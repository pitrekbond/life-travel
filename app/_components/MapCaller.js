import dynamic from "next/dynamic";
import { getCities } from "../_lib/data-service";
import { auth } from "../_lib/auth";

export default async function MapCaller() {
  const session = await auth();
  const cities = await getCities(session.user.guestId);

  const MapCallerDynamic = dynamic(() => import("./Map"), { ssr: false });

  return <MapCallerDynamic cities={cities} />;
}
