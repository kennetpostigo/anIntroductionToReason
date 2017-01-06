import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class Objects extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Objects</h1>
          <blockquote>
            <p>
              If you haven't read the <Link to="/anIntroductionToReason/corelanguage">Core Language Overview </Link>
              please do before diving deeper.
            </p>
          </blockquote>
          <h3>Reason Objects</h3>
          <p>
            Reason supports programming with Classes and construct Objects from
            classes. However, Reasons Object Oriented Programming model is
            different from the model C++, Java, etc. because you can use
            standalone objects without classes. Classes are used in Reason to
            enable inheritance. Objects also have object types that can determine
            whether an object is open or closed.
          </p>
          <CodeHighlighter>
            {
`Reason # let car = {
   val mutable isMoving = false;
   pub drive => isMoving = true;
   pub getState => isMoving;
 };
  let car : < drive : unit, getState : bool > = <obj>

 Reason # car#drive;
  - : unit = ()

 Reason # car#getState;
  - : bool = true`
            }
          </CodeHighlighter>
        </div>
      </div>
    );
  }
}

export default Objects;
