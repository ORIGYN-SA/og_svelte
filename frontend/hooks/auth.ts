import { writable } from "svelte/store";

const LOGGED_WALLET = "loggedWallet";

let _user = localStorage.getItem(LOGGED_WALLET);

export const store = writable(_user ? JSON.parse(_user) : null);

store.subscribe((value) => {
  if (value) localStorage.setItem(LOGGED_WALLET, JSON.stringify(value));
  else localStorage.removeItem(LOGGED_WALLET);
});

export const logout = () => store.set(null);

export const logIn = (walletType: string) => {};
