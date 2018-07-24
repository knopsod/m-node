import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const header = (props) => (
  <nav className="navbar navbar-default nav-masternode">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>

        <Link className="navbar-brand nav-masternode" style={{color: 'white'}} to="/masternodes">
          masternodes
        </Link>
      </div>

      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/dashboard" style={{color: 'white'}}>dashboard</Link>
          </li>
          <li>
            <Link to="/reports" style={{color: 'white'}}>reports</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          { true ? (
            <li>
              <Link to="/login" style={{color: 'white'}}>Login</Link>
            </li>
          ) : (
            <li>
              <Link to="/logout">logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default header;
