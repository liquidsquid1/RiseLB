<script lang="ts">
    import {listen} from "../../../../integration/ws.js";
    import type {PlayerData} from "../../../../integration/types";
    import {REST_BASE} from "../../../../integration/host";
    import {fade} from "svelte/transition";
    import HealthProgress from "./HealthProgress.svelte";
    import type {TargetChangeEvent} from "../../../../integration/events";

    let target: PlayerData | null = null;
    let visible = true;

    let hideTimeout: number;

    function startHideTimeout() {
        hideTimeout = setTimeout(() => {
            visible = false;
        }, 500);
    }

    listen("targetChange", (data: TargetChangeEvent) => {
        target = data.target;
        visible = true;
        clearTimeout(hideTimeout);
        startHideTimeout();
    });

    startHideTimeout();
</script>

{#if visible && target != null}
    <div class="targethud" transition:fade|global={{duration: 200}}>
        <div class="main-wrapper">
            <div class="avatar">
                <img src="{REST_BASE}/api/v1/client/resource/skin?uuid={target.uuid}" alt="avatar" />
            </div>
    
            <div class="name">Name: </div><a class="name1">{target.username}</a>
        </div>    
        
        <HealthProgress maxHealth={target.maxHealth + target.absorption} health={target.actualHealth + target.absorption} />
    </div>
{/if}

<style lang="scss">
    @import "../../../../colors.scss";

    .targethud {
        //position: fixed;
        //top: 50%;
        //left: calc(50% + 20px);
        width: 220px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 20px;
        overflow: hidden;
        border-bottom: 3px;
        animation: 0.5s fade;
        max-height: 72px;
    }

    .main-wrapper {
        display: grid;
        grid-template-areas:
            "a b d"
            "a c d";
        column-gap: 10px;
        padding-top: 10px;
        padding-bottom: 7px;
        padding-left: 10px;
    }

    .name {
        grid-area: a;
        color: $targethud-text-color;
        align-self: flex-start;
        padding-left: 58px;
        padding-top: 5px;
        font-family: 'Product Sans';
    }

    .name1 {
        grid-area: a;
        color: $targethud-text-color;
        align-self: flex-start;
        padding-left: 108px;
        padding-top: 5px;
        color: $accent-color;
        font-family: 'Product Sans Medium';
        text-shadow:1px 1px 10px #fff, 1px 1px 10px #ccc;
    }

    .health-stats {
        grid-area: a;
        align-self: flex-end;
        column-gap: 10px;
        padding-left: 58px;
        padding-bottom: 5px;

        .stat {
            .value {
                color: $targethud-text-dimmed-color;
                font-size: 14px;
                min-width: 18px;
                display: inline-block;
            }
        }
    }

    .avatar {
        grid-area: a;
        height: 50px;
        width: 50px;
        position: relative;
        image-rendering: pixelated;
        background-image: url("/img/steve.png");
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 6px;
        overflow: hidden;
        padding-left: 5px;

        img {
            position: absolute;
            scale: 6.25;
            left: 118px;
            top: 118px;
        }
    }
</style>
