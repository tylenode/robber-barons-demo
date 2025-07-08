<script>
  export let arrowDirection = 'left'; // 'top' | 'right' | 'bottom' | 'left'
</script>

<style>
  .message-box {
    position: relative;
    /* background: white; */
    /* background: #f5f9fc; */
    border: 2px solid black;
    border-radius: 12px;
    padding: 1rem;
    margin: 1rem;
    width: fit-content;

    z-index: -1;
  }

  /* Arrow Base */
  .message-box::before,
  .message-box::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
  }

  /* Outer Arrow */
  .message-box::before {
    border-width: 7px;
  }

  /* Arrow Positioning */
  /* Left (default) */
  .message-box[data-arrow="left"]::before {
    left: -14px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: black;
    border-left-width: 0;
  }

  .message-box[data-arrow="left"]::after {
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: white;
    border-left-width: 0;
  }

  /* Right */
  .message-box[data-arrow="right"]::before {
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: black;
    border-right-width: 0;
  }

  .message-box[data-arrow="right"]::after {
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: white;
    border-right-width: 0;
  }

  /* Top */
  .message-box[data-arrow="top"]::before {
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: black;
    border-top-width: 0;
  }

  .message-box[data-arrow="top"]::after {
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: white;
    border-top-width: 0;
  }

  /* Bottom */
  .message-box[data-arrow="bottom"]::before {
    bottom: -14px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: black;
    border-bottom-width: 0;
  }

  .message-box[data-arrow="bottom"]::after {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: white;
    border-bottom-width: 0;
  }
</style>

<div class="message-box" data-arrow={arrowDirection}>
  <slot></slot>
</div>
