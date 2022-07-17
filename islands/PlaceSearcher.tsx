/** @jsx h */
import { h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import {
  initialDataStateType,
  SinglePlaceResponse,
} from "../utils/shared/types.ts";
import { _WEATHER_API, initialDataState } from "../utils/shared/constants.ts";
import Table from "./Table.tsx";

export default function PlaceSearcher() {
  const [place, setPlace] = useState("Delhi");
  const dataObj: [initialDataStateType, StateUpdater<initialDataStateType>] =
    useState(initialDataState);
  const data = dataObj[0], setData = dataObj[1];
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState({ yes: false, message: "" });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const resp = await fetch(`${_WEATHER_API}${place}`);
        if (resp.status === 200) {
          const placeData: SinglePlaceResponse = await resp.json();
          setData(placeData);
          setLoading(false);
          setError({ yes: false, message: "" });
        }
        if (resp.status === 400) {
          const errorObj = await resp.json();
          if (errorObj.error.code === 1006) {
            setError({ yes: true, message: errorObj.error.message });
          }
        }
      } catch {
        console.error("Something went wrong");
      }
    })();
  }, [place]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          const value = (e.target as HTMLInputElement).value;
          value && setPlace(value);
        }}
        class={tw`border-4`}
        placeholder="Search place for temprature"
      />
      <br />
      {isError.yes || (
        <p>
          {isLoading
            ? "Loading..."
            : `${data?.location.name} has ${data?.current.temp_c}° celcius`}
        </p>
      )}
      {isError.yes && <p>{isError.message}</p>}
      <button onClick={() => setShowDetails((prev) => !prev)} class={tw`border`}>
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && (
        <Table
          current={data?.current!}
          location={data?.location!}
          isError={isError.yes}
        />
      )}
    </div>
  );
}
