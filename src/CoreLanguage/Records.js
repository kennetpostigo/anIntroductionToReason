import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class Records extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Records</h1>
          <blockquote>
            <p>
              If you haven't read the <Link to="/anIntroductionToReason/corelanguage">Core Language Overview </Link>
              please do before diving deeper.
            </p>
          </blockquote>
          <p>
            Records in Reason are the go-to <code>key:value</code> data structure you should
            use when ever the need for it arises. They are similar to Objects in
            Javascript and Dictionaries in Python with a few differences.
          </p>
          <p>
            Before using a record you must make sure do define the shape the record
            will take:
          </p>
          <CodeHighlighter>
            {
`Reason # type hero = {name: string, power: string, age: int};
 type hero = { name : string, power : string, age : int, }`
            }
          </CodeHighlighter>
          <p>
            Once you've got that done you can now go ahead and start creating
            records that implement the definition above.
          </p>
          <CodeHighlighter>
            {
`Reason # let superman = {name: "superman", power: "everything that matters", age: 35};
 let superman : hero =
   {name : "superman", power : "everything that matters", age : 35}

 Reason # let flash = {name: "flash", power: "super speed", age: 25};
 let flash : hero = {name : "flash", power : "super speed", age : 25}`
            }
          </CodeHighlighter>
          <p>
            What happens if we don't follow the type definition of the record?
          </p>
          <CodeHighlighter>
            {
`Reason # let aquaman = {name: "aquaman", age: 50};
 Error: Some record fields are undefined: power

 Reason # let aquaman = {name: "aquaman", power: "power?", age: 50, marvelMovie: false};
 Error: Unbound record field marvelMovie`
            }
          </CodeHighlighter>
          <p>
            Well Reason loses its mind! Nah, it just lets you know that you
            aren't following the type definition and the proceeds to list the
            fields that violate the type definition. Pretty neat huh?
          </p>

          <h2>Updating Record Fields</h2>
          <p>
            In reason if you are creating a record with values that already exist
            and the variable name matches the record field you don't need to give
            the field a label and value, just the label. Lets take a look at how
            we would Traditionally create a record and then lets show the same
            example with field punning:
          </p>
          <CodeHighlighter>
            {
`// Without Punning
 Reason # let name = "John Doe";
 let name : string = "John Doe"

 Reason # let basicPerson = {name: name, age: 21};
 let basicPerson : person = {name : "John Doe", age : 21}

 //With Punning
 Reason # let name = "John Doe";
 let name : string = "John Doe"

 Reason # let basicPerson = { name, age: 21};
 let basicPerson : person = {name : "John Doe", age : 21}`
            }
          </CodeHighlighter>
          <p>
            The difference is subtle <code>name: name</code> vs <code>name</code>,
            you can choose whichever style you prefer they both have the same
            end result.
          </p>

          <h2>Record Destructuring</h2>
          <p>
            You can destructure one or many fields from a record and bind them
            to a variables.
          </p>
          <CodeHighlighter>
            {
`Reason # type player = {position: string, number: int};
 type player = { position : bytes, number : int, }

 Reason # let dwyaneWade : player = {position: "sg", number: 3};
 let dwyaneWade : player = {position : "sg", number : 3}

 Reason # let {position: p, number: n} = dwyaneWade;
 let p : bytes = "sg"
 let n : int = 3`
            }
          </CodeHighlighter>
        </div>
      </div>
    );
  }
}

export default Records;
