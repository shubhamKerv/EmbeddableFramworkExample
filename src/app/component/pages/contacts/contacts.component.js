import { useNavigate } from "react-router-dom";
import { MockedContacts } from "../../../../mock-db/mocked.contacts";
import contactsTemplate from "./contacts.template";

export const Contacts = () => {
  console.log("inside contacts component");
  const { columns, contacts } = MockedContacts;
  const navigate = useNavigate();
  
  const onClickContact = (rowDetail) => {
    console.log("clicked on contact", rowDetail.original);
    navigate("/contacts/" + rowDetail.original.id, { state: { contactId: rowDetail.original.id }});
  };
  
  return contactsTemplate({ columns, contacts, onClickContact });
};