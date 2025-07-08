export enum TileColor {
  RED = "#EC1D25",
  ORANGE = "#F7941E",
  YELLOW = "#F8F207",
  GREEN = "#20B25A",
  LIGHT_BLUE = "#AAE0FC",
  DARK_BLUE = "#0271BB",
  MAGENTA = "#DA3A96",
  BROWN = "#955437"
}

export const TILE_COLOR_BY_TILE_ID = new Map(Object.entries({
  "Allston": TileColor.ORANGE,
  "Beacon Hill": TileColor.DARK_BLUE,
  "Brighton": TileColor.ORANGE,
  "Charlestown": TileColor.YELLOW,
  "Chinatown": TileColor.YELLOW,
  "Dorchester": TileColor.BROWN,
  "Downtown": TileColor.YELLOW,
  "East Boston": TileColor.ORANGE,
  "Fenway": TileColor.RED,
  "Hyde Park": TileColor.MAGENTA,
  "Jamaica Plains": TileColor.MAGENTA,
  "Longwood": TileColor.GREEN,
  "Mattapan": TileColor.BROWN,
  "MIT": TileColor.RED,
  "North End": TileColor.RED,
  "Roslindale": TileColor.MAGENTA,
  "Roxbury": TileColor.LIGHT_BLUE,
  "Seaport": TileColor.DARK_BLUE,
  "Southie": TileColor.GREEN,
  "South Boston": TileColor.GREEN,
  "West End": TileColor.LIGHT_BLUE,
  "West Roxbury": TileColor.LIGHT_BLUE
}));

export const DEFAULT_MESSAGES = {
  noData: 'No data available for selected year',
  selectTile: 'Select a tile to view details',
  specialTile: "Let's go Boston!",
  mitTile: 'Where dreams begin!'
};
