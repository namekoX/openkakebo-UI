import Koza from "./Koza";

interface Summary {
  id: number|null;
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
}

export default Summary;