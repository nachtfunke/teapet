<script>
    import Infusion from './Infusion.svelte';
    import { currentSessionStore, startNewSession } from '../stores/currentSession';

    // only one session can be active at a time
    // past sessions are view-only and should be in some form of storage, like  the local-storage or a database, or file-based
    // When a session is ended, it wanders into this storage
    // Current session information should still be reactive in a store, because it can be changed.
    
    export let previousDuration = 2000;
    export let increaseBy = 1000;
    // possible views: INFUSIONS | SETTINGS
    export let view = 'INFUSIONS';

    // initialize the current session
    startNewSession({
        id: 1,
        name: "Sippint that true tea hunty",
        infusions: []
    });

    function handleSettingsView() {
        view = view === 'SETTINGS' ? 'INFUSIONS':'SETTINGS';
    }
</script>
<main class="session">
    <button on:click={handleSettingsView}>
        {#if view !== 'SETTINGS'}
            Settings
        {:else}
            close
        {/if} 
    </button>
    {#if view == 'INFUSIONS'}
        <Infusion {previousDuration} {increaseBy}/>
    {:else if view == 'SETTINGS'}
        <input type="text" bind:value={$currentSessionStore.name}>
    {/if}
</main>
<style lang="scss">
  .session {
      background-color: honeydew;
      padding: 2em;
      border-radius: 15px;
  }  
</style>