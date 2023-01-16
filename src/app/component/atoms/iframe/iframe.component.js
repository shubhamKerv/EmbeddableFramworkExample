import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MockedInteractions } from "../../../../mock-db/mocked-interaction";
import { MockedContacts } from "../../../../mock-db/mocked.contacts";
import { getEmailMessagesByUri, getEmailMessagesList } from "./iframe.service";
import iframeTemplate from "./iframe.template";

export const IFrame = () => {
  // Dynamically build the URL for the Embedded Softphone
  const frameworkURL = `https://apps.mypurecloud.ie/crm/embeddableFramework.html`;

  const [showIFrame, setShowIFrame] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const onMesssage = (event)=> {
      var message = JSON.parse(event.data);
      console.log("inside message event", message);

      if(message?.type == "processCallLog" && message?.data?.eventName === 'interactionChanged') {
        console.log("------interactionChanged-----screenPopOnConnect-----", message?.data?.interaction);

        const interaction = message?.data?.interaction;
        let searchVal = interaction.phone ? interaction.phone : "";

        if(interaction.isCallback) {
          searchVal = interaction.callbackNumbers[0];
        }

        // Check if E.164 ANI is used for searching and strip the 'tel:'
        if(searchVal.substring(0,4).toLowerCase().localeCompare("tel:") === 0){
          searchVal = searchVal.substring(4);
        }
        console.log("--search query---", searchVal);
        searchVal = decodeURIComponent(searchVal).toLowerCase();
    
        let results = MockedContacts.searchContact(searchVal, MockedContacts.contacts);
        console.log('==============================');
        console.log(results);

        if(results.length == 0) {
          console.log("-------------------No result found----------------");
        }
        else if(results.length == 1){
          let interactionPresent = MockedInteractions.getInteraction(interaction.id);
          
          console.log("JUST 1 contact found");
          console.log("--------getInteraction result -> interaction present or not ---------", interactionPresent);

          if(!interactionPresent && !interaction.isCallback) {
            let interactionType = "";
            if(interaction.isEmail) {
              interactionType = "Email";
            }
            else if(interaction.isMessage) {
              interactionType = "Message";
            }
            else {
              interactionType = "Call"
            }

            MockedInteractions.addInteraction({
              id: interaction.id,
              contactDetail: results[0],
              interactionType: interactionType,
              isCallback: interaction.isCallback,
              isEmail: interaction.isEmail,
              isMessage: interaction.isMessage,
              direction: interaction.direction,
              startTime: interaction.connectedTime,
              endTime: "",
              duration: "",
              queueName: interaction.queueName,
              state: interaction.state,
              recordingURL: 'https://apps.mypurecloud.ie/directory/#/engage/admin/interactions/' + interaction.id,
              description: interactionType + " " + interaction.direction + " from " + interaction.phone + "  - ConnectionId: " + interaction.id
            });
          }
          else if(interactionPresent && interaction.isCallback) {
            // Calback on answer
            console.log("--------");
            console.log("--------");
            console.log("--------Interaction present and it is a callback---------");
            console.log("--------");
            console.log("--------");

            interactionPresent.isCallback = true;
            interactionPresent.callbackNumbers = interaction.callbackNumbers;
            interactionPresent.connectedTime = interaction.connectedTime;
            interactionPresent.endTime = interaction.endTime;
            interactionPresent.duration = interaction.interactionDurationSeconds;
            interactionPresent.state = interaction.state;

            MockedInteractions.updateInteraction(interactionPresent);
          }

          navigate("/contacts/" + results[0].id, { state: { 
            contactId: results[0].id,
            chatInteraction: (interaction.isEmail || interaction.isMessage),
            taskId: interaction.id
          }});
        }
        else {
          console.log("-------------------Multiple Result found----------------", results);

          //below condition need to remove after attaching contact detail to message.
          if(interaction.isMessage) {
            console.log("--------Adding message interaction------------");
          
            const interactionPresent = MockedInteractions.getInteraction(interaction.id);

            if(!interactionPresent) {
              console.log("adding message interaction");
              // for adding message interaction without any contact, later need to remove it.
              MockedInteractions.addInteraction({
                id: interaction.id,
                contactDetail: "",
                interactionType: "Message",
                messageType: interaction.messageType,
                direction: interaction.direction,
                startTime: interaction.connectedTime,
                endTime: "",
                duration: "",
                queueName: interaction.queueName,
                recordingURL: 'https://apps.mypurecloud.ie/directory/#/engage/admin/interactions/' + interaction.id,
                description: "Message" + " " + interaction.direction + " from " + interaction.phone + "  - ConnectionId: " + interaction.id
              });
    
              navigate("/contacts/" + 14, { state: { 
                contactId: 14,
                chatInteraction: (interaction.isEmail || interaction.isMessage),
                taskId: interaction.id
              }});
            }
          }
        }
      }
      else if(message.type == "processCallLog" && message.data.eventName === 'openCallLog') {
        const interaction = message.data.interaction;
        console.log("------------------");
        console.log("------------------");
        console.log("-------Inside process callLog -> openCallLog-----------", message.data, message.interactionId);
        console.log("------------------");
        console.log("------------------");
        const updateInteraction = MockedInteractions.getInteraction(interaction.id);
        const callLog = message.data?.callLog;

        if(callLog?.id && updateInteraction) {
          if(updateInteraction.callLog?.id) {
            updateInteraction.callLog.notes.push({
              note: callLog.notes,
              time: new Date()
            })
          }
          else {
            updateInteraction.callLog = {
              id: callLog.id,
              notes: [{
                note: callLog.notes,
                time: new Date()
              }]
            }
          }
          MockedInteractions.updateInteraction(updateInteraction);
        }
      }
      else if(message.type == "processCallLog" && message.data.eventName === 'interactionDisconnected') {
        const interaction = message.data.interaction;
        console.log("------interactionDisconnected-----saveDetails in object-----", message.data.interaction);
        
        let updateInteraction = MockedInteractions.getInteraction(interaction.id);

        console.log("--------", updateInteraction);
        
        if(updateInteraction) {
          updateInteraction.endTime = interaction.endTime;
          updateInteraction.duration = interaction.interactionDurationSeconds;
          updateInteraction.state = interaction.state;
          
          if(updateInteraction.interactionType == "Email") {
            console.log("--------after disconnect interaction type is email------------");
            // Call the Framework to request the transcript
            document.getElementById("genesys").contentWindow.postMessage(JSON.stringify({
              type: 'getTranscript',
              data: {
                  'interactionId': interaction.id
              }
            }), "*");

            getEmailMessagesList(interaction.id)
              .then(emailObject => {
                console.log("--------response emailObject------------", emailObject);
                updateInteraction.emailEntities = [];
                
                if(emailObject.entities.length > 0) {
                  emailObject.entities.forEach(entity => {
                    console.log("-------calling entity selfUri-----", entity.selfUri);
                    getEmailMessagesByUri(entity.selfUri)
                      .then(messageObject => {
                        console.log("--------response messageObject------------", messageObject)
                        
                        if(messageObject) {
                          console.log("--------inside if messageObject------------", messageObject)
                          updateInteraction.emailEntities.push(messageObject);
                        }

                        console.log("saving updates");
                        MockedInteractions.updateInteraction(updateInteraction); 
                      })
                  });

                  console.log("ending part of message object, adding updates");
                } 

                console.log("ending part of email object");
              });
          }
          else if(updateInteraction.interactionType == "Message") {
            // Call the Framework to request the transcript
            document.getElementById("genesys").contentWindow.postMessage(JSON.stringify({
              type: 'getTranscript',
              data: {
                  'interactionId': interaction.id
              }
            }), "*");
            
            MockedInteractions.updateInteraction(updateInteraction);  
          }
          else {
            MockedInteractions.updateInteraction(updateInteraction);  
          }      
        }
      }
      else if(message.type == "chatTranscript") {
        console.log("------------------");
        console.log("------------------");
        console.log("-------Inside chat transcript-----------", message.data, message.interactionId);
        console.log("------------------");
        console.log("------------------");

        let updateInteraction = MockedInteractions.getInteraction(message.interactionId);
        const newMessages = message.data.messages;

        console.log("--------------", updateInteraction);
        if(updateInteraction && newMessages.length > 0) {
          console.log("=========updating messages==========");
          updateInteraction.messages = newMessages;
          
          MockedInteractions.updateInteraction(updateInteraction);
        }
      }
      else if(message.type == "interactionSubscription" && message.data.category == "acw") {
        console.log("------------------");
        console.log("------------------");
        console.log("-------After call wrapup-----------", message.data, message.data.interaction);
        console.log("------------------");
        console.log("------------------");
        
        const interaction = message.data.interaction;
        let updateInteraction = MockedInteractions.getInteraction(interaction.id);

        console.log("--------", updateInteraction);
        if(updateInteraction) {
          updateInteraction.disposition = interaction.disposition;
          updateInteraction.dispositionDuration = interaction.dispositionDurationSeconds;
          
          MockedInteractions.updateInteraction(updateInteraction);
        }
      }
      else if(message.type == "notificationSubscription" && message.data.category == "messageUpdate") {
        console.log("------------------");
        console.log("------------------");
        console.log("-------Message Update-----------", message.data, message.data.interaction.id, message.data.interaction.messages);
        console.log("------------------");
        console.log("------------------");

        // let updateInteraction = MockedInteractions.getInteraction(message.data.interaction.id);
        // const newMessages = message.data.interaction.messages;

        // console.log("--------------", updateInteraction);
        // if(updateInteraction && newMessages.length > 0) {
        //   console.log("===================");
        //   const previousMessagesCount = updateInteraction.messages?.length;

        //   if(!updateInteraction.messages || previousMessagesCount == 0) {
        //     console.log("======= no previous msgs ============");
        //     updateInteraction.messages = newMessages;
        //   }
        //   else {
        //     console.log("======= previous msgs presents ============");

        //     const lastMessageIndex = newMessages.findIndex(message => message.id == updateInteraction.messages[previousMessagesCount-1])
            
        //     if(lastMessageIndex == -1) {
        //       updateInteraction.messages.push(...newMessages);
        //     }
        //     else if(lastMessageIndex == newMessages.length - 1) {
        //       updateInteraction.messages.push(...newMessages.slice(lastMessageIndex+1, newMessages.length));
        //     }
        //   }
          
        //   MockedInteractions.updateInteraction(updateInteraction);
        // }
      }
      else if(message.type == "notificationSubscription" && message.data.category == "interactionSelection") {
        console.log("------------------");
        console.log("------------------");
        console.log("------------------");
        console.log("------------------");
        console.log("-------Interaction Selection-----------", message.data);
        console.log("------------------");
        console.log("------------------");
        console.log("------------------");
        console.log("------------------");  
        
        const interactionPresent = MockedInteractions.getInteraction(message.data.interaction.interactionId);
        console.log("------------------");
        console.log("------------------");
        console.log("------------------");  
        console.log("-------Selected Interaction Detail-----------", interactionPresent);

        if(interactionPresent) {
          console.log("-------Selected Interaction present-----------", interactionPresent);

          if(interactionPresent.contactDetail) {
            navigate("/contacts/" + interactionPresent.contactDetail.id, { state: { 
              contactId: interactionPresent.contactDetail.id,
              chatInteraction: (interactionPresent.isEmail || interactionPresent.isMessage),
              taskId: interactionPresent.id
            }});  
          }
          else {
            navigate("/contacts/" + 14, { state: { 
              contactId: 14,
              chatInteraction: (interactionPresent.isEmail || interactionPresent.isMessage),
              taskId: interactionPresent.id
            }});
          }
        }    
      }
      else if(message.type == "setAuthToken") {
        localStorage.setItem("AuthToken", JSON.stringify(message.data.token));
        const x = JSON.parse(localStorage.getItem("AuthToken"));
        console.log(x);
        
        const headerContent = { headers: {'Authorization': `bearer ${x}`}};
        console.log(headerContent)
      }
      
    };

    window.addEventListener("message", onMesssage);
    return () => {
      window.removeEventListener("message", onMesssage);
    }
  }, []);

  
  return iframeTemplate({ frameworkURL, showIFrame, setShowIFrame });
};
