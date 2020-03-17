import SubCategory from "./SubCategory";

interface Category {
  id: number|null;
  user_id: number;
  category_order: number;
  category_kbn: string;
  category_name: string;
  subcategory: SubCategory[];
}
export default Category;