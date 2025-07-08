import type { BoardTile } from "./types";
import { TileType } from "./types";

export const REGULAR_TILE_HEIGHT_MULTIPLIER = 1.5 // Respective to regular tile width
export const CORNER_TILE_WIDTH_MULTIPLIER = 1.5
export const CORNER_TILE_HEIGHT_MULTIPLIER = 1.5
export const GRID_SIZE = 11; // Board is symmetric 11 rows x 11 columns
export const NUM_REGULAR_TILES_PER_ROW = 9
export const NUM_CORNER_TILES_PER_ROW = 2
export const BOARD_SIDE_LENGTH_IN_PIXELS = 1118

export const BOARD_TILES: BoardTile[] = [
  {
    id: 'go',
    type: TileType.SPECIAL,
    description: 'Starting point',
    gridPosition: { row: 10, col: 10 }
  },
  {
    id: 'Allston',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 2, col: 0 },
    stats: {
      2004: { absentee_rate: 0.71, corporate_ownership_rate: 0.07 },
      2005: { absentee_rate: 0.7, corporate_ownership_rate: 0.07 },
      2006: { absentee_rate: 0.71, corporate_ownership_rate: 0.08 },
      2007: { absentee_rate: 0.69, corporate_ownership_rate: 0.08 },
      2008: { absentee_rate: 0.69, corporate_ownership_rate: 0.09 },
      2009: { absentee_rate: 0.69, corporate_ownership_rate: 0.09 },
      2010: { absentee_rate: 0.7, corporate_ownership_rate: 0.09 },
      2011: { absentee_rate: 0.7, corporate_ownership_rate: 0.1 },
      2012: { absentee_rate: 0.72, corporate_ownership_rate: 0.1 },
      2013: { absentee_rate: 0.73, corporate_ownership_rate: 0.11 },
      2014: { absentee_rate: 0.74, corporate_ownership_rate: 0.12 },
      2015: { absentee_rate: 0.75, corporate_ownership_rate: 0.13 },
      2016: { absentee_rate: 0.76, corporate_ownership_rate: 0.14 },
      2017: { absentee_rate: 0.76, corporate_ownership_rate: 0.16 },
      2018: { absentee_rate: 0.77, corporate_ownership_rate: 0.17 },
      2019: { absentee_rate: 0.77, corporate_ownership_rate: 0.18 },
      2020: { absentee_rate: 0.78, corporate_ownership_rate: 0.22 },
      2021: { absentee_rate: 0.78, corporate_ownership_rate: 0.24 },
      2022: { absentee_rate: 0.77, corporate_ownership_rate: 0.25 },
      2023: { absentee_rate: 0.77, corporate_ownership_rate: 0.28 },
      2024: { absentee_rate: 0.78, corporate_ownership_rate: 0.3 }
    }
  },
  {
    id: 'Beacon Hill',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 9, col: 10 },
    stats: {2004: {absentee_rate: 0.66, corporate_ownership_rate: 0.05}, 2005: {absentee_rate: 0.66, corporate_ownership_rate: 0.06}, 2006: {absentee_rate: 0.68, corporate_ownership_rate: 0.06}, 2007: {absentee_rate: 0.67, corporate_ownership_rate: 0.07}, 2008: {absentee_rate: 0.67, corporate_ownership_rate: 0.07}, 2009: {absentee_rate: 0.68, corporate_ownership_rate: 0.08}, 2010: {absentee_rate: 0.68, corporate_ownership_rate: 0.07}, 2011: {absentee_rate: 0.7, corporate_ownership_rate: 0.07}, 2012: {absentee_rate: 0.7, corporate_ownership_rate: 0.07}, 2013: {absentee_rate: 0.69, corporate_ownership_rate: 0.07}, 2014: {absentee_rate: 0.69, corporate_ownership_rate: 0.08}, 2015: {absentee_rate: 0.69, corporate_ownership_rate: 0.09}, 2016: {absentee_rate: 0.69, corporate_ownership_rate: 0.09}, 2017: {absentee_rate: 0.69, corporate_ownership_rate: 0.12}, 2018: {absentee_rate: 0.69, corporate_ownership_rate: 0.13}, 2019: {absentee_rate: 0.69, corporate_ownership_rate: 0.15}, 2020: {absentee_rate: 0.7, corporate_ownership_rate: 0.2}, 2021: {absentee_rate: 0.71, corporate_ownership_rate: 0.24}, 2022: {absentee_rate: 0.7, corporate_ownership_rate: 0.25}, 2023: {absentee_rate: 0.7, corporate_ownership_rate: 0.28}, 2024: {absentee_rate: 0.71, corporate_ownership_rate: 0.3}},
  },
  {
    id: 'Brighton',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 4, col: 0 },
    stats: {2004: {absentee_rate: 0.56, corporate_ownership_rate: 0.04}, 2005: {absentee_rate: 0.56, corporate_ownership_rate: 0.04}, 2006: {absentee_rate: 0.57, corporate_ownership_rate: 0.04}, 2007: {absentee_rate: 0.55, corporate_ownership_rate: 0.05}, 2008: {absentee_rate: 0.56, corporate_ownership_rate: 0.05}, 2009: {absentee_rate: 0.57, corporate_ownership_rate: 0.05}, 2010: {absentee_rate: 0.57, corporate_ownership_rate: 0.07}, 2011: {absentee_rate: 0.58, corporate_ownership_rate: 0.07}, 2012: {absentee_rate: 0.6, corporate_ownership_rate: 0.07}, 2013: {absentee_rate: 0.61, corporate_ownership_rate: 0.08}, 2014: {absentee_rate: 0.62, corporate_ownership_rate: 0.09}, 2015: {absentee_rate: 0.64, corporate_ownership_rate: 0.1}, 2016: {absentee_rate: 0.65, corporate_ownership_rate: 0.1}, 2017: {absentee_rate: 0.66, corporate_ownership_rate: 0.11}, 2018: {absentee_rate: 0.67, corporate_ownership_rate: 0.12}, 2019: {absentee_rate: 0.67, corporate_ownership_rate: 0.13}, 2020: {absentee_rate: 0.68, corporate_ownership_rate: 0.16}, 2021: {absentee_rate: 0.68, corporate_ownership_rate: 0.19}, 2022: {absentee_rate: 0.68, corporate_ownership_rate: 0.19}, 2023: {absentee_rate: 0.68, corporate_ownership_rate: 0.21}, 2024: {absentee_rate: 0.68, corporate_ownership_rate: 0.23}},
  },
  {
    id: 'Charlestown',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 0, col: 9 },
    stats: {2004: {absentee_rate: 0.46, corporate_ownership_rate: 0.03}, 2005: {absentee_rate: 0.46, corporate_ownership_rate: 0.03}, 2006: {absentee_rate: 0.49, corporate_ownership_rate: 0.05}, 2007: {absentee_rate: 0.46, corporate_ownership_rate: 0.04}, 2008: {absentee_rate: 0.46, corporate_ownership_rate: 0.04}, 2009: {absentee_rate: 0.47, corporate_ownership_rate: 0.04}, 2010: {absentee_rate: 0.46, corporate_ownership_rate: 0.04}, 2011: {absentee_rate: 0.47, corporate_ownership_rate: 0.04}, 2012: {absentee_rate: 0.5, corporate_ownership_rate: 0.04}, 2013: {absentee_rate: 0.5, corporate_ownership_rate: 0.05}, 2014: {absentee_rate: 0.48, corporate_ownership_rate: 0.05}, 2015: {absentee_rate: 0.49, corporate_ownership_rate: 0.05}, 2016: {absentee_rate: 0.49, corporate_ownership_rate: 0.05}, 2017: {absentee_rate: 0.49, corporate_ownership_rate: 0.06}, 2018: {absentee_rate: 0.5, corporate_ownership_rate: 0.08}, 2019: {absentee_rate: 0.5, corporate_ownership_rate: 0.09}, 2020: {absentee_rate: 0.5, corporate_ownership_rate: 0.12}, 2021: {absentee_rate: 0.5, corporate_ownership_rate: 0.14}, 2022: {absentee_rate: 0.49, corporate_ownership_rate: 0.15}, 2023: {absentee_rate: 0.49, corporate_ownership_rate: 0.17}, 2024: {absentee_rate: 0.51, corporate_ownership_rate: 0.28}},
  },
  {
    id: 'Chinatown',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 0, col: 6 },
    stats: {2004: {absentee_rate: 0.73, corporate_ownership_rate: 0.13}, 2005: {absentee_rate: 0.72, corporate_ownership_rate: 0.12}, 2006: {absentee_rate: 0.71, corporate_ownership_rate: 0.09}, 2007: {absentee_rate: 0.67, corporate_ownership_rate: 0.09}, 2008: {absentee_rate: 0.66, corporate_ownership_rate: 0.1}, 2009: {absentee_rate: 0.65, corporate_ownership_rate: 0.09}, 2010: {absentee_rate: 0.65, corporate_ownership_rate: 0.09}, 2011: {absentee_rate: 0.65, corporate_ownership_rate: 0.1}, 2012: {absentee_rate: 0.68, corporate_ownership_rate: 0.1}, 2013: {absentee_rate: 0.69, corporate_ownership_rate: 0.11}, 2014: {absentee_rate: 0.69, corporate_ownership_rate: 0.11}, 2015: {absentee_rate: 0.7, corporate_ownership_rate: 0.12}, 2016: {absentee_rate: 0.69, corporate_ownership_rate: 0.12}, 2017: {absentee_rate: 0.69, corporate_ownership_rate: 0.14}, 2018: {absentee_rate: 0.73, corporate_ownership_rate: 0.16}, 2019: {absentee_rate: 0.73, corporate_ownership_rate: 0.18}, 2020: {absentee_rate: 0.72, corporate_ownership_rate: 0.21}, 2021: {absentee_rate: 0.72, corporate_ownership_rate: 0.24}, 2022: {absentee_rate: 0.71, corporate_ownership_rate: 0.24}, 2023: {absentee_rate: 0.71, corporate_ownership_rate: 0.27}, 2024: {absentee_rate: 0.72, corporate_ownership_rate: 0.3}},
  },
  {
    id: 'Dorchester',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 10, col: 9 },
    stats: {2004: {absentee_rate: 0.5, corporate_ownership_rate: 0.04}, 2005: {absentee_rate: 0.5, corporate_ownership_rate: 0.05}, 2006: {absentee_rate: 0.52, corporate_ownership_rate: 0.05}, 2007: {absentee_rate: 0.5, corporate_ownership_rate: 0.05}, 2008: {absentee_rate: 0.51, corporate_ownership_rate: 0.05}, 2009: {absentee_rate: 0.53, corporate_ownership_rate: 0.05}, 2010: {absentee_rate: 0.52, corporate_ownership_rate: 0.06}, 2011: {absentee_rate: 0.52, corporate_ownership_rate: 0.07}, 2012: {absentee_rate: 0.53, corporate_ownership_rate: 0.07}, 2013: {absentee_rate: 0.52, corporate_ownership_rate: 0.08}, 2014: {absentee_rate: 0.52, corporate_ownership_rate: 0.08}, 2015: {absentee_rate: 0.52, corporate_ownership_rate: 0.09}, 2016: {absentee_rate: 0.52, corporate_ownership_rate: 0.09}, 2017: {absentee_rate: 0.52, corporate_ownership_rate: 0.1}, 2018: {absentee_rate: 0.52, corporate_ownership_rate: 0.1}, 2019: {absentee_rate: 0.52, corporate_ownership_rate: 0.11}, 2020: {absentee_rate: 0.52, corporate_ownership_rate: 0.14}, 2021: {absentee_rate: 0.51, corporate_ownership_rate: 0.15}, 2022: {absentee_rate: 0.51, corporate_ownership_rate: 0.16}, 2023: {absentee_rate: 0.51, corporate_ownership_rate: 0.18}, 2024: {absentee_rate: 0.52, corporate_ownership_rate: 0.19}},
  },
  {
    id: 'Downtown',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 0, col: 7 },
    stats: {2004: {absentee_rate: 0.64, corporate_ownership_rate: 0.13}, 2005: {absentee_rate: 0.64, corporate_ownership_rate: 0.14}, 2006: {absentee_rate: 0.66, corporate_ownership_rate: 0.14}, 2007: {absentee_rate: 0.65, corporate_ownership_rate: 0.14}, 2008: {absentee_rate: 0.65, corporate_ownership_rate: 0.13}, 2009: {absentee_rate: 0.66, corporate_ownership_rate: 0.11}, 2010: {absentee_rate: 0.67, corporate_ownership_rate: 0.13}, 2011: {absentee_rate: 0.67, corporate_ownership_rate: 0.13}, 2012: {absentee_rate: 0.68, corporate_ownership_rate: 0.12}, 2013: {absentee_rate: 0.68, corporate_ownership_rate: 0.13}, 2014: {absentee_rate: 0.67, corporate_ownership_rate: 0.13}, 2015: {absentee_rate: 0.69, corporate_ownership_rate: 0.13}, 2016: {absentee_rate: 0.68, corporate_ownership_rate: 0.13}, 2017: {absentee_rate: 0.68, corporate_ownership_rate: 0.14}, 2018: {absentee_rate: 0.69, corporate_ownership_rate: 0.17}, 2019: {absentee_rate: 0.67, corporate_ownership_rate: 0.2}, 2020: {absentee_rate: 0.68, corporate_ownership_rate: 0.25}, 2021: {absentee_rate: 0.69, corporate_ownership_rate: 0.29}, 2022: {absentee_rate: 0.68, corporate_ownership_rate: 0.29}, 2023: {absentee_rate: 0.69, corporate_ownership_rate: 0.32}, 2024: {absentee_rate: 0.7, corporate_ownership_rate: 0.34}},
  },
  {
    id: 'East Boston',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 1, col: 0 },
    stats: {2004: {absentee_rate: 0.53, corporate_ownership_rate: 0.03}, 2005: {absentee_rate: 0.53, corporate_ownership_rate: 0.03}, 2006: {absentee_rate: 0.55, corporate_ownership_rate: 0.03}, 2007: {absentee_rate: 0.54, corporate_ownership_rate: 0.03}, 2008: {absentee_rate: 0.54, corporate_ownership_rate: 0.04}, 2009: {absentee_rate: 0.55, corporate_ownership_rate: 0.04}, 2010: {absentee_rate: 0.54, corporate_ownership_rate: 0.04}, 2011: {absentee_rate: 0.54, corporate_ownership_rate: 0.04}, 2012: {absentee_rate: 0.56, corporate_ownership_rate: 0.05}, 2013: {absentee_rate: 0.57, corporate_ownership_rate: 0.05}, 2014: {absentee_rate: 0.56, corporate_ownership_rate: 0.05}, 2015: {absentee_rate: 0.58, corporate_ownership_rate: 0.06}, 2016: {absentee_rate: 0.59, corporate_ownership_rate: 0.07}, 2017: {absentee_rate: 0.59, corporate_ownership_rate: 0.09}, 2018: {absentee_rate: 0.59, corporate_ownership_rate: 0.11}, 2019: {absentee_rate: 0.6, corporate_ownership_rate: 0.12}, 2020: {absentee_rate: 0.59, corporate_ownership_rate: 0.17}, 2021: {absentee_rate: 0.6, corporate_ownership_rate: 0.21}, 2022: {absentee_rate: 0.58, corporate_ownership_rate: 0.22}, 2023: {absentee_rate: 0.59, corporate_ownership_rate: 0.22}, 2024: {absentee_rate: 0.59, corporate_ownership_rate: 0.3}},
  },
  {
    id: 'Fenway',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 0, col: 4 },
    stats: {2004: {absentee_rate: 0.77, corporate_ownership_rate: 0.09}, 2005: {absentee_rate: 0.76, corporate_ownership_rate: 0.13}, 2006: {absentee_rate: 0.77, corporate_ownership_rate: 0.13}, 2007: {absentee_rate: 0.76, corporate_ownership_rate: 0.13}, 2008: {absentee_rate: 0.77, corporate_ownership_rate: 0.15}, 2009: {absentee_rate: 0.77, corporate_ownership_rate: 0.15}, 2010: {absentee_rate: 0.77, corporate_ownership_rate: 0.16}, 2011: {absentee_rate: 0.78, corporate_ownership_rate: 0.16}, 2012: {absentee_rate: 0.79, corporate_ownership_rate: 0.15}, 2013: {absentee_rate: 0.79, corporate_ownership_rate: 0.16}, 2014: {absentee_rate: 0.79, corporate_ownership_rate: 0.17}, 2015: {absentee_rate: 0.81, corporate_ownership_rate: 0.18}, 2016: {absentee_rate: 0.81, corporate_ownership_rate: 0.21}, 2017: {absentee_rate: 0.82, corporate_ownership_rate: 0.22}, 2018: {absentee_rate: 0.83, corporate_ownership_rate: 0.23}, 2019: {absentee_rate: 0.83, corporate_ownership_rate: 0.24}, 2020: {absentee_rate: 0.84, corporate_ownership_rate: 0.27}, 2021: {absentee_rate: 0.84, corporate_ownership_rate: 0.28}, 2022: {absentee_rate: 0.84, corporate_ownership_rate: 0.29}, 2023: {absentee_rate: 0.83, corporate_ownership_rate: 0.35}, 2024: {absentee_rate: 0.84, corporate_ownership_rate: 0.36}},
  },
  {
    id: 'Hyde Park',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 9, col: 0 },
    stats: {2004: {absentee_rate: 0.36, corporate_ownership_rate: 0.02}, 2005: {absentee_rate: 0.36, corporate_ownership_rate: 0.03}, 2006: {absentee_rate: 0.38, corporate_ownership_rate: 0.03}, 2007: {absentee_rate: 0.36, corporate_ownership_rate: 0.03}, 2008: {absentee_rate: 0.36, corporate_ownership_rate: 0.04}, 2009: {absentee_rate: 0.37, corporate_ownership_rate: 0.03}, 2010: {absentee_rate: 0.37, corporate_ownership_rate: 0.03}, 2011: {absentee_rate: 0.37, corporate_ownership_rate: 0.04}, 2012: {absentee_rate: 0.4, corporate_ownership_rate: 0.07}, 2013: {absentee_rate: 0.39, corporate_ownership_rate: 0.07}, 2014: {absentee_rate: 0.38, corporate_ownership_rate: 0.06}, 2015: {absentee_rate: 0.39, corporate_ownership_rate: 0.06}, 2016: {absentee_rate: 0.38, corporate_ownership_rate: 0.05}, 2017: {absentee_rate: 0.38, corporate_ownership_rate: 0.05}, 2018: {absentee_rate: 0.37, corporate_ownership_rate: 0.06}, 2019: {absentee_rate: 0.37, corporate_ownership_rate: 0.06}, 2020: {absentee_rate: 0.36, corporate_ownership_rate: 0.08}, 2021: {absentee_rate: 0.36, corporate_ownership_rate: 0.1}, 2022: {absentee_rate: 0.36, corporate_ownership_rate: 0.1}, 2023: {absentee_rate: 0.36, corporate_ownership_rate: 0.12}, 2024: {absentee_rate: 0.37, corporate_ownership_rate: 0.12}},
  },
  {
    id: 'Jamaica Plains',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 6, col: 0 },
    stats: {2004: {absentee_rate: 0.44, corporate_ownership_rate: 0.02}, 2005: {absentee_rate: 0.44, corporate_ownership_rate: 0.03}, 2006: {absentee_rate: 0.45, corporate_ownership_rate: 0.03}, 2007: {absentee_rate: 0.43, corporate_ownership_rate: 0.03}, 2008: {absentee_rate: 0.43, corporate_ownership_rate: 0.04}, 2009: {absentee_rate: 0.45, corporate_ownership_rate: 0.04}, 2010: {absentee_rate: 0.44, corporate_ownership_rate: 0.04}, 2011: {absentee_rate: 0.44, corporate_ownership_rate: 0.04}, 2012: {absentee_rate: 0.45, corporate_ownership_rate: 0.04}, 2013: {absentee_rate: 0.46, corporate_ownership_rate: 0.04}, 2014: {absentee_rate: 0.45, corporate_ownership_rate: 0.05}, 2015: {absentee_rate: 0.46, corporate_ownership_rate: 0.05}, 2016: {absentee_rate: 0.46, corporate_ownership_rate: 0.06}, 2017: {absentee_rate: 0.46, corporate_ownership_rate: 0.07}, 2018: {absentee_rate: 0.46, corporate_ownership_rate: 0.07}, 2019: {absentee_rate: 0.47, corporate_ownership_rate: 0.08}, 2020: {absentee_rate: 0.47, corporate_ownership_rate: 0.11}, 2021: {absentee_rate: 0.46, corporate_ownership_rate: 0.13}, 2022: {absentee_rate: 0.47, corporate_ownership_rate: 0.13}, 2023: {absentee_rate: 0.47, corporate_ownership_rate: 0.16}, 2024: {absentee_rate: 0.48, corporate_ownership_rate: 0.17}},
  },
  {
    id: 'Longwood',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 4, col: 10 },
    stats: {2004: {absentee_rate: 0.7, corporate_ownership_rate: 0.09}, 2005: {absentee_rate: 0.7, corporate_ownership_rate: 0.09}, 2006: {absentee_rate: 0.71, corporate_ownership_rate: 0.09}, 2007: {absentee_rate: 0.7, corporate_ownership_rate: 0.1}, 2008: {absentee_rate: 0.72, corporate_ownership_rate: 0.11}, 2009: {absentee_rate: 0.73, corporate_ownership_rate: 0.11}, 2010: {absentee_rate: 0.73, corporate_ownership_rate: 0.11}, 2011: {absentee_rate: 0.74, corporate_ownership_rate: 0.1}, 2012: {absentee_rate: 0.75, corporate_ownership_rate: 0.11}, 2013: {absentee_rate: 0.76, corporate_ownership_rate: 0.12}, 2014: {absentee_rate: 0.75, corporate_ownership_rate: 0.11}, 2015: {absentee_rate: 0.77, corporate_ownership_rate: 0.13}, 2016: {absentee_rate: 0.78, corporate_ownership_rate: 0.14}, 2017: {absentee_rate: 0.79, corporate_ownership_rate: 0.16}, 2018: {absentee_rate: 0.8, corporate_ownership_rate: 0.18}, 2019: {absentee_rate: 0.8, corporate_ownership_rate: 0.18}, 2020: {absentee_rate: 0.79, corporate_ownership_rate: 0.22}, 2021: {absentee_rate: 0.8, corporate_ownership_rate: 0.27}, 2022: {absentee_rate: 0.79, corporate_ownership_rate: 0.27}, 2023: {absentee_rate: 0.8, corporate_ownership_rate: 0.3}, 2024: {absentee_rate: 0.82, corporate_ownership_rate: 0.34}},
  },
  {
    id: 'Mattapan',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 10, col: 7 },
    stats: {2004: {absentee_rate: 0.43, corporate_ownership_rate: 0.02}, 2005: {absentee_rate: 0.44, corporate_ownership_rate: 0.03}, 2006: {absentee_rate: 0.46, corporate_ownership_rate: 0.03}, 2007: {absentee_rate: 0.44, corporate_ownership_rate: 0.03}, 2008: {absentee_rate: 0.44, corporate_ownership_rate: 0.03}, 2009: {absentee_rate: 0.46, corporate_ownership_rate: 0.03}, 2010: {absentee_rate: 0.45, corporate_ownership_rate: 0.03}, 2011: {absentee_rate: 0.44, corporate_ownership_rate: 0.04}, 2012: {absentee_rate: 0.46, corporate_ownership_rate: 0.04}, 2013: {absentee_rate: 0.48, corporate_ownership_rate: 0.05}, 2014: {absentee_rate: 0.46, corporate_ownership_rate: 0.05}, 2015: {absentee_rate: 0.46, corporate_ownership_rate: 0.05}, 2016: {absentee_rate: 0.48, corporate_ownership_rate: 0.06}, 2017: {absentee_rate: 0.47, corporate_ownership_rate: 0.06}, 2018: {absentee_rate: 0.47, corporate_ownership_rate: 0.07}, 2019: {absentee_rate: 0.47, corporate_ownership_rate: 0.07}, 2020: {absentee_rate: 0.45, corporate_ownership_rate: 0.09}, 2021: {absentee_rate: 0.44, corporate_ownership_rate: 0.09}, 2022: {absentee_rate: 0.44, corporate_ownership_rate: 0.1}, 2023: {absentee_rate: 0.44, corporate_ownership_rate: 0.12}, 2024: {absentee_rate: 0.45, corporate_ownership_rate: 0.14}},
  },
  {
    id: 'MIT',
    type: TileType.SPECIAL,
    description: 'Starting point',
    gridPosition: { row: 0, col: 1 },
  },
  {
    id: 'North End',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 0, col: 3 },
    stats: {2004: {absentee_rate: 0.64, corporate_ownership_rate: 0.08}, 2005: {absentee_rate: 0.65, corporate_ownership_rate: 0.08}, 2006: {absentee_rate: 0.68, corporate_ownership_rate: 0.09}, 2007: {absentee_rate: 0.66, corporate_ownership_rate: 0.1}, 2008: {absentee_rate: 0.67, corporate_ownership_rate: 0.11}, 2009: {absentee_rate: 0.68, corporate_ownership_rate: 0.1}, 2010: {absentee_rate: 0.68, corporate_ownership_rate: 0.11}, 2011: {absentee_rate: 0.69, corporate_ownership_rate: 0.11}, 2012: {absentee_rate: 0.71, corporate_ownership_rate: 0.11}, 2013: {absentee_rate: 0.7, corporate_ownership_rate: 0.11}, 2014: {absentee_rate: 0.71, corporate_ownership_rate: 0.11}, 2015: {absentee_rate: 0.72, corporate_ownership_rate: 0.13}, 2016: {absentee_rate: 0.72, corporate_ownership_rate: 0.1}, 2017: {absentee_rate: 0.72, corporate_ownership_rate: 0.12}, 2018: {absentee_rate: 0.73, corporate_ownership_rate: 0.13}, 2019: {absentee_rate: 0.74, corporate_ownership_rate: 0.16}, 2020: {absentee_rate: 0.74, corporate_ownership_rate: 0.19}, 2021: {absentee_rate: 0.75, corporate_ownership_rate: 0.23}, 2022: {absentee_rate: 0.73, corporate_ownership_rate: 0.24}, 2023: {absentee_rate: 0.74, corporate_ownership_rate: 0.28}, 2024: {absentee_rate: 0.75, corporate_ownership_rate: 0.29}},
  },
  {
    id: 'Roslindale',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 7, col: 0 },
    stats: {2004: {absentee_rate: 0.32, corporate_ownership_rate: 0.02}, 2005: {absentee_rate: 0.33, corporate_ownership_rate: 0.02}, 2006: {absentee_rate: 0.34, corporate_ownership_rate: 0.02}, 2007: {absentee_rate: 0.33, corporate_ownership_rate: 0.02}, 2008: {absentee_rate: 0.33, corporate_ownership_rate: 0.02}, 2009: {absentee_rate: 0.35, corporate_ownership_rate: 0.02}, 2010: {absentee_rate: 0.35, corporate_ownership_rate: 0.02}, 2011: {absentee_rate: 0.35, corporate_ownership_rate: 0.02}, 2012: {absentee_rate: 0.36, corporate_ownership_rate: 0.03}, 2013: {absentee_rate: 0.36, corporate_ownership_rate: 0.03}, 2014: {absentee_rate: 0.36, corporate_ownership_rate: 0.03}, 2015: {absentee_rate: 0.37, corporate_ownership_rate: 0.03}, 2016: {absentee_rate: 0.37, corporate_ownership_rate: 0.04}, 2017: {absentee_rate: 0.37, corporate_ownership_rate: 0.05}, 2018: {absentee_rate: 0.37, corporate_ownership_rate: 0.05}, 2019: {absentee_rate: 0.37, corporate_ownership_rate: 0.05}, 2020: {absentee_rate: 0.37, corporate_ownership_rate: 0.08}, 2021: {absentee_rate: 0.37, corporate_ownership_rate: 0.1}, 2022: {absentee_rate: 0.36, corporate_ownership_rate: 0.1}, 2023: {absentee_rate: 0.37, corporate_ownership_rate: 0.12}, 2024: {absentee_rate: 0.37, corporate_ownership_rate: 0.14}},
  },
  {
    id: 'Roxbury',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 10, col: 4 },
    stats: {2004: {absentee_rate: 0.7, corporate_ownership_rate: 0.07}, 2005: {absentee_rate: 0.7, corporate_ownership_rate: 0.08}, 2006: {absentee_rate: 0.71, corporate_ownership_rate: 0.08}, 2007: {absentee_rate: 0.68, corporate_ownership_rate: 0.08}, 2008: {absentee_rate: 0.68, corporate_ownership_rate: 0.08}, 2009: {absentee_rate: 0.7, corporate_ownership_rate: 0.09}, 2010: {absentee_rate: 0.69, corporate_ownership_rate: 0.09}, 2011: {absentee_rate: 0.69, corporate_ownership_rate: 0.1}, 2012: {absentee_rate: 0.69, corporate_ownership_rate: 0.11}, 2013: {absentee_rate: 0.69, corporate_ownership_rate: 0.13}, 2014: {absentee_rate: 0.68, corporate_ownership_rate: 0.13}, 2015: {absentee_rate: 0.69, corporate_ownership_rate: 0.15}, 2016: {absentee_rate: 0.7, corporate_ownership_rate: 0.16}, 2017: {absentee_rate: 0.7, corporate_ownership_rate: 0.17}, 2018: {absentee_rate: 0.7, corporate_ownership_rate: 0.18}, 2019: {absentee_rate: 0.7, corporate_ownership_rate: 0.19}, 2020: {absentee_rate: 0.69, corporate_ownership_rate: 0.22}, 2021: {absentee_rate: 0.68, corporate_ownership_rate: 0.23}, 2022: {absentee_rate: 0.68, corporate_ownership_rate: 0.23}, 2023: {absentee_rate: 0.68, corporate_ownership_rate: 0.25}, 2024: {absentee_rate: 0.68, corporate_ownership_rate: 0.25}},
  },
  {
    id: 'Seaport',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 7, col: 10 },
    stats: {2004: {absentee_rate: 0.76, corporate_ownership_rate: 0.06}, 2005: {absentee_rate: 0.75, corporate_ownership_rate: 0.08}, 2006: {absentee_rate: 0.74, corporate_ownership_rate: 0.11}, 2007: {absentee_rate: 0.73, corporate_ownership_rate: 0.15}, 2008: {absentee_rate: 0.78, corporate_ownership_rate: 0.12}, 2009: {absentee_rate: 0.65, corporate_ownership_rate: 0.12}, 2010: {absentee_rate: 0.67, corporate_ownership_rate: 0.22}, 2011: {absentee_rate: 0.63, corporate_ownership_rate: 0.19}, 2012: {absentee_rate: 0.66, corporate_ownership_rate: 0.15}, 2013: {absentee_rate: 0.65, corporate_ownership_rate: 0.14}, 2014: {absentee_rate: 0.6, corporate_ownership_rate: 0.13}, 2015: {absentee_rate: 0.62, corporate_ownership_rate: 0.13}, 2016: {absentee_rate: 0.62, corporate_ownership_rate: 0.14}, 2017: {absentee_rate: 0.7, corporate_ownership_rate: 0.19}, 2018: {absentee_rate: 0.67, corporate_ownership_rate: 0.17}, 2019: {absentee_rate: 0.67, corporate_ownership_rate: 0.2}, 2020: {absentee_rate: 0.72, corporate_ownership_rate: 0.3}, 2021: {absentee_rate: 0.73, corporate_ownership_rate: 0.35}, 2022: {absentee_rate: 0.72, corporate_ownership_rate: 0.41}, 2023: {absentee_rate: 0.71, corporate_ownership_rate: 0.35}, 2024: {absentee_rate: 0.71, corporate_ownership_rate: 0.38}},
  },
  {
    id: 'South Boston',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 2, col: 10 },
    stats: {2004: {absentee_rate: 0.5, corporate_ownership_rate: 0.04}, 2005: {absentee_rate: 0.51, corporate_ownership_rate: 0.05}, 2006: {absentee_rate: 0.52, corporate_ownership_rate: 0.05}, 2007: {absentee_rate: 0.49, corporate_ownership_rate: 0.05}, 2008: {absentee_rate: 0.5, corporate_ownership_rate: 0.06}, 2009: {absentee_rate: 0.51, corporate_ownership_rate: 0.08}, 2010: {absentee_rate: 0.51, corporate_ownership_rate: 0.08}, 2011: {absentee_rate: 0.51, corporate_ownership_rate: 0.08}, 2012: {absentee_rate: 0.53, corporate_ownership_rate: 0.08}, 2013: {absentee_rate: 0.53, corporate_ownership_rate: 0.08}, 2014: {absentee_rate: 0.53, corporate_ownership_rate: 0.08}, 2015: {absentee_rate: 0.55, corporate_ownership_rate: 0.09}, 2016: {absentee_rate: 0.55, corporate_ownership_rate: 0.09}, 2017: {absentee_rate: 0.57, corporate_ownership_rate: 0.1}, 2018: {absentee_rate: 0.58, corporate_ownership_rate: 0.11}, 2019: {absentee_rate: 0.59, corporate_ownership_rate: 0.12}, 2020: {absentee_rate: 0.6, corporate_ownership_rate: 0.16}, 2021: {absentee_rate: 0.61, corporate_ownership_rate: 0.18}, 2022: {absentee_rate: 0.6, corporate_ownership_rate: 0.19}, 2023: {absentee_rate: 0.6, corporate_ownership_rate: 0.21}, 2024: {absentee_rate: 0.62, corporate_ownership_rate: 0.22}},
  },
  {
    id: 'Southie',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 1, col: 10 },
    stats: {2004: {absentee_rate: 0.54, corporate_ownership_rate: 0.06}, 2005: {absentee_rate: 0.54, corporate_ownership_rate: 0.07}, 2006: {absentee_rate: 0.55, corporate_ownership_rate: 0.07}, 2007: {absentee_rate: 0.53, corporate_ownership_rate: 0.07}, 2008: {absentee_rate: 0.53, corporate_ownership_rate: 0.08}, 2009: {absentee_rate: 0.54, corporate_ownership_rate: 0.08}, 2010: {absentee_rate: 0.53, corporate_ownership_rate: 0.08}, 2011: {absentee_rate: 0.54, corporate_ownership_rate: 0.1}, 2012: {absentee_rate: 0.56, corporate_ownership_rate: 0.09}, 2013: {absentee_rate: 0.56, corporate_ownership_rate: 0.1}, 2014: {absentee_rate: 0.57, corporate_ownership_rate: 0.09}, 2015: {absentee_rate: 0.6, corporate_ownership_rate: 0.1}, 2016: {absentee_rate: 0.6, corporate_ownership_rate: 0.1}, 2017: {absentee_rate: 0.61, corporate_ownership_rate: 0.12}, 2018: {absentee_rate: 0.61, corporate_ownership_rate: 0.13}, 2019: {absentee_rate: 0.62, corporate_ownership_rate: 0.14}, 2020: {absentee_rate: 0.62, corporate_ownership_rate: 0.18}, 2021: {absentee_rate: 0.63, corporate_ownership_rate: 0.2}, 2022: {absentee_rate: 0.62, corporate_ownership_rate: 0.21}, 2023: {absentee_rate: 0.63, corporate_ownership_rate: 0.24}, 2024: {absentee_rate: 0.64, corporate_ownership_rate: 0.25}},
  },
  {
    id: 'West End',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 10, col: 1 },
    stats: {2004: {absentee_rate: 0.57, corporate_ownership_rate: 0.05}, 2005: {absentee_rate: 0.58, corporate_ownership_rate: 0.06}, 2006: {absentee_rate: 0.59, corporate_ownership_rate: 0.06}, 2007: {absentee_rate: 0.57, corporate_ownership_rate: 0.07}, 2008: {absentee_rate: 0.59, corporate_ownership_rate: 0.08}, 2009: {absentee_rate: 0.6, corporate_ownership_rate: 0.08}, 2010: {absentee_rate: 0.63, corporate_ownership_rate: 0.07}, 2011: {absentee_rate: 0.63, corporate_ownership_rate: 0.08}, 2012: {absentee_rate: 0.66, corporate_ownership_rate: 0.09}, 2013: {absentee_rate: 0.66, corporate_ownership_rate: 0.09}, 2014: {absentee_rate: 0.67, corporate_ownership_rate: 0.1}, 2015: {absentee_rate: 0.67, corporate_ownership_rate: 0.1}, 2016: {absentee_rate: 0.7, corporate_ownership_rate: 0.11}, 2017: {absentee_rate: 0.71, corporate_ownership_rate: 0.12}, 2018: {absentee_rate: 0.71, corporate_ownership_rate: 0.13}, 2019: {absentee_rate: 0.73, corporate_ownership_rate: 0.15}, 2020: {absentee_rate: 0.73, corporate_ownership_rate: 0.21}, 2021: {absentee_rate: 0.73, corporate_ownership_rate: 0.23}, 2022: {absentee_rate: 0.72, corporate_ownership_rate: 0.24}, 2023: {absentee_rate: 0.72, corporate_ownership_rate: 0.27}, 2024: {absentee_rate: 0.73, corporate_ownership_rate: 0.28}},
  },
  {
    id: 'West Roxbury',
    type: TileType.NEIGHBORHOOD,
    description: 'Starting point',
    gridPosition: { row: 10, col: 2 },
    stats: {2004: {absentee_rate: 0.33, corporate_ownership_rate: 0.01}, 2005: {absentee_rate: 0.32, corporate_ownership_rate: 0.01}, 2006: {absentee_rate: 0.33, corporate_ownership_rate: 0.02}, 2007: {absentee_rate: 0.32, corporate_ownership_rate: 0.02}, 2008: {absentee_rate: 0.32, corporate_ownership_rate: 0.02}, 2009: {absentee_rate: 0.33, corporate_ownership_rate: 0.02}, 2010: {absentee_rate: 0.32, corporate_ownership_rate: 0.02}, 2011: {absentee_rate: 0.33, corporate_ownership_rate: 0.02}, 2012: {absentee_rate: 0.33, corporate_ownership_rate: 0.02}, 2013: {absentee_rate: 0.33, corporate_ownership_rate: 0.03}, 2014: {absentee_rate: 0.33, corporate_ownership_rate: 0.03}, 2015: {absentee_rate: 0.34, corporate_ownership_rate: 0.03}, 2016: {absentee_rate: 0.34, corporate_ownership_rate: 0.03}, 2017: {absentee_rate: 0.34, corporate_ownership_rate: 0.04}, 2018: {absentee_rate: 0.34, corporate_ownership_rate: 0.04}, 2019: {absentee_rate: 0.34, corporate_ownership_rate: 0.05}, 2020: {absentee_rate: 0.34, corporate_ownership_rate: 0.07}, 2021: {absentee_rate: 0.34, corporate_ownership_rate: 0.09}, 2022: {absentee_rate: 0.33, corporate_ownership_rate: 0.09}, 2023: {absentee_rate: 0.34, corporate_ownership_rate: 0.11}, 2024: {absentee_rate: 0.34, corporate_ownership_rate: 0.13}},
  }
];

export const BOARD_TILE_BY_TILE_ID = new Map<string, BoardTile>(
  BOARD_TILES.map(tile => [tile.id, tile])
);