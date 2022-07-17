import { readable } from "svelte/store";
import { Principal } from "@dfinity/principal";

export const canisterId = readable(undefined, (set) => {
  set(getCanisterId());
  return () => undefined;
});

export const getCanisterId = () => {
  const ids = window.location.pathname.split("/");
  let canisterId = "";

  try {
    const subdomain = window.location.hostname.split(".")[0];
    Principal.fromText(subdomain);
    return subdomain;
  } catch (e) {
    try {
      Principal.fromText(ids[2]);
      canisterId = ids[2];
      return canisterId;
    } catch (e) {
      return undefined;
    }
  }
};
