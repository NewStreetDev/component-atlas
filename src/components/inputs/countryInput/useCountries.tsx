import { contries, Country } from "./countries";
import { useState } from "react";

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>(() => {
    return contries;
  });
  return { countries, setCountries };
}
