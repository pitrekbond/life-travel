import { useSearchParams } from "next/navigation";

export default function useURLPosition() {
  const searchParams = useSearchParams();
  const cityLat = searchParams.get("lat") || 0;
  const cityLng = searchParams.get("lng") || 0;

  return [cityLat, cityLng];
}
