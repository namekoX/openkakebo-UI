import PublicConf from "./PublicConf";

interface GetPublicConfResult {
  results: PublicConf;
  valid: boolean;
  validMsg: string;
  statusCd: number;
}
export default GetPublicConfResult;
