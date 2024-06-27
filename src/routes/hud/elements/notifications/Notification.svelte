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
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    width: 300px;
    overflow: hidden;
    padding: 10px;
    margin-bottom: 10px;
    font-family: 'Product Sans';
    box-shadow: 0px 0px 20px rgba(black, 0.8);
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
      background-color: white;
      box-shadow: 0px 0px 105px 45px rgba(45,255,196,0.9);
    }

    &.error {
      background-color: white;
      box-shadow: 0 0 0 4px #fc4130;
    }

    &.info {
      background-color: white;
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

      background-color: white;
    }

    &.enabled {
      background-color: white;

      &::after {
        left: 62%;
      }
    }

    &.disabled {
      background-color: white;

      &::after {
        left: 38%;
      }
    }
  }

  .title {
    grid-area: b;
    font-size: 15px;
    color: white;
    font-family: 'Product Sans'
  }

  .message {
    grid-area: c;
    font-size: 14px;
    color: #cbd1e3;
  }
</style>
