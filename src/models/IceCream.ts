export interface IceCream {
  _id: string;
  brand_pl: string;
  name_pl: string;
  description_pl: string;
  brand_en: string;
  name_en: string;
  description_en: string;
  rating: number;
  number_of_ratings: number;
  image: string;
  vegan: boolean | null;
  tags: string[];
  type: string;
  barcode: number | null;
  __v: number;
}

export enum Sort {
  DESC = 1,
  ASC = -1,
}

export interface AllIceCreamDto {
  searchField: string;
  isVegan: boolean | null;
  sortKey: Sort;
  page: number;
}
