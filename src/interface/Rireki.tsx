import Koza from "./Koza";
import Category from "./Category";
import SubCategory from "./SubCategory";

interface Rireki {
  id: number | null;
  user_id: number;
  shushi_name: string;
  kingaku: number;
  hiduke: Date;
  shushi_kbn: string;
  koza: Koza | null;
  before_koza: Koza | null;
  category: Category | null;
  sub_category: SubCategory | null;
}
export default Rireki;