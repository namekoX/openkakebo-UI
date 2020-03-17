import * as React from 'react';
import { Button, Row, Col, Alert, Table, Form } from "react-bootstrap";
import { useEffect } from 'react';
import Const from '../common/const';
import Cookies from 'js-cookie';
import { ShushiState } from '../states/ShushiReducer';
import { Actions } from '../containers/KozaContainer';
import { Dropdown } from 'react-bootstrap';
import { SpinnerModal } from '../common/SpinnerModal';
import { Br } from '../common/Br';
import Koza from '../interface/Koza';
import { formatToPrice } from '../common/utils';
import { KozaModal } from './KozaModal';
import { getBsProps } from 'react-bootstrap/lib/utils/bootstrapUtils';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type KozaProps = OwnProps & ShushiState & Actions;

const newkoza: Koza = {
  id: null,
  user_id: 0,
  koza_name: "",
  zandaka: 0,
  is_credit: "0",
  credit_date: null,
  credit_koza_id: null,
}

function renderTable(kozas: Koza[],
  deleter: (index: number) => void,
  updater: (index: number) => void,
) {
  const rows = kozas.map((koza, index) =>
    <React.Fragment>
      <tr key={index}>
        <td>
          {koza.koza_name}
          <Dropdown className="inline right">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: '100px' }}>
              編集/削除
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e: any) => {
                  updater(index);
                }}
              >
                編集
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e: any) => {
                  deleter(index);
                }}
              >
                削除
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        <td align="right">
          {formatToPrice(koza.zandaka)}
        </td>
        <td>
          {koza.is_credit == "1" ? "クレジットカード" : ""}
        </td>
      </tr>
    </React.Fragment>
  );

  return rows;
}

export const KozaForm: React.FC<KozaProps> = (props: KozaProps) => {
  useEffect(() => {
    props.onKozaGet(Cookies.get(Const.KEY_TOKEN) || '');
    if (props.location !== undefined) {
      document.title = Const.TITELS.KOZA;
    }
  }, [props.location.pathname])

  return (
    <div>
      {false && props.updater}
      <SpinnerModal
        show={props.loading}
      />{
        <KozaModal
          show={props.isInsertModalOpen}
          index={props.modalIndex}
          koza={
            (props.koza !== undefined && props.koza.length - 1 >= props.modalIndex) ? props.koza[props.modalIndex] : newkoza
          }
          onUpdate={props.updateKoza}
          onHide={function onHide() {
            props.onHide();
          }}
          kozas={props.koza !== undefined ? props.koza : []}
        />}
      <Row >
        <Col sm={3}>
          <h2>口座一覧</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Br count={1} />
          <Button
            variant="secondary"
            onClick={(e: any) => {
              props.onInsert(props.koza!.length);
            }}
          >
            口座追加
          </Button>
          <Br count={1} />
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
                <th>口座</th>
                <th>残高</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {
                props.koza !== undefined ? renderTable(
                  props.koza,
                  props.onKozaDelete,
                  props.onInsert,
                )
                  : ""
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Button
            variant="primary"
            onClick={(e: any) => props.onKozaSave(
              Cookies.get(Const.KEY_TOKEN) || ''
              , props.koza || null)}
          >
            保存
          </Button>
        </Col>
      </Row>
    </div>
  );
};