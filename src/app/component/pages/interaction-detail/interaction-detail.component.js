import { useLocation } from "react-router-dom";
import interactionDetailTemplate from "./interaction-detail.template";

export const InteractionDetail = () => {
  const { interactionId } = useLocation()?.state;

  const onClickPhone = (phoneNumber) => {
    console.log("-------clickToDial-----call --", phoneNumber);
    document.getElementById("genesys").contentWindow.postMessage(JSON.stringify({
        type: 'clickToDial',
        data: { number: phoneNumber, autoPlace: true, attributes: {example_URLPop: "https://www.genesys.com"} }
    }), "*");
  };

  return interactionDetailTemplate({ interactionId, onClickPhone });
};