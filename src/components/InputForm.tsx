import * as React from 'react';
import { Actions } from '../containers/InputContainer';
import { Row, Col, FormControl, InputGroup, Button, Alert } from "react-bootstrap";
import { InputState } from '../states/InputReducer';
import Const from '../common/const';
import { SpinnerModal } from '../common/SpinnerModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import Category from '../interface/Category';
import SubCategory from '../interface/SubCategory';
import Koza from '../interface/Koza';
import { getUserId, formatDate } from '../common/utils';
import Shushi from '../interface/Shushi';
import { Msg } from '../common/Msg';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type InputProps = OwnProps & InputState & Actions;

function getFormatDate(date: Date) {
  return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
}

function renderOptions(categories: Category[]) {
  const options = categories.map((category, index) =>
    <React.Fragment>
      <option value={index}>{category.category_name}</option>
    </React.Fragment>
  );
  return options;
}

function renderSubOptions(categories: SubCategory[]) {
  const options = categories.map((category, index) =>
    <React.Fragment>
      <option value={index}>{category.subcategory_name}</option>
    </React.Fragment>
  );
  return options;
}

function renderKozaOptions(kozas: Koza[]) {
  const options = kozas.map((koza, index) =>
    <React.Fragment>
      <option value={index}>{koza.koza_name}</option>
    </React.Fragment>
  );
  return options;
}

export const InputForm: React.FC<InputProps> = (props: InputProps) => {
  React.useEffect(() => {
    if (props.location !== undefined) {
      let kbn;
      switch (props.location.pathname) {
        case Const.SITE_ROOT + '/menu/input/shunyu':
          kbn = Const.INPUT_KBN.SHUNYU;
          break;
        case Const.SITE_ROOT + '/menu/input/shishutu':
          kbn = Const.INPUT_KBN.SISHUTU;
          break;
        default:
          kbn = Const.INPUT_KBN.HURIKAE;
      }
      props.onCategoryGet(kbn, Cookies.get(Const.KEY_TOKEN) || '');
      document.title = Const.TITELS.INPUT;
    }
  }, [props.location.pathname])
  return (
    <div className={"FormRoot"} >
      <SpinnerModal
        show={props.loading}
      />
      <Row >
        <Col sm={12}>
          <h2>{props.shushi_kbn === Const.INPUT_KBN.SHUNYU ? '収入' : props.shushi_kbn === Const.INPUT_KBN.SISHUTU ? '支出' : '振替'}入力</h2>
        </Col>
      </Row>
      <Row className="width90">
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">日付</InputGroup.Text>
            </InputGroup.Prepend>
            <DatePicker
              className="form-control width100"
              locale="ja"
              selected={props.hiduke}
              onChange={(date) => props.updateState(date, "hiduke")}
              customInput={<button>{getFormatDate(props.hiduke)}</button>}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">{props.shushi_kbn === Const.INPUT_KBN.SHUNYU ? '収入' : props.shushi_kbn === Const.INPUT_KBN.SISHUTU ? '支出' : '振替'}金額</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              placeholder="金額を入力"
              value={String(props.kingaku)}
              maxLength={12}
              onChange={(e: any) => props.updateState(e.target.value, "kingaku")}
            />
          </InputGroup>
        </Col>
      </Row>
      {props.shushi_kbn !== Const.INPUT_KBN.HURIKAE && <Row>
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">カテゴリ</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="select"
              onChange={(e: any) => {
                props.updateState(null, "sub_category_id");
                e.target.value === "未選択" ?
                  props.updateState(null, "category_id")
                  : props.updateState(e.target.value, "category_id");
              }
              }
            >
              <React.Fragment>
                <option>未選択</option>
                {renderOptions(props.Category)}
              </React.Fragment>
            </FormControl>
            <FormControl
              as="select"
              onChange={(e: any) => {
                e.target.value === "未選択" ?
                  props.updateState(null, "sub_category_id")
                  : props.updateState(e.target.value, "sub_category_id");
              }}
            >
              <React.Fragment>
                <option>未選択</option>
                {
                  props.category_id === null ||
                    props.category_id === undefined ||
                    props.Category[props.category_id].subcategory === undefined
                    ? "" : renderSubOptions(props.Category[props.category_id].subcategory)
                }
              </React.Fragment>
            </FormControl>
          </InputGroup>
        </Col>
      </Row>}
      <Row>
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">{props.shushi_kbn === Const.INPUT_KBN.SHUNYU ? '入金先' : props.shushi_kbn === Const.INPUT_KBN.SISHUTU ? '出金元' : '入金先'}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="select"
              onChange={(e: any) =>
                props.updateState(e.target.value, "koza_id")
              }
            >
              <React.Fragment>
                {renderKozaOptions(props.koza)}
              </React.Fragment>
            </FormControl>
          </InputGroup>
        </Col>
      </Row>
      {props.shushi_kbn === Const.INPUT_KBN.HURIKAE && <Row>
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">出金先</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="select"
              onChange={(e: any) =>
                props.updateState(e.target.value, "before_koza_id")
              }
            >
              <React.Fragment>
                {renderKozaOptions(props.koza)}
              </React.Fragment>
            </FormControl>
          </InputGroup>
        </Col>
      </Row>}
      <Row>
        <Col sm={12}>
          <InputGroup className="mb-3 width90">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">備考</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              placeholder="任意"
              value={props.shushi_name}
              maxLength={100}
              onChange={(e: any) => props.updateState(e.target.value, "shushi_name")}
            />
          </InputGroup>
        </Col>
      </Row>
      <Msg
        info={props.info}
        valid={props.valid}
        msg={props.msg}
      />
      <Row>
        <Col sm={12}>
          <Button
            variant="primary"
            onClick={(e: any) => {
              const shushi: Shushi = {
                id: null,
                user_id: 0,
                shushi_name: props.shushi_name,
                kingaku: props.kingaku,
                hiduke: formatDate(props.hiduke) ,
                shushi_kbn: props.shushi_kbn,
                koza_id: props.koza_id !== null ? props.koza[props.koza_id].id : props.koza[0].id,
                before_koza_id: props.before_koza_id !== null ? props.koza[props.before_koza_id].id : null,
                category_id: props.category_id !== null ? props.Category[props.category_id].id : null,
                sub_category_id:props.sub_category_id !== null && props.category_id !== null ? props.Category[props.category_id].subcategory[props.sub_category_id].id : null,
              };
              props.onShushiSave(Cookies.get(Const.KEY_TOKEN) || '', shushi);
            }}
          >
            保存
          </Button>
        </Col>
      </Row>
    </div>
  );
};