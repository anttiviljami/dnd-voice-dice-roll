<script>
  import RPG from 'rpg-dice-roller';
  import { client } from '../lib/speechly';

  let textContent = '';
  let transcript = '';

  const updateTranscript = (text) => {
    transcript.innerHTML = text;
  };

  const appendMessage = (message) => {
    textContent.innerHTML = textContent.innerHTML += `${message}\n`;
    textContent.scrollTop = textContent.scrollHeight;
  };
  const clear = () => (textContent.innerHTML = '');

  export let recording = boolean;

  $: {
    if (recording) {
      client.startContext((err) => {
        if (err !== undefined) {
          console.error(err);
          updateTranscript('Error: Failed to start recording!');
        } else {
          updateTranscript('Listening...');
        }
      });
    } else {
      client.stopContext();
    }
  }

  // React to the phrases received from the API
  client.onSegmentChange((segment) => {
    const phrase = segment.words
      .map(({ value, isFinal }) => {
        const klass = isFinal ? 'final' : 'tentative';
        return `<span class="transcript-${klass}">${value.toLowerCase()}</span>`;
      })
      .join(' ');
    updateTranscript(phrase);

    if (segment.isFinal) {
      // roll dice
      const rolls = [];
      const roller = new RPG.DiceRoller();
      let quantity = 1;
      for (const { type, value } of segment.entities) {
        switch (type) {
          case 'quantity':
            quantity = isNaN(value) ? 1 : value;
            break;
          case 'dice':
            if (!isNaN(value)) {
              const roll = `${Number(quantity)}d${Number(value)}`;
              rolls.push(roll);
              roller.roll(roll);
              quantity = 1; // reset
            }
            break;
        }
      }
      if (roller.total) {
        appendMessage(`Rolling: ${rolls.join(' + ')}`);
        appendMessage(
          roller
            .toString()
            .split(';')
            .map((r) => r.trim())
            .join('\n'),
        );
        appendMessage(`Total: ${roller.total}\n`);
      } else {
        appendMessage("Sorry, didn't hear any rolls this time.\n");
      }
    }
  });
</script>

<style>
  pre.pre-main {
    resize: vertical;
    height: 35vh;
    max-height: 135vh;
    border-radius: 0.25em;
    color: #333;
  }
</style>

<div>
  <pre class="bg-white small border p-3" bind:this={transcript} />
  <pre
    class="pre-scrollable pre-main bg-white small border p-3"
    bind:this={textContent} />
  <button class="btn btn-lg btn-primary btn-block" on:click={clear}>
    Clear
  </button>
</div>
