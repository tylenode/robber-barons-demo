<script lang="ts">
    // images
    import skyline from '$lib/images/monopoly_3d/skyline.svg';
    import mit from '$lib/images/first_slide/mit.png';
    import mapc from '$lib/images/first_slide/mapc.png';
    import institutional from '$lib/images/institutional_investor.svg';
    import run from '$lib/images/first_slide/run.png';

    import guy1 from "$lib/images/first_slide/guy1.png";
    import guy2 from "$lib/images/first_slide/guy2.png";
    import guy3 from "$lib/images/first_slide/guy3.png";
    import guy4 from "$lib/images/first_slide/guy5.png";

    // components
    import Logo from '$lib/components/Logo/Logo.svelte';
    import SnapUnderline from '$lib/components/SnapUnderline/SnapUnderline.svelte';
    import MessageBox from '../../MessageBox/MessageBox.svelte';

    const tooltip:string = "(noun) Early 20th century monopolists known for their use of exploitative practices to amass their fortune."

</script>

<div class="main-section">
    <div class="top-content-row">
        <div class="left-column">
            <div class="hero-text">
                <SnapUnderline 
                    color="#60a5fa"
                    marginLeft={-0.25}
                    tooltip={tooltip}> 
                    Robber Barons
                </SnapUnderline>
            </div>
            <div class="subtext">

                <b>Are monopolizing Boston</b>.

                <br><br>

                In 2022, the Boston Foundation stated the city would recieve a <b>"failing grade"</b> on metrics such as housing accessibility, equity, and availability. Rising housing costs, limited supply, and the continued gentrification of Boston neighborhoods are all symptoms of an ever worsening housing market. Boston is in a <b>housing crisis</b>.

                <br><br>

                <!-- Boston is in a <b>housing crisis</b>. -->
                Continued interest in residential property from large and institutional investors have driven the cost of housing to near-<b>gauging</b> prices. The American home as a <b>wealth-building</b> asset has been <b>preverted</b> and <b>mechanized</b> by residential <b>monopolists</b>. 

                <br><br>

                Join us as we expose corporate's growing presence and profit through the lens of <span class="red"><b>Monopoly</b></span>.

            </div>

            <!-- <div class="subtext">
                In the game of Monopoly, a group of players can pile their capital and 
                scoop up the best properties on the board to make it impossible for others to catch up.
            </div>
            <div class="subtext">
                That's what Boston's housing market is like today.
            </div> 

            <div class="subtext">
                Like modern-day robber barons, large and institutional investors have been steadily buying up Boston homes.
                They buy, flip, and repeat—driving up the cost of living 
                for regular people who just want a home.
            </div>

            <div class="subtext">
                Let's dive into
                corporate ownership of homes in Boston
                and 
                <span class="bold">
                    how much big corporate investors are profiting from this growing monopoly!
                </span>
            </div> -->
        </div>

        <div class="middle-column investor-container">
            <div class="hover-see">
                Hover to see more
            </div>
            <img class="image-institutional absolute" src={institutional} alt="Institutional Investors" />
            <div class="absolute-message-box">
                <MessageBox arrowDirection={"top"}>
                <div class="message-light">
                    In the year 2022 alone, large and institutional investors made <span class="light-bold">
                    294.6 millions in profit
                    </span> from selling their invested properties.
                </div>
                </MessageBox>
            </div>
        </div>

        <div class="right-column">
            <div class="team-container">
                <div class="team-inner">
                    <div class="team-title">Team</div>
                    <Logo src={guy1} name="Ayden Johnson" size={6} blurb="Senior in EECS" />
                    <Logo src={guy2} name="Oliver Rayner" size={5} blurb={"PhD student in AeroAstro"}/>
                    <Logo src={guy3} name="Weitung Chen"size={6} blurb={"PhD student in EECS"} marginLeft={0.58}/>
                    <Logo src={guy4} name="Ian Lee" size={5} blurb={"MEng student in EECS"}/>
                </div>
            </div>
        </div>
    </div>

    <div class="bottom-row">
        <img class="skyline" src={skyline} alt="Boston Skyline" />
        <div class="scroll-arrow">
            <span class="subtitle">↓ Scroll to see more</span>
        </div>
    </div>
