import Koza from "./Koza";

interface Summary {
  id: number | null;
  user_id: number;
  shunyu: number;
  shishutu: number;
  category?: {
    [key: string]: {
      category_kbn: string;
      kingaku: number;
    }
  },
  koza: Koza[];
  togetu: boolean;
  is_shishutu: boolean;
  is_shunyu: boolean;
  is_shishutu_category: boolean;
  is_shunyu_category: boolean;
}

export default Summary;