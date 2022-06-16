<script lang="ts">
  import logo from "./assets/logo-dark.svg"
  import { onMount } from "svelte"
  import { counter } from "canisters/counter"

  let count: number = 0

  const refreshCounter = async () => {
    const res: any = await counter.getValue()
    count = res.toString()
  }

  const increment = async () => {
    await counter.increment()
    refreshCounter()
  }

  onMount(refreshCounter)
</script>

<header class="mt-20 flex flex-col items-center justify-center text-lg">
  <img src={logo} style="height: 15vmin;" alt="logo" />
  
  <p class="text-4xl my-8" >OG Svelte Starter</p>
  <div class="flex text-left p-8 rounded-xl flex-col bg-slate-100">
    <div class="my-1">
      <code>npm run dev:</code>
      <span> Runs the development server</span>
    </div>
    <div class="my-1">
      <code>npm run build:</code>
      <span> Builds your frontend for production</span>
    </div>
    <div class="my-1">
      <code>npm run serve:</code>
      <span> Serves your production-built frontend locally</span>
    </div>
    <hr />
    <div class="my-1">
      <code>dfx deploy:</code>
      <span> Compiles & deploys your canisters</span>
      
    </div>
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
  <button type="button" class="w-48 flex items-center justify-center my-6 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10" on:click={increment}>
    Count is: {count}
  </button>
  <p style="text-sm">
    This counter is running inside a canister
  </p>
  
</header>

