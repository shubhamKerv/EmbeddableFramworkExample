import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MockedContacts } from "../../../../mock-db/mocked.contacts";
import contactDetailsTemplate from "./contact-details.template";

export const ContactDetails = (params) => {
  // variables
  let { contactId, chatInteraction, taskId } = useLocation()?.state;
  const [currentTaskId, setCurrentTaskId] = useState(taskId);
  //const [showChatTab, setShowChatTab] = useState(chatInteraction);
  const [showChatTab, setShowChatTab] = useState(true);
  const [showTab, setShowTab] = useState(chatInteraction ? 2 : 1);

  const contactDetail = MockedContacts.contacts.filter((contact) => contact.id === contactId)[0];

  console.log(contactId, chatInteraction, taskId);
  console.log("inside contact detail page", contactId, params);

  // events
  const changeTab = (tab) => {
    console.log("changeTab", tab);
    if(tab == 1) setShowTab(1);
    else if(tab == 2) setShowTab(2);
    else setShowTab(3);
  };

  const onClickPhone = (phoneNumber) => {
    console.log("-------clickToDial-----call --", phoneNumber);
    document.getElementById("genesys").contentWindow.postMessage(JSON.stringify({
        type: 'clickToDial',
        data: { number: phoneNumber, autoPlace: true, attributes: {example_URLPop: "https://www.genesys.com"} }
    }), "*");
  };

  const onClickSMS = (phoneNumber) => {
    console.log("-------clickToDial-----sms --", phoneNumber);
    document.getElementById("genesys").contentWindow.postMessage(JSON.stringify({
        type: 'clickToDial',
        data: { number: phoneNumber, type: "sms", autoPlace: true }
    }), "*");
  };
  
  const onClickEmail = (emailAddress) => {
    console.log("-------clickToDial------email-------", emailAddress);
    document.getElementById("genesys").contentWindow.postMessage(JSON.stringify({
        type: 'clickToDial',
        data: { address: emailAddress, type: "email", autoPlace: true, attributes: {example_URLPop: "https://www.genesys.com"} }
    }), "*");
  };

  const onClickTask = (selectedTaskId) => {
    console.log("open interaction", taskId);
    setCurrentTaskId(selectedTaskId);
    changeTab(3);
  };

  // hooks
  useEffect(() => {
    //setShowChatTab(chatInteraction);
    setShowTab(chatInteraction ? 2 : 1);
  }, [chatInteraction]);

  useEffect(() => {
    setCurrentTaskId(taskId);
  }, [taskId]);

  console.log("-----------------", contactDetail, currentTaskId);
  
  return contactDetailsTemplate({ contactDetail, showChatTab, changeTab, showTab, onClickPhone, onClickSMS, onClickEmail, onClickTask, currentTaskId });
};