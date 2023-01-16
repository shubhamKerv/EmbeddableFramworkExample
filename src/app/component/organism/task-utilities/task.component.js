import { useEffect, useState } from "react";
import { MockedInteractions } from "../../../../mock-db/mocked-interaction";
import taskTemplate from "./task.template";

export const Task = ({ taskId, onClickPhone }) => {
  const [mainInfoList, setMainInfoList] = useState([]);
  const [timeInfoList, setTimeInfoList] = useState([]);
  const [interactionInfoList, setInteractionInfoList] = useState([]);
  const [wrapupList, setWrapupList] = useState([]);
  const [callLogList, setCallLogList] = useState([]);
  const [emailConversation, setEmailConversation] = useState([]);
  const [messageList, setMessageList] = useState([]);
  console.log("--------Task-----", taskId);
  
  useEffect(() => {
    console.log("--------Task useEffect-----", taskId);

    const taskDetail = MockedInteractions.getInteraction(taskId);
    console.log("--------Task-----", taskDetail, taskDetail.startTime.toLocaleString(), taskDetail.startTime);
    if(taskId) {
      setMainInfoList([
        {
          title: "Subject",
          value: taskDetail.interactionType + " " + new Date(taskDetail.startTime).toLocaleString()
        },
        {
          title: "Interaction ID",
          value: taskDetail.id 
        },
        {
          title: taskDetail.interactionType + " " + (taskDetail.direction == "Inbound" ? "From" : "To"),
          value: taskDetail.contactDetail.firstName + " " + taskDetail.contactDetail.lastName
        },
        {
          title: taskDetail.interactionType == "Call" ? "Phone" : "Email",
          value: taskDetail.interactionType == "Call" ? taskDetail.contactDetail.phone : taskDetail.contactDetail.email,
          ...(taskDetail.interactionType == "Email") && {onClickValue: () => onClickPhone(taskDetail.phone)},
          valueStyle: { textDecoration: "underline 1px" }
        },
        {
          title: "Direction",
          value: taskDetail.direction
        },
        {
          title: "Interaction Type",
          value: taskDetail.interactionType
        }
      ]);
      setTimeInfoList([
        {
          title: "Start Time",
          value: taskDetail.startTime
        },
        {
          title: "End Time",
          value: taskDetail.endTime
        },
        {
          title: "Duration",
          value: taskDetail.duration
        }
      ]);
      setWrapupList([
        {
          title: "Wrap-up Code",
          value: taskDetail.disposition || "------"
        },
        {
          title: "Wrap-up Duration",
          value: taskDetail.dispositionDuration || "------"
        }
      ]);
      setInteractionInfoList([
        {
          title: "Interaction URL",
          value: <a style={{display: "table-cell"}} href={taskDetail.recordingURL} target="_blank">{taskDetail.recordingURL}</a> 
        }
      ]);
      if(taskDetail.callLog?.id) {
        setCallLogList([
          {
            title: "Call Log Details"
          },
          {
            title: "Log ID",
            value: taskDetail.callLog.id
          },
          ...taskDetail.callLog.notes.map(note => ({value: note.note}))
        ]);
      }
      if(taskDetail.emailEntities) {
        // we need to sort emails with time
        setEmailConversation(taskDetail.emailEntities);
      }
      if(taskDetail.messages) {
        setMessageList(taskDetail.messages);
      }

      console.log(callLogList);

    }
  }, [taskId]);

  return taskTemplate({ mainInfoList, timeInfoList, interactionInfoList, wrapupList, callLogList, emailConversation, messageList });
};