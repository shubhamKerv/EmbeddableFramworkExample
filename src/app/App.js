import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './component/pages/home/home.component';
import { Contacts } from './component/pages/contacts/contacts.component';
import { Config } from './component/pages/config/config.component';
import { NavBar } from './component/molecules/nav-bar/nav-bar.component';
import { IFrame } from './component/atoms/iframe/iframe.component';
import { Interactions } from './component/pages/interactions/interactions.component';
import { ContactDetails } from './component/pages/contact-details/contact-details.component';
import { InteractionDetail } from './component/pages/interaction-detail/interaction-detail.component';

function App() {
  console.log("inside app");

  return (
    <Router>
      <NavBar/>
      <IFrame />
      <Routes>
        <Route path="/fafa" element={<Home />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts/:contactId" element={<ContactDetails />} />
        <Route path="interactions" element={<Interactions />} />
        <Route path="interactions/:contactId" element={<InteractionDetail />} />
        <Route path="config/*" element={<Config />} />
      </Routes>
    </Router>
  );
}

export default App;
