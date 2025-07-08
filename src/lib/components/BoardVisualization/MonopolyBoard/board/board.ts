import * as d3 from 'd3';
import { BOARD_TILES, GRID_SIZE } from './constants';
import { currentPin } from '$lib/stores/BoardVisualization/store';

/**
 * Returns the tile ID (if any) from user's mouse click.
 * @param clickX 
 * @param clickY 
 * @param imageElement 
 * @returns 
 */
export function getTileIdFromCoordinates(
  clickX: number,
  clickY: number,
  imageElement: HTMLImageElement,
): string | null {
  const rect = imageElement.getBoundingClientRect();

  // Normalize click coordinates
  const normalizedX = clickX / rect.width;
  const normalizedY = clickY / rect.height;

  // Tile width relative to board length
  const EFFECTIVE_GRID_WIDTH = 12; // 2 corners (1.5x) + 9 regular (1x) = 12 units
  const EFFECTIVE_GRID_HEIGHT = 12;

  // Convert normalized coordinates to effective grid units
  const gridX = normalizedX * EFFECTIVE_GRID_WIDTH;
  const gridY = normalizedY * EFFECTIVE_GRID_HEIGHT;

  // Determine column
  let col: number;
  if (gridX < 1.5) {
    col = 0; // Left corner
  } else if (gridX >= EFFECTIVE_GRID_WIDTH - 1.5) {
    col = 10; // Right corner
  } else {
    col = Math.floor((gridX - 1.5) / 1) + 1; // Regular tiles
  }

  // Determine row
  let row: number;
  if (gridY < 1.5) {
    row = 0; // Top corner
  } else if (gridY >= EFFECTIVE_GRID_HEIGHT - 1.5) {
    row = 10; // Bottom corner
  } else {
    row = Math.floor((gridY - 1.5) / 1) + 1; // Regular tiles (height = 1.5x)
  }

  console.log(gridX, gridY)
  console.log(row, col)
  

  return BOARD_TILES.find(tile => tile.gridPosition.row == row && tile.gridPosition.col == col)?.id || null;
}

/**
 * Initialize the monopoly board with D3 overlay.
 * 
 * @param svgContainer 
 * @param handleTileClick 
 * @returns 
 */
export function initializeBoard(
  svgContainer: SVGSVGElement,
  handleTileClick: (tileId: string) => void
) {
  const svg = d3.select(svgContainer)
    .style('position', 'absolute')
    .style('top', 0)
    .style('left', 0)
    .style('pointer-events', 'none');

  let currentWidth = 0;
  let pinGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  const updateDimensions = (width: number) => {
    currentWidth = width;
    svg
      .attr('viewBox', `0 0 ${width} ${width}`)
      .attr('width', width)
      .attr('height', width);
  };

  const tiles = svg.selectAll('.tile-overlay')
    .data(BOARD_TILES)
    .enter()
    .append('rect')
    .attr('class', 'tile-overlay')
    .style('pointer-events', 'all')
    .on('click', (_, d) => handleTileClick(d.id));

  // This is the character we're placing on the board
  pinGroup = svg.append('g')
    .attr('class', 'pin-group');

  const updateTiles = (width: number) => {
    const tileSize = width / GRID_SIZE;
    tiles
      .attr('x', d => d.gridPosition.col * tileSize)
      .attr('y', d => d.gridPosition.row * tileSize)
      .attr('width', d => (1) * tileSize)
      .attr('height', d => (1) * tileSize);
  };

  // Add a subscription
  currentPin.subscribe(pin => {
    if (!pinGroup) return;

    // Remove existing pin
    pinGroup.selectAll('image').remove();
    
    // Add new pin if we happen to palce at the right spot
    if (pin.tileId && pin.svg) {
      const tile = BOARD_TILES.find(t => t.id === pin.tileId);
      if (!tile) return;
      
      const tileSize = currentWidth / GRID_SIZE;
      const x = tile.gridPosition.col * tileSize;
      const y = tile.gridPosition.row * tileSize;

      console.log(x, y)
      
      const pinSize = tileSize * 0.5;
      const pinX = x
      const pinY = y
      
      pinGroup.append('image')
        .attr('href', pin.svg)
        .attr('x', pinX)
        .attr('y', pinY)
        .attr('width', pinSize)
        .attr('height', pinSize);
    }
  });

  return {
    updateDimensions,
    updateTiles,
  };
}

