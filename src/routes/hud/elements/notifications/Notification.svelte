<script lang="ts">
    export let title: string;
    export let message: string;
    export let severity: string;
</script>

<div class="notification">
    <div class="icon {severity.toString().toLowerCase()}"/>
    <div class="title">{title}</div>
    <div class="message">{message}</div>
</div>

<style lang="scss">

  @import "../../../../colors.scss";

  .notification {
    display: grid;
    grid-template-areas:
            "a b"
            "a c";
    grid-template-columns: max-content 1fr;
    column-gap: 10px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    width: 300px;
    overflow: hidden;
    padding: 10px;
    margin-bottom: 10px;
  }

  .icon {
    height: 40px;
    width: 40px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 15px;
    grid-area: a;
    transition: background-color 0.2s;
    position: relative;

    &.success {
      background-color: #4dac68;
      background-image: url("/img/hud/notification/icon-success.svg");
      box-shadow: 0px 0px 105px 45px rgba(45,255,196,0.9);
    }

    &.error {
      background-color: #fc4130;
      background-image: url("/img/hud/notification/icon-error.svg");
      box-shadow: 0 0 0 4px #fc4130;
    }

    &.info {
      background-color: #4677ff;
      background-image: url("/img/hud/notification/icon-info.svg");
      box-shadow: 0 0 0 4px #4677ff;
    }

    &.disabled,
    &.enabled {
      &::after {
        content: "";
        position: absolute;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        transition: all 0.2s ease-out;
      }

      background-image: url("/img/hud/notification/icon-toggle.svg");
    }

    &.enabled {
      background-color: #4dac68;

      &::after {
        left: 62%;
      }
    }

    &.disabled {
      background-color: #fc4130;

      &::after {
        left: 38%;
      }
    }
  }

  .title {
    grid-area: b;
    font-size: 15px;
    color: white;
    font-family: 'Product Sans Medium'
  }

  .message {
    grid-area: c;
    font-size: 14px;
    color: #cbd1e3;
  }
</style>
