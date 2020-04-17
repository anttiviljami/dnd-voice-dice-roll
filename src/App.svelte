<script>
  import { client } from "./lib/speechly";
  import DiceThrowsListener from "./components/DiceRollListener.svelte";
  import MicrophoneIcon from "./components/MicrophoneIcon.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Initialize the client - this will ask the user for microphone permissions and establish the connection to Speechly API.
  // Make sure you call `initlialize` from a user action handler (e.g. from a button press handler).
  let initialized = false;
  client.initialize(err => {
    if (err !== undefined) {
      console.error("Failed to initialize Speechly client:", err);
      return;
    }
    initialized = true;
  });

  let recording = false;

  let timeout;
  const toggleRecord = () => {
    recording = !recording;
    dispatch("record", { recording });
    if (recording) {
      timeout = setTimeout(() => {
        recording = false;
        dispatch("record", { recording });
      }, 8000); // automatically stop after 8 seconds
    } else {
      clearTimeout(timeout);
    }
  };
</script>

<style>

</style>

<div class="container">
  <div class="py-5 text-center">
    <h1>DnD Voice Dice Roller</h1>
    <p>
      Try saying something like:
      <i>"Roll 2d8 + 2d4"</i>
    </p>

    {#if initialized}
      <button
        class="btn btn-{recording ? 'danger' : 'primary'}"
        on:click={toggleRecord}>
        {#if !recording}
          <MicrophoneIcon />
          Click to Speak
        {:else}Stop Recording{/if}
      </button>
    {:else}
      <button class="btn btn-primary" disabled>Initializing...</button>
    {/if}
  </div>
  <DiceThrowsListener {recording} />
</div>
