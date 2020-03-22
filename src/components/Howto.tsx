import * as React from 'react';
import { Br } from '../common/Br';
import { Jumbotron, Container } from 'react-bootstrap';
import img1 from '../image/howto1.jpg';
import img2 from '../image/howto2.jpg';
import img3 from '../image/howto3.jpg';
import img4 from '../image/howto4.jpg';
import img5 from '../image/howto5.jpg';
import img6 from '../image/howto6.jpg';
import img7 from '../image/howto7.jpg';
import Const from '../common/const';

export class Howto extends React.Component {
  constructor(props: any) {
    super(props);
    document.title = Const.TITELS.HOW_TO;
  }
  render() {
    return (
      <div className="howto">
        <Jumbotron fluid>
          <Container>
            <h2>About This Site</h2>
            <br />
            <h4>Q.このサイトは？</h4>
            <p>→管理人が家計簿を公開するために作成したサイトです。どなたでも簡単に家計簿を入力、公開することが出来ます。</p>
            <br />
            <h4>Q.スマホに対応しよ？</h4>
            <p>→アプリ作る技術もレスポンシブに作る技術もねえ！！。ブラウザからがんばってくだしあ…</p>
            <br />
            <Br count={2} />
            <h2>使い方</h2>
            <Br count={1} />
            <h3>1.まずは口座に現在の資金を設定しよう</h3>
            <p>1.1.トップ画面から、「口座設定」をクリックします。</p>
            <Br count={1} />
            <img src={img1}/>
            <Br count={1} />
            <p>1.2.財布の編集ボタンをクリックします。ここで手元にある現金の金額を入力しましょう。</p>
            <Br count={1} />
            <img src={img2} />
            <Br count={1} />
            <p>1.3.銀行口座を持っている場合は、口座追加を押し、口座に入っている現金を入力します。</p>
            <Br count={1} />
            <img src={img3} />
            <Br count={1} />
            <aside>補足
              <p>クレジットカードにチェックを入れると、自動引落の設定ができます。</p>
              <p>※指定した日に口座から自動でクレジットカードに入力した支出が減算されます。</p>
            </aside>
            <Br count={1} />
            <h3>2.公開する範囲を設定しよう</h3>
            <Br count={1} />
            <p>2.1.メニュー画面から、「公開設定」をクリックします。</p>
            <Br count={1} />
            <img src={img4} />
            <Br count={1} />
            <p>2.2.「外部公開する。」に選択を入れ、保存するとあなたの収支が皆に見れるようになります。</p>
            <Br count={1} />
            <img src={img5} />
            <Br count={1} />
            <p>2.3.実際に表示される内容は、メニュー画面の「公開用ページの確認」から確認できます。</p>
            <Br count={1} />
            <h3>3.支出の入力方法</h3>
            <p>3.1.メニュー画面から、「支出入力」をクリックします。</p>
            <Br count={1} />
            <p>3.2.支出した日、金額、支出のカテゴリなどを入力し保存します。</p>
            <Br count={1} />
            <img src={img6} />
            <Br count={1} />
            <aside>補足
              <p>間違えて入力してしまった場合は、メニュー画面の「履歴」から入力内容を削除できます。</p>
              <img src={img7} />
            </aside>
            <Br count={2} />
          </Container>
        </Jumbotron>
      </div >
    );
  }
};
