import React from 'react';
import logo from './logo.png';
import './introduction.css';

class Introduction extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="introBanner">
          <img src={logo}/>
        </div>
        <div className="header">
          <div className="row">
            <p>Intro To Reason |
              <a href="http://github.com/kennetpostigo/anIntroductionToReason"> Github
              </a>
            </p>
          </div>
        </div>
        <div className="contentContainer">
          <p>
            <a href="http://facebook.github.io/reason/">Reason</a> is a new frontend and developer experience built on the OCaml programming language. The goal of Reason is to harness the decades of research that went into OCaml and extend its reach to all kinds of developers.
          </p>

          <p>This book will:</p>

          <ul>
            <li>Teach you the fundamentals of Reason</li>
            <li>Show you how you can build applications in Reason</li>
          </ul>

          <p>
            By the end of this book hopefully you will have a solid working knowledge of Reason or a foundation to continue building on with further learning.
          </p>

          <h3>Why Should I Use Reason?</h3>
          <p>
            Reason has no limit to its reach and is not bound to any programming context. Reason can be used to build highly performant servers, systems, web, desktop, and mobile applications. To sum it up:
          </p>
          <ul>
            <li>Developer Experience</li>
            <li>Performance</li>
            <li>Ubiquity Across Platforms</li>
            <li>Phenomenal Toolchain</li>
            <li>Applications with Small Footprints</li>
          </ul>

          <h3>What type of Programming Language is Reason?</h3>
          <p>
            Reason is a functional programming language. However it also allows you to program imperatively in order to make working with side-effects easy and natural. Reason gives you the power to embrace the best parts of imperative and functional programming paradigms to make your code as performant as possible!
          </p>

          <h3>Community</h3>
          <p>
            Reason is on a rapid trajectory growth, and the Reason community is filled with bright, kind, and welcoming people. If you have any questions or just want to talk Reason:
          </p>

          <ul>
            <li>
              <a href="https://discordapp.com/invite/reasonml">Discord</a>
            </li>
            <li>
              <a href="http://stackoverflow.com/questions/tagged/reason">StackOverFlow</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Introduction;
