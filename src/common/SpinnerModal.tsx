import React from "react";
import { Modal, Spinner } from "react-bootstrap";

interface SpinnerModalProps {
  show: boolean;
}

export const SpinnerModal: React.FC<SpinnerModalProps> = (props: SpinnerModalProps) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
          <div><Spinner animation="border" />Loading...</div>
      </Modal.Body>
    </Modal>
  );
};
