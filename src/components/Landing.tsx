import * as React from 'react';
import { Br } from '../common/Br';
import img1 from '../image/land1.png';
import img2 from '../image/land2.png';
import img3 from '../image/land3.png';
import Const from '../common/const';
import Helmet from "react-helmet"
import { Link } from 'react-router-dom';

export class Landing extends React.Component {
  constructor(props: any) {
    super(props);
    document.title = Const.TITELS.NORMAL;
  }
  render() {
    return (
      <div className="land">
        <Helmet>
          <meta property="og:description" content="家計簿を公開したい。OPEN家計簿はその悩みを解決します。" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={img1} />
          <meta property="og:url" content={Const.SITE_ROOT} />
          <meta property="og:site_name" content="OPEN家計簿" />
          <meta name="twitter:card" content="summary" />
        </Helmet>
        <Link to={Const.SITE_ROOT + "/menu/summary"}><img src={img1} alt="家計簿を公開したい。OPEN家計簿はその悩みを解決します。" /></Link>
        <Br count={2} />
        <h2>About This Site</h2>
        <p>OPEN家計簿は収支を簡単に入力し、その結果を公開できるサイトです。</p>
        <p>節約の結果を皆に公開することによりモチベーションを高めることが出来ます。</p>
        <p>接続用のURLを知らなければアクセスできないため、特定の人だけに公開することも出来ます。</p>
        <Br count={4} />
        <img src={img2} alt="でも全部を公開するのは気が引けますよね。" />
        <Br count={4} />
        <p className="big">でもOPEN家計簿なら全く問題ありません！！</p>
        <Br count={4} />
        <img src={img3} alt="OPEN家計簿なら公開範囲を細かく設定可能" />
        <Br count={2} />
        <p className="big">簡単登録で家計簿公開を始めよう</p>
        <Link to={Const.SITE_ROOT + "/menu/summary"} className="btn-circle-3d">始める</Link>
        <Br count={4} />
      </div >
    );
  }
};
