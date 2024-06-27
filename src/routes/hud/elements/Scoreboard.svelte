<script lang="ts">
    import {listen} from "../../../integration/ws";
    import type {PlayerData, Scoreboard} from "../../../integration/types";
    import TextComponent from "../../menu/common/TextComponent.svelte";
    import type {ClientPlayerDataEvent} from "../../../integration/events";

    let scoreboard: Scoreboard | null = null;

    listen("clientPlayerData", (e: ClientPlayerDataEvent) => {
        const playerData: PlayerData = e.playerData;
        scoreboard = playerData.scoreboard;
    });
</script>

{#if scoreboard}
    <div class="scoreboard">
        {#if scoreboard.header}
            <div class="header">
                riseclient.com
            </div>
        {/if}
        <div class="entries">
            {#each scoreboard.entries as {name, score}}
                <div class="row">
                    <TextComponent fontSize={14} allowPreformatting={true} textComponent={name}/>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style lang="scss">
  @import "../../../colors.scss";

  .scoreboard {
    min-width: 200px;
    //position: fixed;
    //left: 15px;
    //top: 550px;
    border-radius: 16px;
    overflow: hidden;
    font-size: 14px;
    box-shadow: 0px 0px 20px rgba(black, 0.8);
  }

  .entries {
    background-color: rgba($scoreboard-base-color, 0.5);
    padding: 10px;
  }

  .row {
    display: flex;
    column-gap: 15px;
    justify-content: space-between;
  }

  .header {
    text-align: left;
    background-color: rgba($scoreboard-base-color, 0.5);
    padding: 7px 10px;
    color: $accent-color;
    text-shadow: $accent-color 0px 0px 16px;
  }
</style>
