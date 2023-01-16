import React from "react";
import { container, rowContent, rowTitle, rowValue } from "./card.style";

export default ({ cardList }) => {

  return (
    <div style={container}>
      {cardList.map((card, index) => {
        return (
          <div style={rowContent} key={index}>
            {card.title && (
              <div style={rowTitle}>
                {card.title}
              </div>
            )}
            <div style={rowValue(card.valueStyle)} onClick={card.onClickValue}>
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};