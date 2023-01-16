import axios from 'axios';

export async function getEmailMessagesList (interactionId) {
  const baseUrl = `https://api.mypurecloud.ie`;
  const authToken = JSON.parse(localStorage.getItem("AuthToken"));
  const headerContent = { headers: {'Authorization': `bearer ${authToken}`}};
  const url = baseUrl + `/api/v2/conversations/emails/${interactionId}/messages`;
  
  try{
    const response = await axios.get(url, headerContent);
    console.log("---------response of api--------", response);
    return response.data;
  }
  catch(error) {
    console.log("-------error in api call------", error);
    return "";
  }
}

export async function getEmailMessagesByUri (selfUri) {
  const baseUrl = `https://api.mypurecloud.ie`;
  const authToken = JSON.parse(localStorage.getItem("AuthToken"));
  const headerContent = { headers: {'Authorization': `bearer ${authToken}`}};
  
  try{
    const response = await axios.get(baseUrl + selfUri, headerContent);
    console.log("---------response of api--------", response);
    return response.data;
  }
  catch(error) {
    console.log("-------error in api call------", error);
    return "";
  }
}