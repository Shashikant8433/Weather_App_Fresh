/** @jsx h */
import { h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import {
  initialDataStateType,
  SinglePlaceResponse,
} from "../utils/shared/types.ts";
import { tw } from "@twind";
import { _WEATHER_API, initialDataState } from "../utils/shared/constants.ts";
import Table from "./Table.tsx";

interface placeSelectorProps {
  initialValue: string;
  popularPlaces: Array<string>;
}

export default function PlaceSelector(
  { initialValue, popularPlaces }: placeSelectorProps,
) {
  const [place, setPlace] = useState(initialValue);
  const dataObj: [initialDataStateType, StateUpdater<initialDataStateType>] =
    useState(initialDataState);
  const data = dataObj[0], setData = dataObj[1];
  const [isLoading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const resp = await fetch(`${_WEATHER_API}${place}`);
        if (resp.status === 200) {
          const placeData: SinglePlaceResponse = await resp.json();
          setData(placeData);
          setLoading(false);
        }
      } catch {
        console.error("Something went wrong");
      }
    })();
  }, [place]);

  return (
    <div>
      Select:
      <select
        value={place}
        onChange={(e) => setPlace((e.target as HTMLInputElement).value)}
      >
        {popularPlaces.map((place) => <option>{place}</option>)}
      </select>
      <br />
      <p>
        {isLoading
          ? "Loading..."
          : `${data?.location.name} has ${data?.current.temp_c}° celcius`}
      </p>
      <button onClick={() => setShowDetails((prev) => !prev)} class={tw`border`}>
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && (
        <Table current={data?.current!} location={data?.location!} />
      )}
    </div>
  );
}
