import React from "react";

export default ({ interactions, onClickInteraction }) => {
  return (
    <div style={{margin: '6rem 2rem 0 2rem'}}>
      <div>
        {interactions?.map(interaction => (
          <div style={{borderBottom:"1px solid black", paddingBottom: "5px",marginTop: "30px"}} onClick={() => onClickInteraction(interaction.id)} key={interaction.id}>
            <div style={{textAlign: "initial", fontWeight: "bold"}}>
              {interaction.interactionType + " " + new Date(interaction.startTime).toLocaleString()}
            </div>
            <div style={{textAlign: "initial"}}>
              {interaction.id}
            </div>
            <div style={{display:"flex", justifyContent: "space-between"}}>
              <div>{interaction.interactionType} {interaction.direction}</div>
              <div>{interaction.startTime.substring(0,10)} {interaction.startTime.substring(11,16)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};