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
        <Navbar.Brand href={Const.SITE_ROOT + "/"}><h1><img src={favicon} style={{ width: '30px', border: "0px" }} /> OPEN家計簿</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" onSelect={(selectedKey: string) => props.onSelect(`${selectedKey}`)} >
            <Nav.Link eventKey= "/" >トップ</Nav.Link>
            <Nav.Link eventKey="/howto">使い方</Nav.Link>
            <Nav.Link target="blank" href="http://slavesystem.net/blog/2019/11/17/%e3%80%8crss%e3%82%ab%e3%82%b9%e3%82%bf%e3%83%9e%e3%82%a4%e3%82%ba%e3%82%b5%e3%83%bc%e3%83%93%e3%82%b9%e3%80%8d%e5%95%8f%e3%81%84%e5%90%88%e3%82%8f%e3%81%9b%e7%94%a8%e8%a8%98%e4%ba%8b/">問い合わせ</Nav.Link>
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