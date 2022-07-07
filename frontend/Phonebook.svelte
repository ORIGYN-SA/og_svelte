<script lang="ts">
  import logo from "./assets/logo.svg"
  import { onMount } from "svelte"
  import { phonebook } from "canisters/phonebook"
import { getDefaultAgent } from "@dfinity/agent";


  const showPhonebook = async () => {
    const result: [string,Entry][] = await phonebook.show_phonebook()
    console.log(result)
  }

  const showNames = async () => {
    const array_names : [Text] = await phonebook.get_names()
    console.log(phonebook)
  }

  let name =""
  let phone = ""

  const addContact = async () => {
  if(name==""){
    console.log('Insert name')
  }else{

  let desc = name.substring(0,1).toUpperCase()
  let obj_entry = {
    phone: phone.toString(),
    desc: desc
  }
  
  const add : any = await phonebook.insert(name,obj_entry)
  console.log(add)
  }
  }
  
</script>

<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src={ logo } alt="Ogy">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Add a contact +</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        <a href="https://internetcomputer.org/" class="font-medium text-indigo-600 hover:text-indigo-500"> The contact will be registered inside a canister  </a>
      </p>
    </div>
    
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="Name" class="sr-only">Name</label>
          <input id="name" bind:value={name} name="name" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name">
        </div>
        <div>
          <label for="password" class="sr-only">Phone</label>
          <input id="phone" bind:value={phone} name="phone" type="number" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Phone">
        </div>
      </div>

      <div>
        <button on:click={addContact} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add {name} to contacts
        </button>
      </div>
      <div>
        <button on:click={showPhonebook} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Show Phonebook
        </button>
      </div>
      <div>
        <button on:click={showNames} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Show Names
        </button>
      </div>
  </div>
</div>

