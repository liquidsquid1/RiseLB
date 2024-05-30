<script lang="ts">
    import {onMount} from "svelte";
    import type {Module} from "../../../integration/types";
    import {getModules} from "../../../integration/rest";
    import {listen} from "../../../integration/ws";
    import {getTextWidth} from "../../../integration/text_measurement";
    import {flip} from "svelte/animate";
    import {fly} from "svelte/transition";
    import {convertToSpacedString, spaceSeperatedNames} from "../../../theme/theme_config";
    import {getPrefixAsync, translateName} from "../../../theme/arraylist";

    let enabledModules: Module[] = [];
    let prefixs = new Map();

    async function updateEnabledModules() {
        enabledModules = (await getModules())
            .filter((m) => m.enabled && !m.hidden);
          
        for (let i = 0; i < enabledModules.length; i++) {
            const module = enabledModules[i];
            if (prefixs.has(module.name)) continue;
            const prefix = await getPrefixAsync(module.name);
            prefixs.set(module.name, prefix);
        }

        enabledModules = enabledModules.sort(
                (a, b) =>
                    getTextWidth($spaceSeperatedNames ? (convertToSpacedString(translateName(b.name)) + prefixs.get(b.name)).toLowerCase() : (translateName(b.name) + prefixs.get(b.name)).toLowerCase(), "599 16px Product Sans") -
                    getTextWidth($spaceSeperatedNames ? (convertToSpacedString(translateName(a.name)) + prefixs.get(a.name)).toLowerCase() : (translateName(a.name) + prefixs.get(a.name)).toLowerCase(), "599 16px Product Sans"),
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

<div class="arraylist" id="arraylist">
    {#each enabledModules as { name } (name)}
        <div class="module" id="module-name" animate:flip={{ duration: 200 }} in:fly={{ x: 50, duration: 200 }}>
            {$spaceSeperatedNames ? convertToSpacedString(translateName(name)) : translateName(name)} <span class="prefix">{prefixs.get(name)}</span> <span class="side-bar" id="side-bar"></span>
        </div>
    {/each}
</div>

<style lang="scss">
    @import "../../../colors.scss";

    :root {
        --accent-color: #{$accent-color};
        --accent-color-2: #{$accent-color-2};
    }

    .arraylist {
        position: fixed;
        top: 10px;
        right: 10px;

        font-size: 72px;
    }
    
    .module {
        background-color: rgba(0, 0, 0, 0.54);
        color: $accent-color;
        font-family: 'Product Sans';
        font-size: 16px;
        padding: 2px 6px;
        width: max-content;
        font-weight: 599;
        margin-left: auto;
        
        text-transform: lowercase;
        text-shadow: rgba(0, 0, 50, 0.6) .25px .25px;
        border-bottom-left-radius: 3px;
    }

    .module:first-child {
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
    }

    .module:last-child {
        border-bottom-right-radius: 3px;
    }


    .prefix {
        color: #AAAAAA;
    }

    .side-bar {
        position: fixed;
        border-right: solid 5px $accent-color;
        border-radius: 2px;
        padding-right: 10px;

        width: 13px;
        height: 20px;
    }

</style>
