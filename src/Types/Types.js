import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class Types extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Types</h1>
          <blockquote>
            <p>
              If you haven't read the <Link to="/corelanguage">Core Language Overview </Link>
              please do before diving deeper.
            </p>
          </blockquote>
          <p>
            One of Reason's major benefits is its powerful type system that it
            inherits from OCaml. {"OCaml's"} type system is great and has powered
            many tools like flow that add static types to Javascript. Now I know
            what you may be thinking, but types in Reason are not painful like
            the ones you may have encountered in Java.
          </p>
          <p>
            In Reason types can be defined in many ways and optionally included
            in your code <i>almost</i> always, this is possible because Reason
            is able to infer the types in your code:
          </p>
          <CodeHighlighter>
            {
`Reason # let kewlMath = fun (x, y) => x + y ;
 let kewlMath : (int, int) => int = <fun>

 Reason # let addForDays = kewlMath(5,5);
 let addForDays : int = 10`
            }
          </CodeHighlighter>
          <p>
            As you can see Reason automatically infers what types the parameter
            is and the return type of the {'function'}. Reason is smart enough to know
            this and will catch your errors and notify you about them immediately
            as well:
          </p>
          <CodeHighlighter>
            {
`Reason # let addForDays = kewlMath(5, true);
 Error: This expression has type bool but an expression was expected of type
          int`
            }
          </CodeHighlighter>
          <p>
            Reason will save you many hours of your precious time debugging. It
            provides really helpful errors and feedback to get you on the right
            track and squash bugs.
          </p>
        </div>
      </div>
    );
  }
}

export default Types;
