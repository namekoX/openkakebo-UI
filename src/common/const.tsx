
export default class Const {
  static KEY_TOKEN = "OPEN_KAKEIBO_TOKEN";

  static LIST_PAGER_PERPAGE = 30;

  static SITE_ROOT = "/app4";

  static TEST_HOST = "http://openkakebotest.com";
  static PRODUCT_HOST = "https://slavesystem.info/phproot/openkakebo/public";

  static URLS = {
    LOGIN_URL: "/api/login",
    LOGOUT_URL: "/api/logout",
    PASS_CHANGE_URL: "/api/password",
    ID_CHANGE_URL: "/api/mail",
    REGISTER_URL: "/api/createuser",
    GOOGLE_URL:"/login/google",
    YAHOO_URL:"/login/yahoo",
    CATEGORY_URL:"/api/category",
    GET_USER_ID_URL:"/api/getuser",
    KOZA_URL:"/api/koza",
    SHUSHI_URL:"/api/shushi",
    SUMMARY_URL: "/api/summary",
    PUBLIC_URL: "/api/public",
    PUBLIC_CONF_URL: "/api/kokaiconfig",
  }

  static TITELS = {
    NORMAL:  "Open家計簿",
    LOGIN: "Open家計簿 - ログイン",
    INPUT: "Open家計簿 - 入力",
    KOZA: "Open家計簿 - 口座",
    CATEGORY: "Open家計簿 - カテゴリー",
    RIREKI: "Open家計簿 - 履歴",
    SUMMARY: "Open家計簿 - サマリー",
    PUBLIC_CONF: "Open家計簿 - 公開設定",
    HOW_TO:"Open家計簿 - 使い方"
  }

  static CATEGORY_KBN = {
    SHUNYU : '0',
    SISHUTU : '1',
  }

  static INPUT_KBN = {
    SHUNYU : '0',
    SISHUTU : '1',
    HURIKAE : '2',
  }
}