import { writable, get } from "svelte/store";
import { connectPlug } from "@/services/plug";
import { signIn } from "@/services/internetIdentity";
import { AuthClient } from "@dfinity/auth-client";

const LOGGED_WALLET = "loggedWallet";

const initialStore = {
  client: undefined,
  principal: undefined,
  signedIn: false,
};

let _user = localStorage.getItem(LOGGED_WALLET);

export const store = writable<AuthStore>(
  _user ? JSON.parse(_user) : initialStore
);

// store.subscribe((value) => {
//   if (value)
//     localStorage.setItem(LOGGED_WALLET, JSON.stringify(value?.principal));
//   else localStorage.removeItem(LOGGED_WALLET);
// });

export const logout = () => store.set(initialStore);

export const logIn = async (walletType: WalletType) => {
  let user = null;
  switch (walletType) {
    case WalletType.PLUG:
      user = await connectPlug();
      console.log(user);
      break;
    case WalletType.INTERNET_IDENTITY:
      user = signIn(get(store).client);
      break;
  }
  if (user) {
    store.set({ ...user, signedIn: true });
  }
};

export const initAuth = async () => {
  const client = await AuthClient.create();
  store.update((s) => {
    s.client = client;
    return s;
  });

  const isAuthenticated = await get(store).client.isAuthenticated();

  if (isAuthenticated) {
    const identity = get(store).client.getIdentity();
    store.update((s) => {
      s.principal = identity.getPrincipal().toString();
      s.signedIn = true;
      return s;
    });
  }
};

type AuthStore = {
  client?: AuthClient;
  principal?: string;
  signedIn?: boolean;
};

export enum WalletType {
  PLUG,
  INTERNET_IDENTITY,
  STOIC,
}
