import React, { Component } from 'react';
import Link from 'react-router/Link';
import logo from './logo.png';

class SideNav extends Component {
  constructor (props) {
    super(props);
    if (!props.showMenu || !props.openMenu || !props.closeMeu) {
      this.state = {
        showMenu: false,
      };
    }
  }

  _showMenu () {
    this.setState((prevState, currProps) =>({showMenu: !prevState.showMenu}));
  }

  render () {
    if (this.state.showMenu) {
      return (
        <div className="sideMenu">
          <h1 className="close" onClick={this._showMenu.bind(this)}>&#x02A02;</h1>
          <div className="smallBanner">
            <img src={logo}/>
          </div>
          <ul>
            <li>
              <Link to="/">Introduction</Link>
            </li>
            <li>
              <Link to="/getupandrunning">Get Up & Running</Link>
            </li>
            <li>
              <Link to="/corelanguage">Core Language</Link>
              <ul>
                <li>
                  <Link to="/corelanguage/functions">Functions</Link>
                </li>
                <li>
                  <Link to="/corelanguage/records">Records</Link>
                </li>
                <li>
                  <Link to="/corelanguage/objects">Objects</Link>
                </li>
                <li>
                  <Link to="/corelanguage/lists">Lists</Link>
                </li>
                <li>
                  <Link to="/corelanguage/tuples">Tuples</Link>
                </li>
                <li>
                  <Link to="/corelanguage/modules">Modules</Link>
                </li>
                <li>
                  <Link to="/corelanguage/functors">Functors</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/types">Types</Link>
              <ul>
                <li>
                  <Link to="/types/readingtypes">Reading Types</Link>
                </li>
                <li>
                  <Link to="/types/typealiases">Type Aliases</Link>
                </li>
                <li>
                  <Link to="/types/variants">Variants</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div>
        <h1 className="menubtn" onClick={this._showMenu.bind(this)}>&#x02261;</h1>
      </div>
    );
  }
}

export default SideNav;
