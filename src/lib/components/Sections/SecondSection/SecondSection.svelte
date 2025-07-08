<script lang="ts">
    // components
    import SnapTitle from "$lib/components/SnapTitle/SnapTitle.svelte";
    import SnapSubtext from "$lib/components/SnapSubtext/SnapSubtext.svelte";
    import HousingAffordabilityGraph from "$lib/components/HousingAffordabilityGraph/HousingAffordabilityGraph.svelte";
</script>

<!-- 
<SnapTitle 
        align="left"
        text="A Monopolistic Takeover"
    /> -->
<div class="container">
    <div class="whole-text">
        <div class="title">
        The Game Begins
        </div>
        <div class="paragraph">
            <!-- To start, let's pause for a moment and consider: -->
                
                <div>
                    The graph below presents a normalized housing price and family income index in Boston. The diverging lines represent a <b>decrease in consumer purchasing power</b> in the housing market. Prospective Boston home-buyers should expect to pay roughly <b>a third more</b> than their <b>1995 counterparts</b>.
                </div>

                <div>
                    In the wake of the global financial crisis, residential investers began purchasing <b>single-family homes</b> from many who could <b>no longer afford</b> their mortgage. This shift in corporate investment strategy planted the seeds for a growing rental market in Boston. In recent-years, <b>more than half</b> of Boston renters are now <b>cost burdened</b>, spending over <b>30%</b> of their income on housing.
                    Clearly, the gap to homeownership is widening. 
                </div>

                <!-- If housing were still affordable, maybe it wouldn't be a big deal. But the truth is:
                Over the years, home prices have shot up much faster than wages. 
                To put it in perspective, <span class="bolder">the average price of a Boston home is now $1 million</span>
                - that's about <span class="bolder">4.5 times more expensive</span> than in 1995, when a typical home cost just about $227K. -->
                <div>
                    Interact with the graph by <b>hovering</b>, and join us as we begin our adventure into <span class="red"><b>Monopoly</b></span>.
                </div>
                
                <!-- to view average home prices in Boston and the associated relative income levels for each year. -->

                <!-- Hover to see how Boston home prices and family incomes have changed since 1995 (baseline year).
                The higher the index, the higher the increase from the baseline. For example, in 2022, a price index of 396 means homes cost 3.9x more than in year 1995. -->
        </div>
    </div>
    <div class="housing-graph">
        <HousingAffordabilityGraph/>
    </div>
</div>


<style>
    .whole-text {
        position: absolute;
        pointer-events: none;
    }
    .title {
        font-size: clamp(3rem, 5rem, 45px);
        padding-bottom: 1rem;
        font-weight: 550;
        margin-top: 1rem;
    }
    
    .paragraph {
        display: flex;
        flex-direction: column;
        align-items: left;
        gap: 0.42rem;
        width: 67%;
    }

    .container {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: auto;

        position: relative;
    }
    .housing-graph {
		width: 100%; 
		margin: auto;
	}

    .red {
        color: #c9270e;
    }
</style>
