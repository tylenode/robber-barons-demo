<script lang="ts">
	/** Source of the picture (required) */
	export let imageSrc: string;

	/** Alt text for the image (optional) */
	export let alt: string = '';
</script>

<section class="pic-text">
	<img class="pic" src={imageSrc} {alt} />

	<!--
		Anything placed between <PicText> … </PicText>
		will appear here (that includes HTML markup).
	-->
	<div class="text">
		<slot />
	</div>
</section>

<style>
	.pic-text {
		display: flex;
		align-items: center;
		gap: min(4vw, 4rem);

		/* keep the content away from the edges */
		padding-block: 2rem;
		padding-inline: 8vw;

		/* don’t let the row get ridiculous on ultra-wide screens */
		max-width: 1400px;
		margin-inline: auto;
	}

	.pic {
		width: 12vw;
		min-width: 120px;
		height: auto;
	}

	.text {
		flex: 1;
		max-width: 45ch;

		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-size: clamp(1.2rem, 4.5vw, 2.4rem);
		line-height: 1.35;
	}

	.text strong {
		font-weight: 700;   /* bold the percentages, etc. */
	}
</style>