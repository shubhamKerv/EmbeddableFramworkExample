import React from "react";
import { iframeButton, iframeContainer } from "./iframe.style.js";
import { ReactComponent as ExpandIcon } from "../../../../assets/icons/expand.svg";
import { ReactComponent as CollapseIcon } from "../../../../assets/icons/collapse.svg";

export default ({ frameworkURL, showIFrame, setShowIFrame }) => {
    return (
        <div style={iframeContainer}>
            <div style={{ visibility: showIFrame ? 'visible' : 'hidden'}}>
                <iframe id="genesys" allow="camera *; microphone *" src={frameworkURL} frameBorder="0" height="450px"></iframe>
            </div>
            <button style={iframeButton} onClick={() => setShowIFrame(!showIFrame)}>
                <span style={{marginRight: "5px"}}>Genesys Framework</span>
                { showIFrame ? 
                    <ExpandIcon stroke="white" width="20px" height="20px" /> :
                    <CollapseIcon stroke="white" width="20px" height="20px" />
                }
            </button>
        </div>
    );
};