export const MockedContacts = {
  columns: [
    {
      Header: "First Name",
      accessor: "firstName"
    },
    {
      Header: "Last Name",
      accessor: "lastName"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone",
      accessor: "phone"
    },
    {
      Header: "Organization Name",
      accessor: "organizationName"
    },
  ],

  contacts: [
    {
      id: 12,
      firstName: "Gareth",
      lastName: "Taylor",
      email: "john.taylor@gmail.com",
      phone: "+441224978698",
      organizationName: "Kerv Experiance"
    },
    {
      id: 13,
      firstName: "Jason",
      lastName: "Gardner",
      email: "jason.gardner@gmail.com",
      phone: "+441224978697",
      organizationName: "Kerv Digital"
    },
    {
      id: 17,
      firstName: "Manjunath",
      lastName: "PR",
      email: "manjunath.pr@gmail.com",
      phone: "+441224978601",
      organizationName: "Kerv Experiance"
    },
    {
      id: 14,
      firstName: "Stephen",
      lastName: "Connor",
      email: "stephen.connor@gmail.com",
      phone: "+441224978657",
      organizationName: "Kerv Digital"
    },
    {
      id: 15,
      firstName: "Shubham",
      lastName: "Sharma",
      email: "shubham.sharma@kerv.com",
      phone: "+917023962638",
      organizationName: "Kerv Transform"
    },
    {
      id: 16,
      firstName: "John",
      lastName: "Upton",
      email: "john.upton@gmail.com",
      phone: "+441224978600",
      organizationName: "Kerv Transform"
    }
  ],

  searchContact: (searchVal, allContacts) => {
    const searchResult = allContacts.filter((contact) => (
      contact.firstName.toLowerCase().includes(searchVal) ||
      contact.lastName.toLowerCase().includes(searchVal)||
      contact.phone.toLowerCase().includes(searchVal) ||
      contact.email.toLowerCase().includes(searchVal)
    ));

    return searchResult;  
  },
};
