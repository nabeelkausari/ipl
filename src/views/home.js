import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import cx from 'classnames';
import keydown from 'react-keydown';
import axios from "axios";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { ip_address } from "../constants"

import Loader from '../loader'
import get from "lodash/get"

const teams = {
  "KKR": {
    colors: ["#5F5AA2","#412C69"],
    captain: require('../img/captains/kkr.png'),
    logo: require('../img/teams/kkr.png')
  },
  "RCB": {
    colors: ["#545555", "#1D1D1B"],
    logo: require('../img/teams/rcb.png'),
    captain: require('../img/captains/rcb.png')
  },
  "KXIP": {
    colors: ["#d42028", "#b02026"],
    logo: require('../img/teams/kxip.png'),
    captain: require('../img/captains/kxip.png')
  },
  "MI": {
    colors: ["#046fb2", "#005da0"],
    logo: require('../img/teams/mi.png'),
    captain: require('../img/captains/mi.png')
  },
  "RR": {
    colors: ["#4587c9", "#0751a0"],
    logo: require('../img/teams/rr.png'),
    captain: require('../img/captains/rr.png')
  },
  "SRH": {
    colors: ["#f89734", "#f26732"],
    logo: require('../img/teams/srh.png'),
    captain: require('../img/captains/srh.png')
  },
  "DC": {
    colors: ["#0076bf", "#004c94"],
    logo: require('../img/teams/dc.png'),
    captain: require('../img/captains/dc.png')
  },
  "CSK": {
    colors: ["#f1d100", "#ec6707"],
    logo: require('../img/teams/csk.png'),
    captain: require('../img/captains/csk.png')
  },
}

class Home extends Component {
  state = {
    selected: {
      id: 3,
      date : "Sat 6th April",
      team_1 : "KKR",
      team_2 : "RCB",
      match_time : "4:30pm",
      voted_for : "RCB"
    },
    matches: [],
    firstId: 1,
    loading: true
  }

  selectTeam = selected => {
    this.setState({selected})
  }

  next = () => {
    const { id } = this.state.selected
    if (id === this.state.matches.length) return;

    let nextMatchId = id + 1;
    let selected = this.state.matches.find(m => m.id === nextMatchId);
    this.setState({ selected })
  }

  prev = () => {
    const { selected: {id }, firstId } = this.state
    if (id === firstId) return;

    let prevMatchId = id - 1;
    let selected = this.state.matches.find(m => m.id === prevMatchId);
    this.setState({ selected })
  }

  onVote = vote => {
    this.setState(state => ({
      selected: {
        ...state.selected,
        voted_for: vote.team_name
      }
    }));
    axios.post(`${ip_address}/vote/submit`, vote, {headers: { "Authorization": `Token ${localStorage.getItem('token')}` }})
      .then(res => {
        const { matches } = this.state;
        let matchIndex = matches.findIndex(m => m.id === vote.id);
        this.setState(state => ({
          selected: {
            ...state.selected,
            voted_for: vote.team_name
          },
          matches: [
            ...matches.slice(0, matchIndex),
            {
              ...matches[matchIndex],
              voted_for: vote.team_name
            },
            ...matches.slice(matchIndex + 1)
          ]
        }), () => toast(` 👍 ${res.data}`))
      })
      .catch(err => {
        this.setState(state => ({
          selected: {
            ...state.selected,
            voted_for: null
          }
        }));
        toast.error(` 😱 ${get(err, 'response.data.message') || "Something went wrong"}`)
      })
  }

  componentDidMount() {

    axios.get(`${ip_address}/vote/matches`, {headers: { "Authorization": `Token ${localStorage.getItem('token')}` }})
      .then(res => {
          let activeMatches = res.data.filter(d => d.is_expired === false)
          this.setState({
            matches: activeMatches,
            selected: activeMatches[0],
            firstId: activeMatches[0].id,
            loading: false
          })
        }
      )
      .catch(err => toast.error(` 😱 ${get(err, 'response.data.message') || "Something went wrong"}`))
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

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('fullname');
    localStorage.removeItem('score');
    this.props.history.push('/login')
  }

  render() {
    const { selected, matches, firstId, loading } = this.state;
    return (
      loading
      ? <Loader/>
      : <div className="layout">
          <ToastContainer autoClose={2000}/>
          <div className="left-panel">
            <div className="name">
              <h1>{localStorage.getItem('fullname')}</h1>
            </div>

            <div className="menu">
              <div className="score">
                <div className="score__value">
                  <span className="score__value--digit">{localStorage.getItem('score')}</span>
                  <span className="score__value--info">Points</span>
                </div>
              </div>
              <div className="matches">
                <h3>Upcoming Matches</h3>
                <ul className="matches__list">
                  {matches.map(match => (
                    <li
                      key={match.id}
                      onClick={() => this.selectTeam(match)}
                      className={cx(["matches__list--item", match.id === selected.id && 'selected'])}
                    >
                      <b>{match.team_1} vs {match.team_2}</b>
                      <span>{moment(match.date).format('ddd Do MMM')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ipl-logo"/>
          </div>

          <div className="right-panel">
            <div className="logout" title="Logout" onClick={this.logout}/>
            <div className="card-holder">
              {selected.id !== firstId && <div className="arrow arrow-left" onClick={this.prev}/>}
              {selected.id !== matches.length && <div className="arrow arrow-right" onClick={this.next}/>}

              <div
                onClick={() => this.onVote({
                  id: selected.id,
                  team_name: selected.team_1,
                  match_time: selected.match_time,
                  date: selected.date,
                  email: localStorage.getItem('email')
                })}
                className={cx(["card card-left", selected.voted_for === selected.team_1 && 'card-glow'])}
                style={{ backgroundImage: `linear-gradient(to right, ${teams[selected.team_1].colors[0]}, ${teams[selected.team_1].colors[1]})`}}
              >
                <div
                  className="team-logo team-logo-left"
                  style={{ backgroundPosition: `${teams[selected.team_1].logo[0]} ${teams[selected.team_1].logo[1]}` }}
                ><img src={teams[selected.team_1].logo} alt="team-logo"/></div>
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
                onClick={() => this.onVote({
                  id: selected.id,
                  team_name: selected.team_2,
                  match_time: selected.match_time,
                  date: selected.date,
                  email: localStorage.getItem('email')
                })}
                className={cx(["card card-right", selected.voted_for === selected.team_2 && 'card-glow'])}
                style={{ backgroundImage: `linear-gradient(to right, ${teams[selected.team_2].colors[0]}, ${teams[selected.team_2].colors[1]})`}}
              >
                <div
                  className="team-logo team-logo-right"
                  style={{ backgroundPosition: `${teams[selected.team_2].logo[0]} ${teams[selected.team_2].logo[1]}` }}
                ><img src={teams[selected.team_2].logo} alt="team-logo"/></div>

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
                <h3 className="details__left--date">{moment(selected.date).format('ddd Do MMM')}</h3>
                <h4 className="details__left--venue">{selected.place}</h4>
              </div>
              <div className="details__right">
                <h3 className="details__right--time">{selected.match_time}</h3>
              </div>
            </div>

            <div className="footer">
              {/*<div className="key-hint">*/}
              {/*  Navigate matches using keyboard arrow keys*/}
              {/*  <img src={require('../img/nav.svg')} alt="nav-keys"/>*/}
              {/*</div>*/}
              <div className="logo"/>
            </div>
          </div>
        </div>
    )
  }
}



export default withRouter(keydown(Home));
