// ─── Dimensions ───
export interface Dimensions {
  w: number;
  h: number;
  d: number;
}

// ─── Furniture Categories ───
export type FurnitureCategory =
  | 'Chaise de bureau'
  | 'Bureau'
  | 'Table de réunion'
  | 'Armoire'
  | 'Caisson'
  | 'Étagère'
  | 'Fauteuil';

// ─── Furniture Condition ───
export type FurnitureState = 'A' | 'B' | 'C';

export interface StateInfo {
  key: FurnitureState;
  label: string;
  stars: number;
}

// ─── Furniture Item ───
export interface Furniture {
  id: string;
  name: string;
  category: FurnitureCategory;
  brand: string;
  dimensions: Dimensions;
  state: FurnitureState;
  company: string;
  material: string;
  quantity: number;
  assetId: string;
  price: number;
  priceMin: number;
  priceMax: number;
  priceRef: number;
  salesCount: number;
  polygons: number;
  color: string;
  images?: string[];
}

// ─── User ───
export interface User {
  email: string;
  name: string;
  company: string;
}

// ─── Scanner Metadata ───
export interface ScannerMeta {
  category: FurnitureCategory;
  brand: string;
  w: string;
  h: string;
  d: string;
  qty: string;
  material: string;
  state: FurnitureState;
  notes: string;
}

// ─── Processing Progress ───
export interface ProcessingProgress {
  keys: number;
  align: number;
  mesh: number;
  tex: number;
}
