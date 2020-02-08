import React from "react";

interface BrProps { 
  count:Number;
}

export const Br : React.FC<BrProps> = (props: BrProps) => {
  const newLineText = [];
  for (let i = 0; i < props.count; i += 1) {
    newLineText.push("\n");
  }

  return (
    <div style={{whiteSpace: 'pre-line'}}>
      {newLineText}
    </div>
  );
};
