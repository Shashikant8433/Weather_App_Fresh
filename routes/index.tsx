/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import {_WEATHER_API} from "../utils/shared/constants.ts"
import PlaceSelector from "../islands/PlaceSelector.tsx";

// export const handler: Handlers<SinglePlaceResponse | null> = {
//   async GET(_,ctx){
//     const resp = await fetch(_WEATHER_API+"mumbai");
//     if(resp.status === 200){
//       const placeData: SinglePlaceResponse = await resp.json();
//       return ctx.render(placeData);
//     }
//     return ctx.render(null);
//   }
// }

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md text(center)`}>
      <span>My First Weather App using Fresh <img
        src="/logo.svg"
        height="2px"
        alt="the fresh logo: a sliced lemon dripping with juice"
        class={tw`inline`}
        />
        </span><br/>
        <PlaceSelector initialValue="Mumbai" popularPlaces={["Mumbai","Delhi","Bengaluru","Chennai","Kolkata"]}/>
    </div>
  );
}
