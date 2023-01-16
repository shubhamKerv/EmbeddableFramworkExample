import cardTemplate from "./card.template";

export const Card = ({ cardList }) => {
  console.log(cardList);
  
  return cardTemplate({ cardList });
};