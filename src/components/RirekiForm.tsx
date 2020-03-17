import * as React from 'react';
import { Button, Row, Col, Alert, Table, Form, FormControl } from "react-bootstrap";
import { useEffect } from 'react';
import Const from '../common/const';
import Cookies from 'js-cookie';
import { ShushiState } from '../states/ShushiReducer';
import { Actions } from '../containers/RirekiContainer';
import { Dropdown } from 'react-bootstrap';
import { SpinnerModal } from '../common/SpinnerModal';
import Rireki from '../interface/Rireki';
import { formatToPrice, formatDate } from '../common/utils';
import { Br } from '../common/Br';
import Pagination from 'react-js-pagination';
import { SpinnerButton } from '../common/SpinnerButton';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type RirekiProps = OwnProps & ShushiState & Actions;

function renderTable(Rirekis: Rireki[],
  //deleter: (index: number) => void,
  //updater: (index: number) => void,
) {
  const rows = Rirekis.map((Rireki, index) =>
    <React.Fragment>
      <tr key={index}>
        <td>
          {Rireki.category == null ? '未分類' : Rireki.category.category_name}
          <Dropdown className="inline right">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: '100px' }}>
              編集/削除
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e: any) => {
                  //updater(index);
                }}
              >
                編集
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e: any) => {
                  //deleter(index);
                }}
              >
                削除
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        <td>
          {Rireki.hiduke}
        </td>
        <td>
          {Rireki.shushi_kbn == Const.INPUT_KBN.SHUNYU ? '収入' : Rireki.shushi_kbn == Const.INPUT_KBN.SISHUTU ? '支出' : '振替'}
        </td>
        <td align="right">
          {formatToPrice(Rireki.kingaku)}
        </td>
        <td>
          {Rireki.koza == null ? '口座未指定' : Rireki.koza.koza_name}
        </td>
      </tr>
    </React.Fragment>
  );

  return rows;
}

export const RirekiForm: React.FC<RirekiProps> = (props: RirekiProps) => {
  useEffect(() => {
    props.onRirekiGet(Cookies.get(Const.KEY_TOKEN) || '', null, 1);
    if (props.location !== undefined) {
      document.title = Const.TITELS.RIREKI;
    }
  }, [props.location.pathname])

  return (
    <div>
      {false && props.updater}
      <SpinnerModal
        show={props.loading}
      />
      <Row >
        <Col sm={12}>
          <h2>収支一覧</h2>
        </Col>
        <Col sm={12}>
          <Form inline>
            月を指定して再検索　
            <FormControl
              type="month"
              placeholder="月"
              className="mr-sm-2"
              value={String(props.month)}
              onChange={(e: any) => props.updateState(e.target.value, "month")}
            />
            {props.loading ?
              <SpinnerButton />
              :
              <Button
                variant="outline-success"
                onClick={(e: any) => props.onRirekiGet(Cookies.get(Const.KEY_TOKEN) || '', Number(props.month.replace('-', '')), 1)}
              >
                再検索
              </Button>
            }
          </Form>
        </Col>
      </Row>
      {props.valid &&
        <div>
          <Row>
            <Col sm={12}>
              <Alert
                variant={"danger"}
              >
                {props.msg}
              </Alert>
            </Col>
          </Row>
        </div>
      }
      {props.info &&
        <div>
          <Row>
            <Col sm={12}>
              <Alert
                variant={"success"}
              >
                {props.msg}
              </Alert>
            </Col>
          </Row>
        </div>
      }
      <Row>
        <Col sm={12}>
          <Table bordered hover responsive size="sm" className="Fixed" style={{ maxWidth: '600px', border: "0px" }}>
            <thead>
              <tr>
                <th>カテゴリ</th>
                <th>日付</th>
                <th>区分</th>
                <th>金額</th>
                <th>口座</th>
              </tr>
            </thead>
            <tbody>
              {
                props.rireki.length !== 0 ? renderTable(
                  props.rireki,
                  //props.onRirekiDelete,
                  //props.onInsert,
                )
                  : ""
              }
            </tbody>
          </Table>
          <Br count={1} />
          <Pagination
            activePage={props.pagerActive}
            itemsCountPerPage={Const.LIST_PAGER_PERPAGE}
            totalItemsCount={props.pagerTotalCount}
            pageRangeDisplayed={5}
            onChange={
              (e: any) => props.onRirekiGet(Cookies.get(Const.KEY_TOKEN) || '', null, e)
            }
            itemClass='page-item'
            linkClass='page-link'
          />
        </Col>
      </Row>
    </div>
  );
};