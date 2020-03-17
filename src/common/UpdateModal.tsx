import React from "react";
import { Modal, Button, ListGroupItem, FormControl, InputGroup } from "react-bootstrap";
import { Br } from "./Br";

interface UpdateModalProps {
  show: boolean;
  title: string;
  description: string;
  placeholder: string;
  beforevalue:string;
  value: string;
  onUpdate: any;
  onHide: any;
}

export const UpdateModal: React.FC<UpdateModalProps> = (props: UpdateModalProps) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.description}
        <Br count={1} />
        <InputGroup className="mb-3 width90">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">変更前</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            disabled={true}
            value={props.beforevalue}
          />
        </InputGroup>
        <InputGroup className="mb-3 width90">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">変更後</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            maxLength={255}
            onChange={(e: any) => props.onUpdate(e.target.value, "modalAfterText")}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};
