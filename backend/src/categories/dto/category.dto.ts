
export const DEFAULT_CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Finance"] as const;

export type TCategory = (typeof DEFAULT_CATEGORIES)[number];

export class CategoryDto {
  id!: number;
  name!: TCategory;
}