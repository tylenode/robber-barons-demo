<script lang="ts">
	import { neighborhoodPhoto } from '$lib/stores/NeighborhoodPhoto';
	export let neighborhood: string;

	let photo_src: string | undefined;

	// reactive lookup whenever either store or prop changes
	$: if ($neighborhoodPhoto && neighborhood) {
		photo_src =
			$neighborhoodPhoto[
				`/src/lib/images/neighborhood_pics/${neighborhood.toLowerCase()}.jpg`
			];
	}
</script>

<div class="central-card">
	{#if photo_src}
		<img src={photo_src} alt={neighborhood} />
	{/if}
	<h3>{neighborhood}</h3>

	<!-- add any extra info / stats you want here -->
    <p>[Can potentially add data] Flip rate, flipper gain by investor types.</p>
</div>

<style>
	.central-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}
	.central-card img {
		max-width: 240px;
		border-radius: 0.75rem;
	}
</style>