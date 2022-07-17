/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
export default function Nav() {
  return (
    <nav>
      <a class={tw`border px-4`} href="/">home</a>
      <a class={tw`border px-4`} href="/search">search</a>
      <a class={tw`border px-4`} href="/about">about</a>
    </nav>
  );
}
