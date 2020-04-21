<script>
  import { client } from './lib/speechly';
  import DiceThrowsListener from './components/DiceRollListener.svelte';
  import MicrophoneIcon from './components/MicrophoneIcon.svelte';

  // Initialize the client - this will ask the user for microphone permissions and establish the connection to Speechly API.
  // Make sure you call `initlialize` from a user action handler (e.g. from a button press handler).
  let initializing = false;
  let initialized = false;

  const initialize = () => {
    initializing = true;

    client.initialize((err) => {
      initializing = false;
      if (err !== undefined) {
        console.error('Failed to initialize Speechly client:', err);
        return;
      }

      initialized = true;
    });
  };

  let recording = false;

  let timeout;
  const toggleRecord = () => {
    recording = !recording;
    if (recording) {
      timeout = setTimeout(() => {
        recording = false;
      }, 8000); // automatically stop after 8 seconds
    } else {
      clearTimeout(timeout);
    }
  };
</script>

<style>

</style>

<div class="container">
  <div class="mt-5 mb-3 text-center">
    <img class="logo" alt="logo" src="d20.png" />
    <h1>DnD Voice Dice Roller</h1>
    <p>
      Try saying something like:
      <i>"Roll 2d8 + 2d4"</i>
    </p>

    {#if initialized}
      <button
        class="btn btn-lg btn-{recording ? 'danger' : 'primary'}"
        on:click={toggleRecord}>
        {#if !recording}
          <MicrophoneIcon />
          Click to Speak
        {:else}Stop Recording{/if}
      </button>
    {:else}
      <button
        class="btn btn-lg btn-primary"
        disabled={initializing}
        on:click={initialize}>
        {#if !initializing}Start{:else}Starting...{/if}
      </button>
    {/if}
  </div>

  <DiceThrowsListener {recording} />

  <p align="center" class="mt-3">
    &copy; 2020
    <a href="https://viljami.io" target="_blank">viljami.io</a>
    <a
      href="https://github.com/anttiviljami/dnd-voice-dice-roll"
      target="_blank">
      <img
        src="https://img.icons8.com/material-sharp/96/000000/github.png"
        alt="GitHub"
        class="icon" />
    </a>
  </p>
</div>
