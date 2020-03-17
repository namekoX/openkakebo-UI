import Koza from "./Koza";

interface GetKozaResult {
  results: Koza[],
  valid: boolean,
  validMsg: string,
  statusCd: number,
}
export default GetKozaResult;