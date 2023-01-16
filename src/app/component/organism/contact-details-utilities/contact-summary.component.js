import { MockedInteractions } from "../../../../mock-db/mocked-interaction";
import contactSummaryTemplate from "./contact-summary.template";

export const ContactSummary = ({ contactDetail, onClickPhone, onClickSMS, onClickEmail, onClickTask }) => {
  const contactDetailList = [
    {
      title: "First Name",
      value: contactDetail.firstName
    },
    {
      title: "Last Name",
      value: contactDetail.lastName
    },
    {
      title: "Email",
      value: contactDetail.email,
      onClickValue: () => onClickEmail(contactDetail.email),
      valueStyle: { textDecoration: "underline 1px" }
    },
    {
      title: "Phone",
      value: contactDetail.phone,
      onClickValue: () => onClickPhone(contactDetail.phone),
      valueStyle: { textDecoration: "underline 1px" }
    },
    {
      title: "SMS",
      value: contactDetail.phone,
      onClickValue: () => onClickSMS(contactDetail.phone),
      valueStyle: { textDecoration: "underline 1px" }
    },
    {
      title: "Organization Name",
      value: contactDetail.organizationName
    },
    {
      title: "Job Title",
      value: "-----"
    },
    {
      title: "Address: Street",
      value: "-----"
    },
    {
      title: "Address: City",
      value: "-----"
    },
    {
      title: "Address: Country",
      value: "-----"
    }
  ];

  const tasksList = MockedInteractions.getAllInteractionsWithContactId(contactDetail.id);
  console.log(tasksList);
  
  return contactSummaryTemplate({ contactDetailList, tasksList, onClickTask });
};