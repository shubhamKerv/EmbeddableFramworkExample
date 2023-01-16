import { MockedInteractions } from "../../../../mock-db/mocked-interaction";
import { MockedContacts } from "../../../../mock-db/mocked.contacts";
import homeTemplate from "./home.template";

export const Home = () => {
    console.log("inside Home component");

    const searchContact = () => {
      const searchResult = MockedContacts.searchContact("Shubham", MockedContacts.contacts);
      console.log(searchResult);
    };

    const getInteraction = () => {
      const interaction  = MockedInteractions.getInteraction("e7edbabf-265c-4006-98da-a441acad015e");
      console.log("asssss", interaction);
    };
    
    const getAllInteractions = () => {
      let interactions = MockedInteractions.getAllInteractions();
      console.log("asssss", interactions);
    };

    const getAllInteractionsWithContactId = () => {
      const interaction  = MockedInteractions.getAllInteractionsWithContactId(14);
      console.log("asssss", interaction);
    };

    const addInteraction = () => {
      MockedInteractions.addInteraction({
        id: "e7edbabf-265c-4006-98da-a441acad015e",
        contactDetail: {
          id: 12,
          firstName: "Gareth",
          lastName: "Taylor",
          email: "john.taylor@gmail.com",
          phone: "+441224978698",
          organizationName: "Kerv Experiance"
        },
        interactionType: "Call",
        direction: "Incoming",
        startTime: '11/15/2022, 12:46:00 AM',
        endTime: "",
        duration: "",
        queueName: "--------",
        recordingURL: 'https://apps.mypurecloud.ie/directory/#/engage/admin/interactions/' + "e7edbabf-265c-4006-98da-a441acad015e",
        description: "Call Inbound from +441224978657 - ConnectionId: e7edbabf-265c-4006-98da-a441acad015e"
      });
    };

    const updateInteraction = () => {
      MockedInteractions.updateInteraction({
        id: "e7edbabf-265c-4006-98da-a441acad015e",
        contactDetail: {
          id: 12,
          firstName: "Gareth",
          lastName: "Taylor",
          email: "john.taylor@gmail.com",
          phone: "+441224978698",
          organizationName: "Kerv Experiance"
        },
        interactionType: "Call",
        direction: "Incoming",
        startTime: '11/15/2022, 12:46:00 AM',
        endTime: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        duration: "dddddddddddddddddddd",
        queueName: "--------",
        recordingURL: 'https://apps.mypurecloud.ie/directory/#/engage/admin/interactions/' + "e7edbabf-265c-4006-98da-a441acad015e",
        description: "Call Inbound from +441224978657 - ConnectionId: e7edbabf-265c-4006-98da-a441acad015e"
      });
    };

    const removeInteractionById = () => {
      MockedInteractions.removeInteractionById("cbef7950-b2f7-438f-bd9d-1b863ec94ba5");
    }

    const removeInteractionByContactId = () => {
      MockedInteractions.removeInteractionByContactId(12);
    }

    const removeAllInteraction = () => {
      // MockedInteractions.removeAllInteraction();

      fetch("https://localhost:44378/api/test", {
          // Adding method type
          method: "POST",
          // Adding body or contents to send
          body: JSON.stringify({
              title: "foo",
              body: "bar",
              userId: 1
          }),
          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-Custom-Header": "application/json; charset=UTF-8"
          }
      })
      .then(response => response.json())
      .then(json => console.log(json));
    } 

    async function setAuthToken () {
      // document.getElementById("genesys").contentWindow.postMessage(JSON.stringify({
      //   type: 'getAuthToken'
      // }), "*");

      let url = 'https://localhost:44378/api/test';
        console.log(url);
        try {
            let res = await fetch(url)
                            .then((response) => response.json())
                            .then((data) => console.log(data));
            
        } catch (error) {
            console.log(error);
        }
    };

    return homeTemplate({ searchContact, getInteraction, getAllInteractions, addInteraction, updateInteraction, getAllInteractionsWithContactId, removeInteractionById, removeInteractionByContactId, removeAllInteraction, setAuthToken });
};