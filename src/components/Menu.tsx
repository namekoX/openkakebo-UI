import * as React from 'react';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { RootState } from '../states/AppReducer';
import { Actions } from '../containers/MenuContainer';
import { Tab } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import { isLongWidth, isNotSocial } from '../common/utils';
import LoginContainer from '../containers/LoginContainer';
import Const from '../common/const';
import CategoryContainer from '../containers/CategoryContainer';
import KozaContainer from '../containers/KozaContainer';
import InputContainer from '../containers/InputContainer';
import RirekiContainer from '../containers/RirekiContainer';
import SummaryContainer from '../containers/SummaryContainer';
import { Br } from '../common/Br';
import { NotFound } from './NotFound';
import { useEffect } from 'react';
import PublicConfContainer from '../containers/PublicConfContainer';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type Menuprops = OwnProps & RootState & Actions;

export const Menu: React.FC<Menuprops> = (props: Menuprops) => {
  useEffect(() => {
    props.updateState(props.location.pathname.replace(Const.SITE_ROOT,""), "menuTabActive")
  }, [props.location.pathname])
  return (
    <div className="padding10">

      <Tab.Container id="left-tabs" activeKey={props.menuTabActive}>
        <Row>
          <Col sm={3}>
            <Card border="dark" className="menuCard">
              <Card.Header>収支表示</Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column Menu" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/summary" className="MenuItem">月サマリー</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/rireki" className="MenuItem">履歴</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
            <Br count = {1} />
            <Card border="dark" className="menuCard">
              <Card.Header>入力</Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column Menu" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/input/shunyu" className="MenuItem">収入入力</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/input/shishutu" className="MenuItem">支出入力</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/input/hurikae" className="MenuItem">振替</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
            <Br count = {1} />
            <Card border="dark" className="menuCard">
              <Card.Header>設定</Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column Menu" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/koza" className="MenuItem">口座設定</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/category/shunyu" className="MenuItem">収入カテゴリ</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/category/shishutu" className="MenuItem">支出カテゴリ</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/publicconf" className="MenuItem">公開設定</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
            <Br count = {1} />
            <Card border="dark" className="menuCard">
              <Card.Header>公開用ページ</Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column Menu" onSelect={(selectedKey: string)  => props.toPublic()} >
                  <Nav.Item>
                    <Nav.Link eventKey="" className="MenuItem">公開用ページの確認</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
            <Br count = {1} />
            {isNotSocial() &&
            <Card border="dark" className="menuCard">
              <Card.Header>ユーザー管理</Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column Menu" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/changepassword" className="MenuItem">パスワード変更</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/menu/changeid" className="MenuItem">ユーザーID変更</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>}
            <Br count = {1} />
          </Col>
          <Col sm={9} className={isLongWidth(props.location.pathname) ? "longwidth" : ""}>
            <Switch>
              {isNotSocial() &&
                <Route exact path={Const.SITE_ROOT + '/menu/changepassword'} component={LoginContainer} />
              }
              {isNotSocial() &&
                <Route exact path={Const.SITE_ROOT + '/menu/changeid'} component={LoginContainer} />
              }
              <Route exact path={Const.SITE_ROOT + '/menu/category/shunyu'} component={CategoryContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/category/shishutu'} component={CategoryContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/koza'} component={KozaContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/input/shunyu'} component={InputContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/input/shishutu'} component={InputContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/input/hurikae'} component={InputContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/rireki'} component={RirekiContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/summary'} component={SummaryContainer} />
              <Route exact path={Const.SITE_ROOT + '/menu/publicconf'} component={PublicConfContainer} />
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};