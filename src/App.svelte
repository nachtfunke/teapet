<script>
    import { onDestroy } from 'svelte';
    import { infusions as infusionsStore } from './stores/infusions';
    import Session from './lib/Session.svelte';
import { currentSessionStore } from './stores/currentSession';
    
    // could be START | SESSION | SETTINGS | ARCHIVE |
    let view = 'START';
    let firstSeconds = ($infusionsStore[0]?.duration/1000) || 1;
    let consecutiveSeconds = ($infusionsStore[0]?.duration/1000) || 5;

    $: previousDuration = firstSeconds*1000;
    $: increaseBy = consecutiveSeconds*1000;

    let infusions;
    
    // subscribe to infusions & sessions
    const unsubInfusions = infusionsStore.subscribe( value => infusions = value );

    function handleSessionStart() {
        view = 'SESSION';
    }

    onDestroy( () => {
        unsubInfusions();
    });
</script>

{#if view == 'START' }
    <fieldset>
        <legend>Your session settings:</legend>
        <label>
            <p>First:</p>
            <input type="number" min="1" step="1" bind:value={firstSeconds}>s {previousDuration}
        </label>
        <label>
            <p>consecutive:</p>
            <input type="number" min="1" step="1" bind:value={consecutiveSeconds}>s {increaseBy}
        </label>
        <button on:click={handleSessionStart}>Start Session</button>
    </fieldset>
{:else if view == 'SETTINGS'}
    <p>Settings; UI preferences and saved defaults</p>
{:else if view == 'SESSION'}
    <Session {previousDuration} {increaseBy}
        on:start={handleSessionStart}
    />
{:else if view == 'ARCHIVE'}
    <p>All past sessions</p>
{/if}
<br>
<details>
    <summary>debug</summary>
    <p>Infusions:</p>
    <code>
        <pre>
            {#each infusions as infusion, index}
                [{infusion.order}]: {infusion.duration}<br>
            {/each}
        </pre>
    </code>
    <p>current session:</p>
    <code><pre>
        name: {$currentSessionStore?.name}, infusions: {$currentSessionStore?.infusions.length}
    </pre></code>
</details>