import React from "react"
import { InteractionWindow } from "../../atoms/interaction-window/interaction-window.component";
import { ContactSummary } from "../../organism/contact-details-utilities/contact-summary.component";
import { Task } from "../../organism/task-utilities/task.component";
import { avatar, fullName, headerTab, interactionWindowContainer, mainContainer, summaryContainer, taskContainer } from "./contact-details.style";

export default ({ contactDetail, showChatTab, changeTab, showTab, onClickPhone, onClickSMS, onClickEmail, onClickTask, currentTaskId }) => {
  console.log(showTab);

  return (
    <div style={{margin: '6rem 2rem 50px 2rem'}}>
      <div style={{display: "flex", borderBottom: "1px solid black", paddingBottom:"1px"}}>
        <div style={headerTab(false, true)}>
          <div style={avatar}>
            {contactDetail.firstName[0]}{contactDetail.lastName[0]}
          </div>
          <h2 style={fullName}>
            {contactDetail.firstName} {contactDetail.lastName}
          </h2>
        </div>
        <div style={headerTab(showTab == 1)} onClick={() => changeTab(1)}>Contact Detail</div>
        {showChatTab && 
          <div style={headerTab(showTab == 2)} onClick={() => changeTab(2)}>Chat Widget</div>
        }
        {currentTaskId && (
          <div style={headerTab(showTab == 3)} onClick={() => changeTab(3)}>Interaction Task</div>
        )}
      </div>

      <div style={mainContainer}>
        {(showTab == 1) && (
          <ContactSummary contactDetail={contactDetail} onClickPhone={onClickPhone} onClickSMS={onClickSMS} onClickEmail={onClickEmail} onClickTask={onClickTask}/>
        )}
        
        {showChatTab && (
          <div style={interactionWindowContainer(showTab == 2)}>
            <InteractionWindow/>
          </div>
        )}
        
        {(showTab == 3) && (
          <Task taskId={currentTaskId} onClickPhone={onClickPhone}/>
        )}
      </div>
    </div>
  );
};