/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { _WEATHER_API } from "../utils/shared/constants.ts";
import PlaceSearcher from "../islands/PlaceSearcher.tsx";
import Nav from "../islands/Nav.tsx";

export default function Search() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md text(center)`}>
      <Nav />
      <span>
        Find out current temprature by searching city, state and country
      </span>
      <PlaceSearcher />
    </div>
  );
}
