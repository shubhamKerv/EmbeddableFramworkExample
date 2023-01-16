import React from "react";
import { Card } from "../../molecules/card/card.component";
import { mainContainer, leftContainer, rightContainer, descriptionContainer, upperContainer, lowerContainer, emailContainer, conversationContainer } from "./task.style";

export default ({ mainInfoList, timeInfoList, interactionInfoList, wrapupList, callLogList, emailConversation, messageList }) => {

  return (
    <div style={mainContainer}>
      <div style={upperContainer}>
        <div style={leftContainer}>
          <Card cardList={mainInfoList} />
          <Card cardList={interactionInfoList} />
        </div>

        <div style={rightContainer}>
          <Card cardList={timeInfoList} />
          <Card cardList={wrapupList} />
          {callLogList?.length > 0 && (
            <Card cardList={callLogList} />
          )}
        </div>
      </div>
      
      {emailConversation.length > 0 && (
        <div style={lowerContainer}>
          <div style={{textAlign: "center", borderBottom: "1px solid grey", paddingBottom:"5px"}}>
            <span style={{fontWeight: "bold", fontSize: "18px"}} >Email Transcript</span>
          </div>

          {emailConversation.map(email => (
            <div style={emailContainer}>
              {/* box for interanl participants */}
              
              <div style={conversationContainer}>
                <div style={{display: "flex"}}>
                  {/* add icon to show/hide content */}
                  <div style={{width: "100%"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div style={{fontWeight: "bold"}}>{email.subject}</div>
                      <div>{email.time}</div>
                    </div>
                    <div style={{marginTop:"5px"}}>
                      <div style={{display: "flex"}}>
                        <span>To: </span>
                        {email.to.map(to => (
                          <span>{to.email}</span>
                        ))}
                      </div>
                      <div style={{display: "flex"}}>
                        <span>From: </span>
                        <span>{email.from.email}</span>
                      </div>
                      <div style={{margin:"10px", borderLeft: "1px solid grey", paddingLeft:"10px"}}>
                        {email.textBody}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* box for interanl participants */}
            </div>
          ))}
        </div>
      )}

      {messageList.length > 0 && (
        <div style={lowerContainer}>
          <div style={{textAlign: "center", borderBottom: "1px solid grey", paddingBottom:"5px"}}>
            <span style={{fontWeight: "bold", fontSize: "18px"}} >Message Transcript</span>
          </div>

          {messageList.map(message => (
            <div style={{ margin:"30px 0px"}}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold", fontSize: "16px"}} >{message.role}</span> 
                <span style={{ }} >{message.time}</span>
              </div>

              <span style={{}} >{message.body}</span>
            </div>
          ))}
        </div>
      )}
    
    </div>
  );
};