import React from "react";
import { Modal, Button, ListGroupItem, FormControl } from "react-bootstrap";

interface InsertModalProps {
  show: boolean;
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onUpdate: any;
  onHide: any;
}

export const InsertModal: React.FC<InsertModalProps> = (props: InsertModalProps) => {
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
        <ListGroupItem>
          <FormControl
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            maxLength={255}
            onChange={(e: any) => props.onUpdate(e.target.value, "modalAfterText")}
          />
        </ListGroupItem>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};
