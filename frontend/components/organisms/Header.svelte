<script lang="ts">
  import { logIn, store as authStore, WalletType } from "@/hooks/auth";
  import logo from "@/assets/logo.svg";
  import dfinityLogo from "@/assets/dfinity.svg";
</script>

<header class="bg-indigo-600">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div
      class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none"
    >
      <div class="flex items-center">
        <a href="#">
          <span class="sr-only">Workflow</span>
          <img src={logo} class="h-10 w-auto" alt="logo" />
        </a>
        <div class="hidden ml-10 space-x-8 lg:block">
          <a
            href="#"
            class="text-base font-medium text-white hover:text-indigo-50"
          >
            Origyn Wallet
          </a>
        </div>
      </div>
      <div class="ml-10 space-x-4">
        {#if !$authStore.signedIn}
          <button
            on:click={() => logIn(WalletType.PLUG)}
            class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            ><img
              alt=""
              style="width: 33px; margin-right: 5px; display:inline-block"
              src={dfinityLogo}
            />Connect Wallet</button
          >
        {/if}
        {#if $authStore.signedIn}
          <span class="text-white">{$authStore.principal}</span>
        {/if}
      </div>
    </div>
    <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
      <a href="#" class="text-base font-medium text-white hover:text-indigo-50">
        Solutions
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50">
        Pricing
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50">
        Docs
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50">
        Company
      </a>
    </div>
  </nav>
</header>
