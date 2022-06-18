<script lang="ts">
  import logo from "./assets/logo.svg"
  import { onMount } from "svelte"
  import { counter } from "canisters/counter"

  let count: number = 0
  let progress = false

  const refreshCounter = async () => {
    const res: any = await counter.getValue()
    count = res.toString()
  }

  const increment = async () => {
    progress = true
    await counter.increment()
    refreshCounter()
    progress = false
  }

  onMount(refreshCounter)
</script>

<header class="mt-20 flex flex-col items-center justify-center text-lg">
  <img src={logo} style="height: 15vmin;" alt="logo" />
  
  <p class="text-4xl my-8" >OG Svelte Starter</p>

  <div class="card bg-neutral text-neutral-content">
    <div class="card-body items-center text-center">
      <!-- <h2 class="card-title">Cookies!</h2> -->
      <p>npm run dev : Runs the development server </p>
      <p>npm run build : Builds your frontend for production </p>
      <p>npm run serve : Serves your production-built frontend locally </p>
      <div class="card-actions justify-end">
        <div class="text-center text-base mt-8" >
          <a
            class="text-indigo-600"
            href="https://svelte.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Svelte
          </a>
          {" | "}
          <a
            class="text-indigo-600"
            href="https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            IC SDK Docs
          </a>
          {" | "}
          <a
            class="text-indigo-600"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          
          {" | "}
          <a
            class="text-indigo-600"
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind
          </a>
        </div>
      </div>
    </div>
  </div>
 
  {#if !progress}
  <button type="button" class="btn btn-primary my-8" on:click={increment}>
    Count is: {count}
  </button>
  {/if}
  {#if progress}
  <progress class="progress progress-info w-56 my-18"></progress>
  {/if}
  <p style="text-sm">
    This counter is running inside a canister
  </p>
  
</header>

