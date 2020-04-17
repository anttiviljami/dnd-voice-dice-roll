<script>
  import RPGDiceRoller from "rpg-dice-roller";
  import { client } from "../lib/speechly";

  let textContent = "";

  const appendMessage = message => {
    textContent.innerHTML = textContent.innerHTML += `${message}\n`;
    textContent.scrollTop = textContent.scrollHeight;
  };
  const clear = () => (textContent.innerHTML = "");

  export let recording = boolean;

  $: {
    if (recording) {
      client.startContext(err => {
        if (err !== undefined) {
          console.error(err);
          appendMessage("Error: Failed to start recording!");
        } else {
          appendMessage("Listening...");
        }
      });
    } else {
      client.stopContext();
    }
  }

  // React to the phrases received from the API
  client.onSegmentChange(segment => {
    console.log(segment);
    if (segment.isFinal) {
      appendMessage(
        `Heard: "${segment.words
          .map(({ value }) => value.toLowerCase())
          .join(" ")}"`
      );

      // throw dice
      let rolls = [];
      let quantity = 1;
      for (const { type, value } of segment.entities) {
        switch (type) {
          case "quantity":
            quantity = isNaN(value) ? 1 : value;
            break;
          case "dice":
            if (!isNaN(value)) {
              rolls.push(`${Number(quantity)}d${Number(value)}`);
              quantity = 1; // reset
            }
            break;
        }
      }
      if (rolls.length > 0) {
        const roll = new RPGDiceRoller.DiceRoll(...rolls);
        appendMessage("You rolled:");
        appendMessage(roll);
      } else {
        appendMessage("Sorry, didn't hear any rolls this time.");
      }
    }
  });
</script>

<style>
  pre {
    resize: vertical;
    height: 340px;
    max-height: 135vh;
    border-radius: 0.25em;
  }
</style>

<div>
  <pre
    class="pre-scrollable bg-white small border p-3"
    bind:this={textContent} />
  <button class="btn btn-lg btn-primary btn-block" on:click={clear}>
    Clear
  </button>
</div>
