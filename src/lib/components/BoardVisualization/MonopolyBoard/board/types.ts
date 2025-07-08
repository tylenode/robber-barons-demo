export interface BoardTile {
  id: string;
  type: TileType;
  description: string;
  gridPosition: GridPosition;
  stats?: {
    [year: string]: {
      absentee_rate: number;
      corporate_ownership_rate: number;
    };
  };
}

export interface GridPosition {
  row: number;
  col: number;
}

export enum TileType {
  NEIGHBORHOOD = "neighborhood",
  SPECIAL = "special"
}