import React from "react";
import { Card } from "../../molecules/card/card.component";
import { activityContainer, container, summaryContainer } from "./contact-summary.style";

export default ({ contactDetailList, tasksList, onClickTask}) => {

  return (
    <div style={container}>
      <div style={summaryContainer}>
        <Card cardList={contactDetailList}/>
      </div>
    
      <div style={activityContainer}>
        <div style={{borderBottom: "1px solid grey", paddingBottom:"5px", fontWeight: "bold"}}>Recent Activities</div>

        <div>
          {tasksList?.map(task => (
            <div style={{borderBottom:"1px solid black", paddingBottom: "5px",marginTop: "30px"}} onClick={() => onClickTask(task.id)} key={task.id}>
              <div style={{textAlign: "initial", fontWeight: "bold"}}>
                {task.interactionType + " " + new Date(task.startTime).toLocaleString()}
              </div>
              <div style={{textAlign: "initial"}}>
                {task.id}
              </div>
              <div style={{display:"flex", justifyContent: "space-between"}}>
                <div>{task.interactionType} {task.direction}</div>
                <div>{task.startTime.substring(0,10)} {task.startTime.substring(11,16)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
