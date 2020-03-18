import * as React from 'react';
import { Actions } from '../containers/PublicContainer';
import { Row, Col, Table } from "react-bootstrap";
import { SummaryState } from '../states/SummaryReducer';
import Const from '../common/const';
import { SpinnerModal } from '../common/SpinnerModal';
import "react-datepicker/dist/react-datepicker.css";
import { formatToPrice, formatDateYYYYMM, getUrlPrams } from '../common/utils';
import { useEffect } from 'react';
import { Msg } from '../common/Msg';
import btn_migi from '../image/migi.png';
import btn_hidari from '../image/hidari.png';

interface OwnProps {
  match: Match;
  location?: Location;
}
interface Match {
  params: Params;
}
interface Params {
  id: string;
}

type PublicProps = OwnProps & SummaryState & Actions;

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

export const PublicForm: React.FC<PublicProps> = (props: PublicProps) => {
  useEffect(() => {
    const prams: any = getUrlPrams();
    let month: string = "";
    if (props.isMonthChange) {
      month = props.month;
    }
    else if (prams["month"] && prams["month"].length === 6) {
      month = prams["month"];
      const dt = new Date(Number(month.slice(0, 4)), Number(month.slice(-2)), 1, 0, 0, 0);
      dt.setMonth(dt.getMonth() - 1);
      props.updateState(formatDateYYYYMM(dt), "month");
    }
    if (!props.istogetu) {
      props.onSammaryGet(Number(month.replace('-', '')), props.match.params.id);
    } else {
      props.updateState(false, "istogetu");
    }
    if (props.location !== undefined) {
      document.title = Const.TITELS.NORMAL;
    }
  }, [props.month])
  return (
    <div className={"FormRoot"} style={{ margin: "0 auto", width: "80%", maxWidth: "600px" }}>
      <SpinnerModal
        show={props.loading}
      />
      {props.isOpen &&
        <Row >
          <Col sm={12}>
            <h3>
              <img
                src={btn_hidari}
                style={{ width: '25px', marginRight: '25px', cursor: 'pointer' }}
                onClick={(e: any) => {
                  props.updateState(addMonth(props.month, -1), "month");
                  props.updateState(true, "isMonthChange");
                }}
              />
              {getFormatMonth(props.month)}
              <img
                src={btn_migi}
                style={{ width: '25px', marginLeft: '25px', cursor: 'pointer' }}
                onClick={(e: any) => {
                  props.updateState(addMonth(props.month, 1), "month");
                  props.updateState(true, "isMonthChange");
                }}
              />
            </h3>
          </Col>
        </Row>
      }
      <Msg
        info={props.isOpen && props.info}
        valid={!props.isOpen || props.valid}
        msg={props.isOpen ? props.msg : "現在このページは公開されていません。"}
      />
      {props.isOpen &&
        <React.Fragment>
          {props.isShunyu &&
            <Row>
              <Col sm={12}>
                <h3>収入：{formatToPrice(props.summary.shunyu)}</h3>
                {props.isShunyuCategory && <span>
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
                </span>}
              </Col>
            </Row>
          }
          {props.isShishutu &&
            <Row>
              <Col sm={12}>
                <h3>支出：{formatToPrice(props.summary.shishutu)}</h3>
                {props.isShishutuCategory && <span>
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
                </span>}
              </Col>
            </Row>
          }
        </React.Fragment>
      }
    </div>
  );
};