import * as React from 'react';
import { Actions } from '../containers/PublicConfContainer';
import { Row, Col, InputGroup, Button } from "react-bootstrap";
import { PublicConfState } from '../states/PublicConfReducer';
import Const from '../common/const';
import { SpinnerModal } from '../common/SpinnerModal';
import "react-datepicker/dist/react-datepicker.css";
import { getChkBoolStr, getChkValueStr } from '../common/utils';
import { useEffect } from 'react';
import { Msg } from '../common/Msg';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type PublicConfProps = OwnProps & PublicConfState & Actions;

export const PublicConfForm: React.FC<PublicConfProps> = (props: PublicConfProps) => {
  useEffect(() => {
    props.onPublicConfGet();
    if (props.location !== undefined) {
      document.title = Const.TITELS.PUBLIC_CONF;
    }
  }, [props.location.pathname])
  return (
    <div className={"FormRoot"} style={{ margin: "0 auto", width: "80%", maxWidth: "600px" }}>
      <SpinnerModal
        show={props.loading}
      />
      <Row >
        <Col sm={12}>
          <h2>公開設定</h2>
        </Col>
        <Col sm={12}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend
              className="checkBox"
            >
              <InputGroup.Checkbox
                value={props.PublicConf.is_open}
                checked={getChkBoolStr(props.PublicConf.is_open)}
                onChange={(e: any) => props.updateState(getChkValueStr(e.target.checked), "PublicConf.is_open")}
              />
              <InputGroup.Text
                className="checkBoxLabel"
              >
                外部公開する
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </Col>
        {getChkBoolStr(props.PublicConf.is_open) &&
          <React.Fragment>
            <Col sm={12}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend
                  className="checkBox"
                >
                  <InputGroup.Checkbox
                    value={props.PublicConf.is_shunyu}
                    checked={getChkBoolStr(props.PublicConf.is_shunyu)}
                    onChange={(e: any) => props.updateState(getChkValueStr(e.target.checked), "PublicConf.is_shunyu")}
                  />
                  <InputGroup.Text
                    className="checkBoxLabel"
                  >
                    収入を公開する
              </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
            {getChkBoolStr(props.PublicConf.is_shunyu) &&
              <Col sm={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend
                    className="checkBox"
                  >
                    <InputGroup.Checkbox
                      value={props.PublicConf.is_shunyu_category}
                      checked={getChkBoolStr(props.PublicConf.is_shunyu_category)}
                      onChange={(e: any) => props.updateState(getChkValueStr(e.target.checked), "PublicConf.is_shunyu_category")}
                    />
                    <InputGroup.Text
                      className="checkBoxLabel"
                    >
                      カテゴリごとに収入を公開する
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Col>
            }
            <Col sm={12}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend
                  className="checkBox"
                >
                  <InputGroup.Checkbox
                    value={props.PublicConf.is_shishutu}
                    checked={getChkBoolStr(props.PublicConf.is_shishutu)}
                    onChange={(e: any) => props.updateState(getChkValueStr(e.target.checked), "PublicConf.is_shishutu")}
                  />
                  <InputGroup.Text
                    className="checkBoxLabel"
                  >
                    支出を公開する
              </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
            {getChkBoolStr(props.PublicConf.is_shishutu) &&
              <Col sm={12}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend
                    className="checkBox"
                  >
                    <InputGroup.Checkbox
                      value={props.PublicConf.is_shishutu_category}
                      checked={getChkBoolStr(props.PublicConf.is_shishutu_category)}
                      onChange={(e: any) => props.updateState(getChkValueStr(e.target.checked), "PublicConf.is_shishutu_category")}
                    />
                    <InputGroup.Text
                      className="checkBoxLabel"
                    >
                      カテゴリごとに支出を公開する
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Col>
            }
            <Col sm={12}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend
                  className="checkBox"
                >
                  <InputGroup.Checkbox
                    value={props.PublicConf.is_togetu}
                    checked={getChkBoolStr(props.PublicConf.is_togetu)}
                    onChange={(e: any) => props.updateState(getChkValueStr(e.target.checked), "PublicConf.is_togetu")}
                  />
                  <InputGroup.Text
                    className="checkBoxLabel"
                  >
                    現在月の収支(途中経過)を公開する
                    </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
          </React.Fragment>
        }
      </Row>
      <Msg
        info={props.info}
        valid={props.valid}
        msg={props.msg}
      />
      <Button
        variant="primary"
        onClick={(e: any) => props.onPublicConfSave(props.PublicConf)}
      >
        保存
      </Button>
    </div>
  );
};