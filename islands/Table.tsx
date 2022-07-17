/** @jsx h */
import { h  } from "preact";
import {tw} from "@twind"
import type {Current, Location} from "../utils/shared/types.ts"

interface tableProps {
    location: Location,
    current: Current,
    isError?: boolean
}
export default function Table({current,location,isError}:tableProps){
    return <div>{isError?"Sorry no data found":<table class={tw`border p-4 mx-auto max-w-screen-md text(center)`}>
    <tbody>
        <tr class={tw`border`}>
            <th colSpan={2}>Details</th>
        </tr>
        {location && Object.entries(location).map((item,index)=><tr class={tw`border`} key={index}><td>{item[0]}</td><td>{item[1]}</td></tr>)}
        {current && Object.entries(current).map((item,index)=>item[0]==="condition"?null:<tr class={tw`border`} key={index}><td>{item[0]}</td><td>{item[1]}</td></tr>)}
    </tbody>
</table>}</div>
}