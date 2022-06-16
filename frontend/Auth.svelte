<script lang="ts">
  import { onMount } from "svelte"
  import { AuthClient } from "@dfinity/auth-client"
  import dfinityLogo from "./assets/dfinity.svg"

  let signedIn = false
  let client
  let principal = ""

  const initAuth = async () => {
    client = await AuthClient.create()
    const isAuthenticated = await client.isAuthenticated()

    if (isAuthenticated) {
      const identity = client.getIdentity()
      principal = identity.getPrincipal().toString()
      signedIn = true
    }
  }

  const signIn = async () => {
    const result = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          const identity = client.getIdentity()
          const principal = identity.getPrincipal().toString()
          resolve({ identity, principal })
        },
        onError: reject,
      })
    })
    principal = result.principal
    signedIn = true
  }

  const signOut = async () => {
    await client.logout()
    signedIn = false
    principal = ""
  }

  onMount(initAuth)

</script>

<div class="flex content-end items-center text-right fixed top-0 right-0 p-4">

  {#if !signedIn && client}
    <button on:click={signIn} class="px-8 rounded-lg text-lg flex items-center leading-10 outline-0 border-spacing-0 ">
      Sign In
      <img alt="" style="width: 33px; margin-right: -1em; margin-left: 0.7em;" src={dfinityLogo} />
    </button>
  {/if}

  {#if signedIn}
    <p>Signed in as: {principal}</p>
   
    <button on:click={signOut} class="py-8 rounded-lg text-lg flex items-center leading-10 outline-0 border-spacing-0 ">Sign out</button>
  {/if}
</div>
