import React from "react";
import { Row, Col, Alert } from "react-bootstrap";

interface Props {
  info: boolean;
  valid: boolean;
  msg: string;
}

export const Msg: React.FC<Props> = (props: Props) => {

  return (
    <div>
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
    </div>
  );
};
