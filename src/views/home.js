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

class Home extends Component {
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

  selectTeam = selected => {
    this.setState({selected})
  }

  next = () => {
    const { id } = this.state.selected
    if (id === matches.length) return;

    let nextMatchId = id + 1;
    let selected = matches.find(m => m.id === nextMatchId);
    this.setState({ selected })
  }

  prev = () => {
    const { id } = this.state.selected
    if (id === 1) return;

    let prevMatchId = id - 1;
    let selected = matches.find(m => m.id === prevMatchId);
    this.setState({ selected })
  }

  onVote = voted_for => {
    this.setState(state => ({
      selected: {
        ...state.selected,
        voted_for
      }
    }))
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
          <div className="name">
            <h1>Nabeel Kausari</h1>
          </div>

          <div className="menu">
            <div className="score">
              <div className="score__value">
                <span className="score__value--digit">60</span>
                <span className="score__value--info">Points</span>
              </div>
            </div>
            <div className="matches">
              <h3>Matches</h3>
              <ul className="matches__list">
                {matches.map(match => (
                  <li
                    key={match.id}
                    onClick={() => this.selectTeam(match)}
                    className={cx(["matches__list--item", match.id === selected.id && 'selected'])}
                  >
                    <b>{match.team_1} vs {match.team_2}</b>
                    <span>{match.match_date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ipl-logo"/>
        </div>

        <div className="right-panel">
          <div className="card-holder">
            {selected.id !== 1 && <div className="arrow arrow-left" onClick={this.prev}/>}
            {selected.id !== matches.length && <div className="arrow arrow-right" onClick={this.next}/>}

            <div
              onClick={() => this.onVote(selected.team_1)}
              className="card card-left"
              style={{ backgroundImage: `linear-gradient(to right, ${teams[selected.team_1].colors[0]}, ${teams[selected.team_1].colors[1]})`}}
            >
              <div
                className="team-logo team-logo-left"
                style={{ backgroundPosition: `${teams[selected.team_1].logo[0]} ${teams[selected.team_1].logo[1]}` }}
              />
              <span className="team-name-bg">{selected.team_1}</span>
              <h2 className="team-name">{selected.team_1}</h2>
              <div className={cx(["btn", selected.voted_for === selected.team_1 && 'btn-selected'])}>
                Wins
              </div>
              <div className="player">
                <img src={teams[selected.team_1].captain} alt="player"/>
              </div>
            </div>
            <div
              onClick={() => this.onVote(selected.team_2)}
              className="card card-right"
              style={{ backgroundImage: `linear-gradient(to right, ${teams[selected.team_2].colors[0]}, ${teams[selected.team_2].colors[1]})`}}
            >
              <div
                className="team-logo team-logo-right"
                style={{ backgroundPosition: `${teams[selected.team_2].logo[0]} ${teams[selected.team_2].logo[1]}` }}
              />

              <span className="team-name-bg">{selected.team_2}</span>
              <h2 className="team-name">{selected.team_2}</h2>

              <div className={cx(["btn", selected.voted_for === selected.team_2 && 'btn-selected'])}>
                Wins
              </div>
              <div className="player">
                <img src={teams[selected.team_2].captain} alt="player"/>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="details__left">
              <h3 className="details__left--date">{selected.match_date}</h3>
              <h4 className="details__left--venue">Bengaluru</h4>
            </div>
            <div className="details__right">
              <h3 className="details__right--time">{selected.match_time}</h3>
            </div>
          </div>

          <div className="footer">
            <div className="key-hint">
              Navigate matches using keyboard arrow keys
              <img src={require('../img/nav.svg')} alt="nav-keys"/>
            </div>
            <div className="logo"/>
          </div>
        </div>
      </div>
    )
  }
}



export default keydown(Home);
