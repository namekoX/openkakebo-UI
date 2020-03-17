import Summary from "./Summary";
import Koza from "./Koza";

interface GetSummaryResult {
  results: Summary;
  valid: boolean;
  validMsg: string;
  statusCd: number;
}
export default GetSummaryResult;
