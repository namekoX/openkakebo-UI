import * as React from 'react';
import { Actions } from '../containers/SummaryContainer';
import { Row, Col, Table } from "react-bootstrap";
import { SummaryState } from '../states/SummaryReducer';
import Const from '../common/const';
import { SpinnerModal } from '../common/SpinnerModal';
import "react-datepicker/dist/react-datepicker.css";
import { formatToPrice, formatDateYYYYMM } from '../common/utils';
import { useEffect } from 'react';
import { Msg } from '../common/Msg';
import btn_migi from '../image/migi.png';
import btn_hidari from '../image/hidari.png';
import Koza from '../interface/Koza';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type SummaryProps = OwnProps & SummaryState & Actions;

function getFormatMonth(month: string) {
  return month.slice(0, 4) + "年" + month.slice(-2) + "月";
}

function addMonth(month: string, add: number) {
  let dt = new Date(Number(month.slice(0, 4)), Number(month.slice(-2)), 1, 0, 0, 0);
  dt.setMonth(dt.getMonth() + add - 1);
  return formatDateYYYYMM(dt);
}

function renderTable(categorys: {
  [key: string]: {
    category_kbn: string;
    kingaku: number;
  }
},
  kbn: string,
) {
  let rows = [];
  for (let key in categorys) {
    if (kbn === categorys[key].category_kbn) {
      rows.push(
        <tr>
          <td>
            {key}
          </td>
          <td align="right">
            {formatToPrice(categorys[key].kingaku)}
          </td>
        </tr>
      );
    }
  }

  return rows;
}

function renderTableKoza(kozas: Koza[]) {
  const rows = kozas.map((koza, index) =>
    <React.Fragment>
      <tr key={index}>
        <td>
          {koza.koza_name}
        </td>
        <td align="right">
          {formatToPrice(koza.zandaka)}
        </td>
      </tr>
    </React.Fragment>
  );

  return rows;
}

export const SummaryForm: React.FC<SummaryProps> = (props: SummaryProps) => {
  useEffect(() => {
    props.onSammaryGet(Number(props.month.replace('-', '')));
    if (props.location !== undefined) {
      document.title = Const.TITELS.SUMMARY;
    }
  }, [props.month])
  return (
    <div>
      <SpinnerModal
        show={props.loading}
      />
      <Row >
        <Col sm={3}>
          <h3>
            <img
              src={btn_hidari}
              style={{ width: '25px', marginRight: '25px', cursor: 'pointer' }}
              onClick={(e: any) => {
                props.updateState(addMonth(props.month, -1), "month")
              }}
            />
            {getFormatMonth(props.month)}
            <img
              src={btn_migi}
              style={{ width: '25px', marginLeft: '25px', cursor: 'pointer' }}
              onClick={(e: any) => {
                props.updateState(addMonth(props.month, 1), "month")
              }}
            />
          </h3>
        </Col>
      </Row>
      <Msg
        info={props.info}
        valid={props.valid}
        msg={props.msg}
      />
      <Row>
        <Col sm={12}>
          <h3>収入：{formatToPrice(props.summary.shunyu)}</h3>
          収入内訳
          <Table bordered hover responsive size="sm" className="Fixed" style={{ maxWidth: '600px', border: "0px" }}>
            <thead>
              <tr>
                <th>カテゴリ</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {
                props.summary.category !== undefined ? renderTable(
                  props.summary.category,
                  Const.CATEGORY_KBN.SHUNYU,
                )
                  : ""
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <h3>支出：{formatToPrice(props.summary.shishutu)}</h3>
          支出内訳
          <Table bordered hover responsive size="sm" className="Fixed" style={{ maxWidth: '600px', border: "0px" }}>
            <thead>
              <tr>
                <th>カテゴリ</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {
                props.summary.category !== undefined ? renderTable(
                  props.summary.category,
                  Const.CATEGORY_KBN.SISHUTU,
                )
                  : ""
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <h2>口座残高</h2>
          <Table bordered hover responsive size="sm" className="Fixed" style={{ maxWidth: '600px', border: "0px" }}>
            <thead>
              <tr>
                <th>口座</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {
                props.summary.koza !== undefined ? renderTableKoza(
                  props.summary.koza,
                )
                  : ""
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};