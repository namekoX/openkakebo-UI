import React from "react";
import { Modal, Button, FormControl, InputGroup, Form } from "react-bootstrap";
import { Br } from "../common/Br";
import Koza from "../interface/Koza";
import { getChkValue, getChkBool } from "../common/utils";

interface KozaModalProps {
  show: boolean;
  index: number | null;
  koza: Koza;
  onUpdate: any;
  onHide: any;
  kozas: Koza[];
}

function renderOptions() {
  const options = new Array(28).fill(1).map((n, i) => n + i).map((index) =>
    <React.Fragment>
      <option value={index}>{index}</option>
    </React.Fragment>
  );
  return options;
}

function renderKozaOptions(kozas: Koza[], ignore: number | null) {
  const options = kozas.map((koza, index) =>
    index == ignore ? "" : <React.Fragment><option value={index}>{koza.koza_name}</option></React.Fragment>
  );
  return options;
}

export const KozaModal: React.FC<KozaModalProps> = (props: KozaModalProps) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          口座編集
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        口座情報を入力してください
        <Br count={1} />
        <InputGroup className="mb-3 width90">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">口座名</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="口座名"
            value={props.koza.koza_name}
            maxLength={255}
            onChange={(e: any) => props.onUpdate(e.target.value, "koza_name", props.index)}
          />
        </InputGroup>
        <InputGroup className="mb-3 width90">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">残高</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            placeholder="残高"
            value={String(props.koza.zandaka)}
            maxLength={15}
            onChange={(e: any) => props.onUpdate(e.target.value, "zandaka", props.index)}
          />
        </InputGroup>
        <InputGroup className="mb-3 width90">
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="クレジットカード"
              checked={getChkBool(Number(props.koza.is_credit))}
              onChange={(e: any) => props.onUpdate(String(getChkValue(e.target.checked)), "is_credit", props.index)}
            />
          </Form.Group>
        </InputGroup>
        {getChkBool(Number(props.koza.is_credit)) &&
          <div>
            <InputGroup className="mb-3 width90">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">引き落とし日</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="select"
                value={String(props.koza.credit_date)}
                onChange={(e: any) => {
                  props.onUpdate(e.target.value, "credit_date", props.index)
                }}
              >
                {
                  renderOptions()
                }
              </FormControl>
            </InputGroup>
            <InputGroup className="mb-3 width90">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">引き落とし先口座</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="select"
                onChange={(e: any) => {
                  props.onUpdate(e.target.value, "credit_koza_id", props.index)
                }}
              >
                {
                  renderKozaOptions(props.kozas, props.index)
                }
              </FormControl>
            </InputGroup>
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};
