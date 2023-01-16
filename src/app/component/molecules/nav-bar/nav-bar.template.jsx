import React from "react";
import {
    Link
} from "react-router-dom";
import { header, headerLink, headerNav, headerTitle } from "./nav-bar.style";

export default ({ location }) => {
    return (
      <header style={header}>
        <h1 style={headerTitle}> Genesys Embeddable Framework </h1>
        <div style={headerNav}>
          <div>
            <Link to="/" style={headerLink(location.home)}>Home</Link>
          </div>
          <div>
            <Link to="/contacts" style={headerLink(location.contacts)}>Contacts</Link>
          </div>
          <div>
            <Link to="/interactions" style={headerLink(location.interactions)}>Interactions</Link>
          </div>
          <div>
            <Link to="/config" style={headerLink(location.config)}>Config</Link>
          </div>
        </div>
      </header>
    );
};