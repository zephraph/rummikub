<script>
  export let state = "start";
  export let socket;
</script>

{#if state === 'start'}
  <button id="joinGame">Join game!</button>

  <button id="pickTile" on:click={() => socket.send('pick-tile')}>
    Pick a tile
  </button>
{/if}
