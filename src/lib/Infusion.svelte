<script>
    import { updateCurrentSessionInfusions } from "../stores/currentSession";
    import { onDestroy } from "svelte";
    import { infusions as infusionsStore, storeInfusion } from '../stores/infusions';
    import Timer from "./Timer.svelte";

    // An infusion can have several views: PRE | INFUSING | NOTE | POST
    export let view = 'PRE';
    export let previousDuration = 5000;
    export let increaseBy = 5000;
    
    let newDurationSeconds = previousDuration/1000;
    let totalInfusionTime = 0;
    let infusionCounter = 0;
    let infusions;

    // triggers
    let startTimer = false; // set to true to start the timer

    $: newDuration = newDurationSeconds*1000;

    // subscribe to the infusions
    const ubsubinfusions = infusionsStore.subscribe( value => infusions = value)

    function handleInfusionFinish(event) {
        infusionCounter++;
        previousDuration = newDuration;
        newDurationSeconds = (previousDuration + increaseBy)/1000;

        // add the completed infusion to the infusions store
        storeInfusion({
            id: infusions.length ?? 0,
            order: infusionCounter,
            duration: event.detail.duration
        });
        updateCurrentSessionInfusions(infusions);

        view = 'POST';

        // increment the total time of infusions so far
        totalInfusionTime += event.detail.duration;
        startTimer = false;
    }

    function handleStartInfusion() {
        view = 'INFUSING';
        startTimer = true;
    }

    function handleNextInfusion() {
        view = 'PRE';
    }

    onDestroy(ubsubinfusions);
</script>
{#if view == 'PRE' }
    <p>Ready to start!</p>
    <input 
        type="number"
        min={1} step={1}
        bind:value={newDurationSeconds}
    />
    <button on:click={handleStartInfusion}>Start</button>
{:else if view == 'INFUSING'}
    <p>Steaping Infusion N#{infusionCounter+1}</p>
    <Timer 
        duration={newDuration}
        on:finish={handleInfusionFinish}
        startInfusion={startTimer}
    />
    <button disabled>infusing...</button>
{:else if view == 'NOTE'}
    <p>Add a note!</p>
{:else if view == 'POST'}
    <p>{previousDuration/1000}s</p>
    <p>Infusion N#{infusionCounter} finished</p>
    <small>{totalInfusionTime/1000}s total</small>
    <button on:click={handleNextInfusion}>Start Next Infusion ({newDuration/1000}s)</button>
{/if}