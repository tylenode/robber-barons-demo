<script>
  export let src;
  export let name = "MAPC";
  export let size = 10;
  export let href = "#";
  export let blurb = "";
  export let marginLeft = 0;
  export let marginRight = 0;
</script>

{#if href !== "#"}
  <a
    class="footer-logo-button"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    class:hasBlurb={blurb !== ""}
  >
    <img src={src} alt={name} style="width: {size}vw; margin-left: {marginLeft}rem; margin-right: {marginRight}rem; " />
    <span class="tooltip">{name}</span>
    {#if blurb}
      <div class="tooltip blurb left">{blurb}</div>
    {/if}
  </a>
{:else}
  <div class="footer-logo-button no-link" class:hasBlurb={blurb !== ""}>
    <img src={src} alt={name} style="width: {size}vw; margin-left: {marginLeft}rem; margin-right: {marginRight}rem; " />
    {#if name}
      <div class="name">{name}</div>
    {/if}
    {#if blurb}
      <div class="tooltip blurb left">{blurb}</div>
    {/if}
  </div>
{/if}

<style>
  .footer-logo-button {
    display: flex;
    flex-direction: column; /* Stack the image and text vertically */
    justify-content: center; /* Center horizontally */
    align-items: center;     /* Center vertically */
    position: relative;
    text-decoration: none;
    text-align: center;

    cursor: pointer;
  }

  .footer-logo-button img {
    max-width: 8rem;
    min-width: 2rem;
    height: auto;
    object-fit: contain;
    display: block;
    transition: transform 0.2s;
    margin-bottom: 0.25rem;
  }

  .footer-logo-button:hover img {
    transform: scale(1.05);
  }

  .name {
    font-size: 0.85rem;
    color: #666;
    text-align: center;
  }

  .tooltip {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    text-align: center;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    z-index: 1;
    transition: opacity 0.2s;
    pointer-events: none;
    white-space: nowrap;
  }

  .footer-logo-button:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }

  .tooltip.blurb {
    white-space: normal;
    max-width: 80%;
    width: max-content;
    word-wrap: break-word;
  }

  /* New left tooltip style */
  .tooltip.left {
    left: -120%; /* Adjust this value to your liking */
    bottom: 50%;
    transform: translateY(50%);
  }

  @media (max-width: 768px) {
    .footer-logo-button img {
      width: 20vw !important;
    }

    .tooltip.blurb {
      font-size: 0.65rem;
    }
  }
</style>
