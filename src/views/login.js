import React, { Component } from 'react';
import cx from 'classnames';
import keydown from 'react-keydown';

const matches = [
  {
    id: 1,
    match_date : "Thu 4th April",
    team_1 : "KXIP",
    team_2 : "MI",
    match_time : "4:30pm",
    voted_for : "MI"
  },
  {
    id: 2,
    match_date : "Fri 5th April",
    team_1 : "CSK",
    team_2 : "SRH",
    match_time : "4:30pm",
    voted_for : "CSK"
  },
  {
    id: 3,
    match_date : "Sat 6th April",
    team_1 : "KKR",
    team_2 : "RCB",
    match_time : "4:30pm",
    voted_for : "RCB"
  },
  {
    id: 4,
    match_date : "Sun 7th April",
    team_1 : "DC",
    team_2 : "RR",
    match_time : "4:30pm",
    voted_for : "RR"
  },
];

const teams = {
  "KKR": {
    colors: ["#5F5AA2","#412C69"],
    logo: ['-406px', '-203px'],
    captain: require('../img/captains/kkr.png')
  },
  "RCB": {
    colors: ["#545555", "#1D1D1B"],
    logo: ['-609px', '-203px'],
    captain: require('../img/captains/rcb.png')
  },
  "KXIP": {
    colors: ["#d42028", "#b02026"],
    logo: ['-203px', '-406px'],
    captain: require('../img/captains/kxip.png')
  },
  "MI": {
    colors: ["#046fb2", "#005da0"],
    logo: ['0px', '0px'],
    captain: require('../img/captains/mi.png')
  },
  "RR": {
    colors: ["#4587c9", "#0751a0"],
    logo: ['0px', '-609px'],
    captain: require('../img/captains/rr.png')
  },
  "SRH": {
    colors: ["#f89734", "#f26732"],
    logo: ['-406px', '-609px'],
    captain: require('../img/captains/srh.png')
  },
  "DC": {
    colors: ["#0076bf", "#004c94"],
    logo: ['-406px', '-406px'],
    captain: require('../img/captains/dc.png')
  },
  "CSK": {
    colors: ["#f1d100", "#ec6707"],
    logo: ['-203px', '0px'],
    captain: require('../img/captains/csk.png')
  },
}

class Login extends Component {
  state = {
    selected: {
      id: 3,
      match_date : "Sat 6th April",
      team_1 : "KKR",
      team_2 : "RCB",
      match_time : "4:30pm",
      voted_for : "RCB"
    }
  }


  componentWillReceiveProps( { keydown } ) {
    if ( keydown.event ) {
      if (keydown.event.code === "ArrowRight" || keydown.event.code === "ArrowDown") {
        this.next()
      }
      if (keydown.event.code === "ArrowLeft" || keydown.event.code === "ArrowUp") {
        this.prev()
      }
    }
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="layout">
        <div className="left-panel">
          <div className="menu">
            <div className="message">
              <span>ENTER</span>
              <span>THE</span>
              <span>THRILL</span>
            </div>
          </div>
          <div className="ipl-logo"/>
        </div>

        <div className="right-panel">
          <div className="login">
            <div className="form">
              <input type="text" value="" placeholder="Email"/>
              <input type="password" placeholder="Password"/>
              <button type="submit">LOGIN</button>
            </div>

          </div>

          <div className="footer">
            <div className="logo"/>
          </div>
        </div>
      </div>
    )
  }
}



export default keydown(Login);
