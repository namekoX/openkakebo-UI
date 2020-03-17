import Rireki from "./Rireki";

interface results{
  rireki: Rireki[];
  pagerTotalCount: number;
}


interface GetRirekiResult {
  results: results;
  valid: boolean;
  validMsg: string;
  statusCd: number;
}
export default GetRirekiResult;