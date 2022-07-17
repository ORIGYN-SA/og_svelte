import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

export const signIn = async (client: AuthClient): Promise<iiResultType> => {
  const result: iiResultType = await new Promise((resolve, reject) => {
    client.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal().toString();
        resolve({ identity, principal });
      },
      onError: reject,
    });
  });
  return result;
};

type iiResultType = {
  principal: string;
  identity: Identity;
};
