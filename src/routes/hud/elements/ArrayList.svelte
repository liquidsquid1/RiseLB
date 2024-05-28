<script lang="ts">
    import {onMount} from "svelte";
    import type {Module} from "../../../integration/types";
    import {getModules} from "../../../integration/rest";
    import {listen} from "../../../integration/ws";
    import {getTextWidth} from "../../../integration/text_measurement";
    import {flip} from "svelte/animate";
    import {fly} from "svelte/transition";
    import {convertToSpacedString, spaceSeperatedNames} from "../../../theme/theme_config";

    let enabledModules: Module[] = [];

    async function updateEnabledModules() {
        enabledModules = (await getModules())
            .filter((m) => m.enabled && !m.hidden)
            .sort(
                (a, b) =>
                    getTextWidth($spaceSeperatedNames ? convertToSpacedString(b.name).toLowerCase() : b.name.toLowerCase(), "400 16px Product Sans") -
                    getTextWidth($spaceSeperatedNames ? convertToSpacedString(a.name).toLowerCase() : a.name.toLowerCase(), "400 16px Product Sans"),
            );
    }

    spaceSeperatedNames.subscribe(async () => {
        await updateEnabledModules();
    });

    onMount(async () => {
        await updateEnabledModules();
    });

    listen("toggleModule", async () => {
        await updateEnabledModules();
    });

    listen("refreshArrayList", async () => {
        await updateEnabledModules();
    });
</script>

<div class="arraylist">
    {#each enabledModules as { name } (name)}
        <div class="module" animate:flip={{ duration: 200 }} in:fly={{ x: 50, duration: 200 }}>
            {$spaceSeperatedNames ? convertToSpacedString(name) : name}
        </div>
    {/each}
</div>

<style lang="scss">
    @import "../../../colors.scss";

    .arraylist {
        position: fixed;
        top: 10px;
        right: 10px;

        font-size: 72px;
    }

    .module {
        background-color: rgba(0, 0, 0, 0.4);
        color: $accent-color;
        font-family: 'Product Sans';
        font-size: 16px;
        padding: 2px 6px;
        border-right: solid 2px $accent-color;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-width: 5px;
        width: max-content;
        font-weight: 400;
        margin-left: auto;
        text-transform: lowercase;
    }

</style>
