import { useNavigate } from "react-router-dom";
import { MockedInteractions } from "../../../../mock-db/mocked-interaction";
import interactionsTemplate from "./interactions.template";

export const Interactions = () => {
  const interactions = MockedInteractions.getAllInteractions();
  const navigate = useNavigate();

  console.log("inside interactions", interactions);

  const onClickInteraction = (interactionId) => {
    navigate("/interactions/" + interactionId, { state: { interactionId: interactionId }});
  };

  return interactionsTemplate({ interactions, onClickInteraction });
};