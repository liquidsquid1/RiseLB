<script lang="ts">
    export let maxHealth: number;
    export let health: number;

    let width = Math.ceil(health / maxHealth * 100);
    $: width = Math.ceil(health / maxHealth * 100);
</script>

<div class="health-progress">
    <div class="thumb" style="width: {width}%;"></div>
</div>

<style lang="scss">
    @import "../../../../colors.scss";

    .health-progress {
        position: relative;
        bottom: 25px;
        left: 31%;
        border-radius: 20px;
        max-width: 50%;
    }

    .thumb {
        height: 14px;
        background-color: $accent-color;
        transition: ease width 0.5s;
        border-radius: 20px;
    }
</style>