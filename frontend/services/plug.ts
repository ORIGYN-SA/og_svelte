import { AuthClient } from "@dfinity/auth-client";
import { idlFactory as origynIdlFactory } from "@/candid/origyn_nft_reference.did.js";
import { idlFactory as ledgerIdlFactory } from "@/candid/ledger.did.js";

const OGY_LEDGER_CANSITER = "jwcfb-hyaaa-aaaaj-aac4q-cai";
const canisterId = "";

export const connectPlug = async () => {
  if (!(await window.ic.plug.isConnected())) {
    const connected = await window.ic.plug.requestConnect({
      whitelist: [canisterId, OGY_LEDGER_CANSITER],
    });
    if (connected === "denied")
      throw new Error("Error with plug.requestConnect");
  }

  await window.ic.plug.createAgent({
    whitelist: [canisterId, OGY_LEDGER_CANSITER],
    host: "https://boundary.ic0.app",
  });

  const actor = await window.ic.plug.createActor({
    canisterId: canisterId,
    interfaceFactory: origynIdlFactory,
  });

  const ogyActor = await window.ic.plug.createActor({
    canisterId: OGY_LEDGER_CANSITER,
    interfaceFactory: ledgerIdlFactory,
  });

  const plugPrincipal = await window.ic.plug.agent.getPrincipal();
  window.localStorage.setItem("loggedIn", "plug");

  return {
    principal: plugPrincipal,
    canisterId,
    actor,
    ogyActor,
  };
};
