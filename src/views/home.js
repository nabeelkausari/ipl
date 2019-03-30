import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="layout">
        <div className="left-panel">
          <div className="name">
            <h1>Nabeel Kausari</h1>
          </div>

          <div className="menu">
            <div className="score">
              <div className="score__value">
                <span className="score__value--digit">60</span>
                <span className="score__value--info">Points</span>
              </div>
              <div className="score__logo"/>
            </div>
            <div className="matches">
              <h3>Matches</h3>
              <ul className="matches__list">
                <li className="matches__list--item">
                  <b>DC vs SRH</b>
                  <span>Thu 4th April</span>
                </li>
                <li className="matches__list--item selected">
                  <b>KKR vs RCB</b>
                  <span>Fri 5th April</span>
                </li>
                <li className="matches__list--item ">
                  <b>DC vs SRH</b>
                  <span>Sat 6th April</span>
                </li>
                <li className="matches__list--item">
                  <b>DC vs SRH</b>
                  <span>Sat 6th April</span>
                </li>
                <li className="matches__list--item">
                  <b>DC vs SRH</b>
                  <span>Sat 6th April</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="card-holder">
            <div className="arrow arrow-left"/>
            <div className="arrow arrow-right"/>
            <div className="card card-left">
              <div className="team-logo team-logo-left"/>
              <span className="team-name-bg">KKR</span>
              <h2 className="team-name">KKR</h2>
              <div className="btn">
                Wins
              </div>
              <div className="player">
                <img src="https://iplstatic.s3.amazonaws.com/players/210/102.png" alt="player"/>
              </div>
            </div>
            <div className="card card-right">
              <div className="team-logo team-logo-right"/>

              <span className="team-name-bg">RCB</span>
              <h2 className="team-name">RCB</h2>

              <div className="btn">
                Wins
              </div>
              <div className="player">
                <img src="https://iplstatic.s3.amazonaws.com/players/210/164.png" alt="player"/>
              </div>
            </div>
          </div>
          <div className="details">
            <h3 className="details__date">Friday, April 5th</h3>
            <h4 className="details__venue">Bengaluru</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
