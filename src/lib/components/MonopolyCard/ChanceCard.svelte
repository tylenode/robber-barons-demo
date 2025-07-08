<!-- Oliver Rayner April 2025 -->

<script lang="ts">

    export let text:string = "LOREM IPSUM ADULUM"
    export let file_name:string = ""
    import { cardBlanks } from "$lib/stores/CardBlanks"
    
    function wrapTextToTspans(text: string, maxCharsPerLine: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxCharsPerLine) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);

        return lines;
    }
 
    let chance_back: any;
    let chance_front: any;
    $: if ($cardBlanks) {
        chance_back = $cardBlanks[`/src/lib/images/card_blanks/chance_front.svg`]
        chance_front = $cardBlanks[`/src/lib/images/card_blanks/${file_name}.svg`]
    }

</script>

<div style="position:relative; transform-style:preserve-3d;">
    <div class="back">

        <img src={chance_back} alt="monopoly_card" class="card" />

    </div>
    <div class="front">

        <img src={chance_front} alt="monopoly_card_back" class="card" />
        <!-- <div class="text">
            <svg
                viewBox="0 0 500 150"
                style="width: 100%;"
            >
            <text
                x="50%"
                y="40%"
                font-size="25pt"
                text-anchor="middle"
            >{#each wrapTextToTspans(text, 24) as line, i}
                <tspan x="50%" dy="{i > 0 ? 20 : 0}%">{line}</tspan>
            {/each}</text>
            </svg>
        </div> -->

    </div>
</div>


<style>
    .card {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 2.5vh;
        /* border: 1px solid red; */
    }
    .back {
        transform: rotateY(180deg);
        position: absolute;
        width: 100%;
    }
    .front {
        width: 100%;
        position: absolute;
    }
    .text {
        position: absolute;
        /* border: 1px solid red; */
        width: 80%;
        left: 10%;
        top: 29.2vh;
    }
    
</style>
