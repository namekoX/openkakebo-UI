import SubCategory from "./SubCategory";
import Category from "./Category";

interface GetCategoryResult {
  results: Category[],
  valid: boolean,
  validMsg: string,
  statusCd: number,
}
export default GetCategoryResult;