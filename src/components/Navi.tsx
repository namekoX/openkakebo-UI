import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { RootState } from '../states/AppReducer';
import { Actions } from '../containers/NaviContainer';
import { getUserName } from '../common/global';
import favicon from '../image/favicon.png';
import Const from '../common/const';

interface OwnProps {
  location?: Location;
}
interface Location {
  pathname: string;
}

type Naviprops = RootState & Actions;

export const Navi: React.FC<Naviprops> = (props: Naviprops) => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="HeadNavi">
        <Navbar.Brand href={Const.SITE_ROOT + "/menu/summary"}><h1><img src={favicon} style={{ width: '30px', border: "0px" }} /> OPEN家計簿</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
            <Nav.Link eventKey= "/menu/summary" >トップ</Nav.Link>
            <Nav.Link eventKey="/howto">使い方</Nav.Link>
            <Nav.Link target="blank" href="https://gomi.slavesystems.com/webservice/?p=23">問い合わせ</Nav.Link>
            {props.isLogin ?
              <Nav.Link eventKey="/logout">ログアウト</Nav.Link>
              :
              <Nav.Link eventKey="/login" >ログイン</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};