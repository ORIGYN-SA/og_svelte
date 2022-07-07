<script lang="ts">
  import logo from "./assets/logo.svg"
  import { onMount } from "svelte"

  import { phonebook } from "canisters/phonebook"


  const showPhonebook = async () => {
    const result: [string,Entry][] = await phonebook.show_phonebook()
    console.log(result)
  }
  
</script>

<button type="button" class="w-48 flex items-center justify-center my-6 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10" on:click={showPhonebook}>
console.log of phonebook
</button>
