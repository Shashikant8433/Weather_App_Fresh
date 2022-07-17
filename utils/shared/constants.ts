import { API_KEY } from "./env.ts";
import { initialDataStateType } from "./types.ts";
export const _WEATHER_API = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;
export const initialDataState: initialDataStateType = null