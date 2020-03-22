import * as React from 'react';
import { Actions } from '../containers/LoginContainer';
import { Row, Col, FormControl, Button, Card, ListGroupItem, ListGroup, Alert } from "react-bootstrap";
import { UserState } from '../states/UserReducer';
import PostUserRequest from '../interface/PostUserRequest';
import { Br } from '../common/Br';
import Const from '../common/const';
import btn_google from '../image/btn_google_signin_dark_pressed_web@2x.png';
import btn_yahoo from '../image/btn_yahoo.png';
import { SpinnerModal } from '../common/SpinnerModal';
import Cookies from 'js-cookie';
import { Msg } from '../common/Msg';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type UserProps = OwnProps & UserState & Actions;

export const Login: React.FC<UserProps> = (props: UserProps) => {
  React.useEffect(() => {
    if (props.location !== undefined) {
      document.title = Const.TITELS.LOGIN;
      if (props.location.pathname === Const.SITE_ROOT + '/menu/changepassword' || props.location.pathname === Const.SITE_ROOT + '/menu/changeid') {
        props.updateState(true, "isChange");
        props.updateState('更新', "btnName");
        if (props.location.pathname === Const.SITE_ROOT + '/menu/changepassword') {
          props.updateState('パスワード', "changeMode");
        } else {
          props.updateState('ID', "changeMode");
        }
      } else {
        props.updateState(false, "isChange");
      }
    }
  }, [props.location.pathname])
  return (
    <div className={"LoginCard"}>
      <SpinnerModal
        show={props.loading}
      />
      <Card>
        <Card.Body className="LoginCardBody">
          <Card.Text>
            {props.isNew ? "新規ユーザー登録" :
              props.isChange ? props.changeMode === 'パスワード' ? "パスワード変更" : "メールアドレス変更"
                : "ログイン"}
          </Card.Text>
        </Card.Body>
        <Row>
          <Col sm={props.isNew || props.isChange ? 12 : 6}>
            <Card className="cardTitle">
              {!props.isChange &&
                <Card.Body>
                  <Card.Title>{props.isNew ? "新規ユーザー登録" : "パスワードでログイン"}</Card.Title>
                  {!props.isNew &&
                    <Card.Text>
                      メールアドレスでログインをします。
                  </Card.Text>
                  }
                </Card.Body>
              }
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <FormControl
                    type={props.isChange && props.changeMode === 'パスワード' ? "password" : "text"}
                    placeholder={props.isChange ? props.changeMode === 'パスワード' ? "現パスワード" : "現メールアドレス" : "メールアドレス"}
                    value={props.email}
                    maxLength={255}
                    onChange={(e: any) => props.updateState(e.target.value, "email")}
                    onKeyPress={(e: any) => {
                      if (e.key == 'Enter') {
                        const body: PostUserRequest = {
                          email: props.email,
                          password: props.password,
                        };
                        if (props.btnName == "ログイン") {
                          props.onLogin(body);
                        } else if (props.btnName == "更新") {
                          props.onUpdate(Cookies.get(Const.KEY_TOKEN) || '', props.chkpassword, props.password, props.email, props.changeMode);
                        } else if (props.btnName == "戻る") {
                          props.toTop();
                        } else {
                          props.onRegister(props.chkpassword, body);
                        }
                      }
                    }
                    }
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <FormControl
                    type={props.isChange && props.changeMode === 'ID' ? "text" : "password"}
                    placeholder={props.isChange ? props.changeMode === 'パスワード' ? "新パスワード" : "新メールアドレス" : "パスワード"}
                    value={props.password}
                    maxLength={50}
                    onChange={(e: any) => props.updateState(e.target.value, "password")}
                    onKeyPress={(e: any) => {
                      if (e.key == 'Enter') {
                        const body: PostUserRequest = {
                          email: props.email,
                          password: props.password,
                        };
                        if (props.btnName == "ログイン") {
                          props.onLogin(body);
                        } else if (props.btnName == "更新") {
                          props.onUpdate(Cookies.get(Const.KEY_TOKEN) || '', props.chkpassword, props.password, props.email, props.changeMode);
                        } else if (props.btnName == "戻る") {
                          props.toTop();
                        } else {
                          props.onRegister(props.chkpassword, body);
                        }
                      }
                    }
                    }
                  />
                </ListGroupItem>
                {(props.isNew || props.isChange) &&
                  <ListGroupItem>
                    <FormControl
                      type={props.isChange && props.changeMode === 'ID' ? "text" : "password"}
                      placeholder={props.isChange ? props.changeMode === 'パスワード' ? "新パスワード(確認)" : "新メールアドレス(確認)" : "パスワード(確認)"}
                      value={props.chkpassword}
                      maxLength={50}
                      onChange={(e: any) => props.updateState(e.target.value, "chkpassword")}
                      onKeyPress={(e: any) => {
                        if (e.key == 'Enter') {
                          const body: PostUserRequest = {
                            email: props.email,
                            password: props.password,
                          };
                          if (props.btnName == "ログイン") {
                            props.onLogin(body);
                          } else if (props.btnName == "更新") {
                            props.onUpdate(Cookies.get(Const.KEY_TOKEN) || '', props.chkpassword, props.password, props.email, props.changeMode);
                          } else if (props.btnName == "戻る") {
                            props.toTop();
                          } else {
                            props.onRegister(props.chkpassword, body);
                          }
                        }
                      }
                      }
                    />
                  </ListGroupItem>
                }
              </ListGroup>
              <Msg
                info={props.info}
                valid={props.valid}
                msg={props.msg}
              />
              <Card.Body>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={
                    (e: any) => {
                      const body: PostUserRequest = {
                        email: props.email,
                        password: props.password,
                      };
                      if (props.btnName == "ログイン") {
                        props.onLogin(body);
                      } else if (props.btnName == "更新") {
                        props.onUpdate(Cookies.get(Const.KEY_TOKEN) || '', props.chkpassword, props.password, props.email, props.changeMode);
                      } else if (props.btnName == "戻る") {
                        props.toTop();
                      } else {
                        props.onRegister(props.chkpassword, body);
                      }
                    }
                  }
                >
                  {props.btnName}
                </Button>
                {!(props.isNew || props.isChange) &&
                  <div>
                    <Br count={2} />
                    アカウントをお持ちでない方はこちらから
                    <Br count={1} />
                    <Button
                      variant="secondary"
                      type="submit"
                      className="widthrem36"
                      onClick={
                        (e: any) => {
                          props.toNew();
                        }
                      }
                    >
                      新規ユーザー登録
              </Button>
                  </div>
                }
                {props.isNew && props.btnName !== "戻る" &&
                  <div>
                    <Br count={1} />
                    <Button
                      variant="secondary"
                      type="submit"
                      className="widthrem36"
                      onClick={
                        (e: any) => {
                          props.toTop();
                        }
                      }
                    >
                      戻る
                    </Button>
                  </div>
                }
              </Card.Body>
            </Card>
          </Col>
          {!props.isNew && !props.isChange && <Col sm={6}>
            <Card className="cardTitle">
              <Card.Body>
                <Card.Title>SNSでログイン</Card.Title>
                <Card.Text>
                  SNSアカウントを使用してログインします。
                </Card.Text>
                <img
                  src={btn_google}
                  alt="googleでログイン"
                  style={{ maxWidth: '250px', cursor: 'pointer' }}
                  onClick={
                    (e: any) => {
                      props.toGoogle();
                    }
                  }
                />
                <Br count={1} />
                <img
                  src={btn_yahoo}
                  alt="yahooでログイン"
                  style={{ maxWidth: '250px', cursor: 'pointer' }}
                  onClick={
                    (e: any) => {
                      props.toYahoo();
                    }
                  }
                />
              </Card.Body>
            </Card>
          </Col>
          }
        </Row>
      </Card>
    </div >
  );
};