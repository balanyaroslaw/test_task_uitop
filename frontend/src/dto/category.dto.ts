
export interface GetCategoryDTO {
  id: number;
  name: TCategories;
}

export type TCategories = "Work" | "Personal" | "Shopping" | "Health" | "Finance";