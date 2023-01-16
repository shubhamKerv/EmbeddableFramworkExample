import React from "react"
import { interactionWindowContainer } from "./interaction-window.style";

export default ({ frameworkURL }) => {
  return (
    <iframe id="genesysInteractionWindow" allow="camera *; microphone *" src={frameworkURL} frameBorder="0" height="450px" width="100%"></iframe>
  );
};