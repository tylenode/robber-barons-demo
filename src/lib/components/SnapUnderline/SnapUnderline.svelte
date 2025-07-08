<script lang="ts">
    export let color = '#3b82f6';
    export let tooltip = "";
    export let marginLeft = 0;
</script>

<style>
    .container {
        pointer-events: auto;
        
        position: relative;
        display: inline-block;
        vertical-align: baseline; /* aligns with surrounding text better */
        line-height: 1; /* reduce vertical gap */
        font-size: inherit;
    }

    .text {
        position: relative;
        z-index: 1;
        display: inline-block;
    }

    .underline {
        left: 0.1rem;

        position: absolute;
        bottom: -0.15rem;
        width: 100%;
        height: 3px;
        background-color: var(--underline-color);
        overflow: hidden;
    }

    .info-icon {
        right: -1.6rem;

        position: absolute;
        bottom: -0.15rem;
        transform: translateY(30%);
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 9999px;
        background-color: rgba(255, 255, 255, 0.7);
        color: #111;
        font-size: 0.9rem;
        font-weight: 400;
        font-style: italic;
        font-family: 'Times New Roman', serif;
        border: 1px solid rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 2;
    }

    .container:hover .info-icon {
        animation: pulse 0.4s ease;
    }

    @keyframes pulse {
        0% { transform: translateY(30%) scale(1); }
        50% { transform: translateY(30%) scale(1.2); }
        100% { transform: translateY(30%) scale(1); }
    }

    .tooltip {
        left: 0.1rem;

        position: absolute;
        top: 102%;
        margin-top: 0.25rem;
        background-color: rgba(33, 33, 33, 0.95);
        color: #fff;
        padding: 0.4em 0.6em;
        border-radius: 0.375rem;
        font-size: 0.7rem;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transform: translateY(4px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        overflow:auto;
    }

    .info-icon:hover + .tooltip {
        opacity: 1;
        transform: translateY(0);
    }
</style>

<span class="container" style="--underline-color: {color}">
    <span class="text" style="margin-left: {marginLeft}rem"><slot /></span>
    <span class="underline"></span>
    {#if tooltip != ""}
        <span class="info-icon">ℹ</span>
        <div class="tooltip">{tooltip}</div>
    {/if}
</span>
