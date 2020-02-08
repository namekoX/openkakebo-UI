import React from "react";
import { Spinner, Button } from "react-bootstrap";

interface SpinnerButtonProps {
}

export const SpinnerButton: React.FC<SpinnerButtonProps> = (props: SpinnerButtonProps) => {
  return (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
  </Button>
  );
};
