import * as React from 'react';
import { Button, Row, Col, Alert, Table, Form } from "react-bootstrap";
import { useEffect } from 'react';
import Const from '../common/const';
import Cookies from 'js-cookie';
import { ShushiState } from '../states/ShushiReducer';
import { Actions } from '../containers/CategoryContainer';
import Category from '../interface/Category';
import { Dropdown } from 'react-bootstrap';
import { SpinnerModal } from '../common/SpinnerModal';
import { Br } from '../common/Br';
import { InsertModal } from '../common/InsertModal';
import { UpdateModal } from '../common/UpdateModal';

interface OwnProps {
  location: Location;
}
interface Location {
  pathname: string;
}

type CategoryProps = OwnProps & ShushiState & Actions;

function renderTable(categories: Category[],
  deleter: (index: number, kbn: string, subindex: number | null) => void,
  inserter: (index: number, kbn: string) => void,
  updater: (index: number, subindex: number | null, before: string) => void,
  kbn: string) {
  const rows = categories.map((category, index) =>
    <React.Fragment>
      <tr key={index}>
        <td rowSpan={
          category.subcategory.length == 0 ? 1 : category.subcategory.length + 1
        }>
          {category.category_name}
          <Dropdown className="inline right">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: '100px' }}>
              追加/編集/削除
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e: any) => {
                  inserter(index, '詳細');
                }}
              >
                追加
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e: any) => {
                  updater(index, null, category.category_name);
                }}
              >
                編集
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e: any) => {
                  deleter(index, kbn, null);
                }}
              >
                削除
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      {
        category.subcategory.map((sub, subindex) =>
          <tr key={subindex}>
            <td>
              {sub.subcategory_name}
              <Dropdown className="inline right">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: '100px' }}>
                  編集/削除
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e: any) => {
                      updater(index, subindex, sub.subcategory_name);
                    }}
                  >
                    編集
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e: any) => {
                      deleter(index, kbn, subindex);
                    }}
                  >
                    削除
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>)
      }
    </React.Fragment>
  );

  return rows;
}

export const CategoryForm: React.FC<CategoryProps> = (props: CategoryProps) => {
  useEffect(() => {
    const kbn = props.location.pathname == Const.SITE_ROOT + '/category/shunyu' ? Const.CATEGORY_KBN.SHUNYU : Const.CATEGORY_KBN.SISHUTU;
    props.onCategoryGet(kbn, Cookies.get(Const.KEY_TOKEN) || '');
    if (props.location !== undefined) {
      document.title = Const.TITELS.CATEGORY;
    }
  }, [props.location.pathname])

  return (
    <div className={"FormRoot"} >
      {false && props.updater}
      <SpinnerModal
        show={props.loading}
      />
      <InsertModal
        show={props.isInsertModalOpen}
        title={props.modalTitle}
        description={props.modalDescription}
        placeholder={props.modalPlaceholder}
        value={props.modalAfterText}
        onUpdate={props.updateState}
        onHide={function onHide() {
          props.onCategoryModalInsert();
        }}
      />
      <UpdateModal
        show={props.isUpdateModalOpen}
        title={props.modalTitle}
        description={props.modalDescription}
        placeholder={props.modalPlaceholder}
        value={props.modalAfterText}
        beforevalue={props.modalBeforeText}
        onUpdate={props.updateState}
        onHide={function onHide() {
          props.onCategoryModalUpdate();
        }}
      />
      <Row >
        <Col sm={3}>
          <h2>{props.categoryKbn == Const.CATEGORY_KBN.SISHUTU ? "支出" : "収入"}カテゴリ一覧</h2>
        </Col>
        <Col sm={9}>
          <Form inline>
            <Button
              variant="primary"
              onClick={(e: any) => props.onCategorySave(props.categoryKbn
                , Cookies.get(Const.KEY_TOKEN) || ''
                , props.categoryKbn == Const.CATEGORY_KBN.SISHUTU ? props.shishutuCategory || null : props.shunyuCategory || null)}
            >
              保存
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Br count={1} />
          <Button
            variant="secondary"
            onClick={(e: any) => {
              props.onCategoryInsert(0, 'カテゴリ');
            }}
          >
            カテゴリ追加
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
                <th>カテゴリ</th>
                <th>詳細</th>
              </tr>
            </thead>
            <tbody>
              {
                props.categoryKbn == Const.CATEGORY_KBN.SHUNYU ?
                  props.shunyuCategory !== undefined ? renderTable(
                    props.shunyuCategory,
                    props.onCategoryDelete,
                    props.onCategoryInsert,
                    props.onCategoryUpdate,
                    props.categoryKbn
                  )
                    : "" :
                  props.shishutuCategory !== undefined ? renderTable(
                    props.shishutuCategory,
                    props.onCategoryDelete,
                    props.onCategoryInsert,
                    props.onCategoryUpdate,
                    props.categoryKbn)
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
              onClick={(e: any) => props.onCategorySave(props.categoryKbn
                , Cookies.get(Const.KEY_TOKEN) || ''
                , props.categoryKbn == Const.CATEGORY_KBN.SISHUTU ? props.shishutuCategory || null : props.shunyuCategory || null)}
            >
              保存
          </Button>
        </Col>
      </Row>
    </div>
  );
};