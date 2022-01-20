<script>
    import { createEventDispatcher, onMount } from "svelte";

    // dispatch events for: start, finish, reset
    // Start a timer based on props
    
    export let duration = 5000;
    export let startInfusion = false;

    let remaining = duration;

    const dispatch = createEventDispatcher();

    function reset() {
        if ( remaining <= 0 ) {
            remaining = duration + 1000;
        } else {
            remaining = duration;
        }
    }

    function startTimer() {
        // countdown once, to start the countdown in the interface, because the setInterval runs first _after_ the interval.
        const countdown = () => remaining -= 1000;
        
        const interval = setInterval( () => {
            countdown();
            
            if (remaining < 0) {
                clearInterval(interval);
                dispatch('finish', {
                    duration: duration
                });
            }
        }, 1000);
    }

    function start() {
        reset();
        startTimer();
        dispatch('start');
    }

    function handleReadableDurationChange(e) {
        duration = e.target.value*1000;
        reset();
    }

    $: {
        if ( startInfusion ) {
            start();
        }
    }

</script>
<article class="timer">
    <p>remaining: {remaining/1000}s</p>
</article>
<style>
    .timer {
        background-color: hsl(9 100% 64% / .25);
        border-radius: 15px;
        padding: 2em;
    }
</style>