</div>

<div class="footer-logos">
    <Logo src={mapc} name="Metropolitan Area Planning Council" href="https://www.mapc.org/our-work/expertise/housing/" size={8}/>
    <Logo src={mit} name="MIT" href="https://www.mit.edu/research/" size={6.4}/>
</div>

<div class="snap-subscript">
    This project was developed with guidance and feedback from the 
    <a href="https://www.mapc.org">Metropolitan Area Planning Commission (MAPC)</a>
</div>

<style>
    .red {
        color: #c9270e;
    }
    .main-section {
        display: flex;
        flex-direction: column;
        margin-top: 4vw;
        margin-left: 9%;
        margin-right: 5%;

        align-items: flex-start;
    }

    .top-content-row {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;

        max-height: 60vh;

        /* border-width: 1px;
        border-color: #818483;
        border-style: solid; */
    }

    .left-column, .middle-column, .right-column {
        flex-grow: 1;
    }

    .left-column {
        flex: 5;
    }

    .middle-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;

        position: relative;

        /* border-width: 1px;
        border-color: #818483;
        border-style: solid; */
    }

    .absolute {
        position: absolute;
        top: 4.75rem; /* use rem so the message box and this stick together */
        margin-left: -3rem;
    }

    .absolute-message-box {
        position: absolute;
        top: 25.5rem;
        margin-left: 0.5rem;

        width: 21rem;

        z-index: 999;

        /* show when hover guy */
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
    }


    .message-light {
        font-weight: 150;
    }

    .image-institutional {
        width: 17rem;
        height: auto;
        cursor: pointer;
    }

    .investor-container:hover .absolute-message-box {
        opacity: 1;
        pointer-events: auto;
    }

    .right-column {
        flex: 1;
    }

    .hero-text {
        font-weight: bold;
        font-size: clamp(2.5rem, 8vw, 5.5rem);
    }

    .subtext {
        font-size: 1rem;
        width: 90%;
        margin-top: 1rem;
        margin-left: 0.2rem;
        /* font-weight: 300; */
        /* line-height: 1.3rem; */
        color: rgb(50, 48, 48);
    }

    .team-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: -1rem;
    }

    .team-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.35rem;
        text-align: center;
    }

    .team-title {
        font-size: 2rem;
        font-weight: bold;
    }

    .bottom-row {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-left: 6rem;
        margin-top: -0.5rem;

        /* border-width: 1px;
        border-color: #818483;
        border-style: solid; */
    }

    .skyline {
        margin-top: -2rem;

        width: 29rem;
        max-width: 100%;
    }

    .scroll-arrow {
        font-size: 1.5rem;
        font-weight: bold;
        font-family: Helvetica, sans-serif;
        color: rgb(50, 48, 48);
        opacity: 0.9;
        animation: bounce 2s infinite;
        margin-top: 1rem;
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(12px);
        }
    }

    .footer-logos {
        position: fixed;
        bottom: 2.5rem;
        right: 1.5rem;
        display: flex;
        gap: 1rem;
        z-index: 100;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: flex-end;
    }

    .snap-subscript {
        position: absolute; 
        bottom: 1.2rem;
        font-size: 0.55rem;
        color: #818483;
        right: 1.25rem;
    }

    .subtitle {
        font-size: 1.5rem;
        font-weight: bold;
        color: rgb(50, 48, 48);
    }

    @media screen and (max-width: 768px) {
        .top-content-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .team-inner {
            align-items: center;
            text-align: center;
        }

        .team-title {
            font-size: 1.5rem;
        }

        .scroll-arrow .subtitle {
            font-size: 1.25rem;
        }
    }

    .bold {
        font-weight: 800;
    }
    /* .investor-text {
        font-size: 1rem;
        font-weight: 500;
        margin-top: 1rem;
    } */
    
    .light-bold {
        font-weight: 600;
    }


    .hover-see {
        font-weight: 300;
        width: 90%;
        margin-top: 2rem;
        font-style: italic;
    }
</style>
