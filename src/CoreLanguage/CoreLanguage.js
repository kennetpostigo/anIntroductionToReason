import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class CoreLanguage extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Core Language</h1>
          <p>
            This is quick overview of the Reason Language.
          </p>

          <p>
            Follow along by running the Reason REPL and typing the commands into the repl
          </p>


          <CodeHighlighter>
            {
              `npm run top`
            }
          </CodeHighlighter>

          <p>After running the previous command you should see the following:</p>

          <CodeHighlighter>
            {
              `
──────────────┬──────────────────────────────────────────────────────────────┬──────────────
              │ Welcome to utop version 1.19.2 (using OCaml version 4.02.3)! │
              └──────────────────────────────────────────────────────────────┘
Reason: Meta Language Utility
                   ___  _______   ________  _  __
                  / _ \/ __/ _ | / __/ __ \/ |/ /
                 / , _/ _// __ |_\ \/ /_/ /    /
                /_/|_/___/_/ |_/___/\____/_/|_/

  Execute statements/let bindings. Hit <enter> after the semicolon.

        >   let myVar = "Hello Reason!";
        >   let myList: list string = ["first", "second"];

Type #utop_help for help about using utop.`
            }
          </CodeHighlighter>
          <p>
            If you see this everything is working great! If not please consult
            <Link to="/"> Get Up & Running</Link>
          </p>

          <p>
            To exit the REPL, type <code>ctrl + d</code>
          </p>
          <h1>Values</h1>
          <h2>Strings</h2>
          <CodeHighlighter>
            {
`Reason # "hello";
 - : string = "hello"

 Reason # "Hello, " ^ "from Reason";
 - : string = "Hello, from Reason"`
            }
          </CodeHighlighter>
          <p>
            Reason uses the <code>^</code> operator to put strings together.
          </p>

          <h2>Numbers</h2>
          <CodeHighlighter>
            {
`Reason # 2 + 3 * 4;
 - : int = 14

 Reason # (2 + 3) * 4;
 - : int = 20`
            }
          </CodeHighlighter>
          <p>
            Reason makes a distinction between integers and floating point numbers.
            Unlike some other languages, Reason won't automatically convert integer
            literals to floats, you must explicitly write them with a decimal point
            as seen below. There is both floating point division <code>/.</code>
            and integer division <code>/</code> . The same convention goes for
            the other arithmetic operators.
          </p>
          <CodeHighlighter>
            {
`Reason # 9.0 /. 2.0;
 - : float = 4.5

 Reason # 9/2;
 - : int = 4`
            }
          </CodeHighlighter>
          <h2>Functions</h2>
            <CodeHighlighter>
              {
`Reason # let isNegative n => n < 0;
 let isNegative : int => bool = <fun>

Reason # isNegative 4;
- : bool = false

Reason # isNegative (-7);
- : bool = true

Reason # isNegative (-3 * -4);
- : bool = false`
              }
            </CodeHighlighter>
            <p>
              In reason to invoke/call a {'function'} you can simply choose to
              use parenthesis or omit/ignore them. Whichever one you prefer to use.
              The first piece of code we entered to define isNegative returns the
              type definition of the {'function'}. We will get into type definitions
              later in this guide.
            </p>
            <CodeHighlighter>
              {
`Reason # let sum2 a b => a + b;
 let sum2 : int => int => int = <fun>

Reason # sum2 1 2;
- : int = 3

Reason # sum2 1 (sum2 2 3);
- : int = 6
`
              }
            </CodeHighlighter>

            <p>
              Function calling in Reason looks different than it does in languages
              like Javascript, Java or C.  The arguments are passed in plainly one
              at a time without being comma-separated. As you can see in the above
              example, parentheses are used differently as well.  They can be omitted
              when the argument is simple, such as in the second example, but in
              the third example, the second argument to <code>sum2</code> is more complex, so
              we wrap it in parentheses.  You can read more about this in the
              <Link to="/CoreLanguage/functions"> Functions</Link> section under
                {` "Multiargument Functions & Gotchas"`}.
            </p>

            <h2>If Expressions</h2>
            <CodeHighlighter>
              {
`Reason # if (true) {
     "Hello";
  } else {
     "World";
 };
 - : string = "Hello"

Reason # if (false) {
    "Hello";
  } else {
    "World";
};
 - : string = "World"
`
              }
            </CodeHighlighter>
            <p>
              Reason <code>if/else</code> expressions should look familiar to you if you've
              ever dabbled in C, C++, and Javascript. One major difference is that
              they are expressions in Reason, meaning they always return a value.

              Reason does not have a notion of “truthiness” so numbers and strings
              and lists cannot be used as boolean values. If we try it out, Reason
              will tell us that we need to work with a real boolean value.

              Now let's make a {'function'} that tells us if a number is over 9000.
            </p>
            <CodeHighlighter>
              {
`Reason # let over9000 powerLevel => {
   if (powerLevel > 9000) {
     "It's Greater Than 9000";
   } else {
     "meh";
   }
 }
 let over9000 : int => string = <fun>

 Reason # over9000 42;
 - : string = "meh"

 Reason # over9000 100000;
 - : string = "It's Greater Than 9000"
`
              }
            </CodeHighlighter>
            <p>
              Here you can notice that we add <code>{`{...}`}</code> to define
              multi-line functions. <code>over9000</code> combines the usage of
              <code>{' functions'}</code> and <code>if/else</code> control flow.
            </p>

            <h2>Lists</h2>
            <p>
              Lists are one of the most common data structures in Reason. They hold a
              sequence of related things, similar to arrays in C++, Javascript,
              and Java.  You can think of them as a singly-linked list.
            </p>
            <p>
              Lists can hold many values. Those values must all have the same type.
              Here are a few examples that use functions from
              <a href="https://caml.inria.fr/pub/docs/manual-ocaml/libref/List.html"> the <code>List</code> library</a>:
            </p>
            <CodeHighlighter>
              {
`Reason # let names = [ "Alice", "Bob", "Chuck" ];
 let names : list string = ["Alice", "Bob", "Chuck"]

 Reason # List.length(names) > 0;
 - : bool = true

 Reason # List.length names;
 - : int = 3

 Reason # List.rev names;
 - : list string = ["Chuck", "Bob", "Alice"]

 Reason # let numbers = [1,4,3,2];
 let numbers : list int = [1, 4, 3, 2]

 Reason # List.sort compare numbers;
 - : list int = [1, 2, 3, 4]

 Reason # let double = fun n => n * 2;
 let double : int => int = <fun>

 Reason # List.map double numbers;
 - : list int = [2, 8, 6, 4]`
              }
            </CodeHighlighter>
            <h2>Tuples</h2>
            <p>
              Tuples are another useful data structure. A tuple can hold a fixed
              number of values, and each value can have any type. A common use is
              if you need to return more than one value from a {'function'}. The
              following {'function'} gets a name and gives a message for the user:
            </p>
            <CodeHighlighter>
              {
`Reason # let goodName name => {
   if ((String.length name) <= 20) {
      (true, "name accepted!");
   } else {
      (false, "name was too long; please limit it to 20 characters");
   }
 };
 let goodName : string => (bool, string) = <fun>

 Reason # goodName("Tom");
 - : (bool, string) = (true, "name accepted!")`
              }
            </CodeHighlighter>

            <p>
              This can be quite handy, but when things start becoming more complicated,
              it is often best to use records instead of tuples.
            </p>


            <h2>Records</h2>
            <p>
              A record is a set of key-value pairs, similar to objects in JavaScript
              or Python. You will find that they are extremely common and useful
              in Reason! Let's see some basic examples.
            </p>
            <CodeHighlighter>
              {
`Reason # type point = { x: int, y: int };
 type point = { x : int, y : int, }

 Reason # let cursor = { x: 3, y: 4 };
 let cursor : point = {x : 3, y : 4}

 Reason # cursor.x;
 - : int = 3

 Reason # type person = { name: string, age: int };
 type person = { name : string, age : int, }

 Reason # let bill = { name: "Gates", age: 57 };
 let bill : person = {name : "Gates", age : 57}

 Reason # bill.name;
 - : string = "Gates"`
              }
            </CodeHighlighter>
            <p>
              To create a record you must first define a <code>type definition</code>
              with the shape that the record will abide by. Type definitions are
              distinguishable with the fact that they start with the keyword
              <code> type</code> instead of <code>let</code> and instead of assigning
              values for the fields on you assign types, ie: <code>x: int</code>.
              Once the type is defined you can create a record that has the same
              shape as the type.
            </p>

            <p>
              If you want to access the values on a record simply use <code>someRecord.field</code>.
            </p>

            <p>
              It is often useful to update the values in a record. You can do
              this on fields you mark fields on the type definition with mutable:
            </p>
            <CodeHighlighter>
              {
`Reason # type point = { mutable x: int, y: int };
 type point = { mutable x : int, y : int, }

 Reason # let cursor = { x: 2, y: 5 };
 let cursor : point = {x : 2, y : 5}

 Reason # cursor.x = 12;
 - : unit = ()

 Reason # cursor.x;
 - : int = 12

 Reason # cursor.y = 5;
 Error: The record field y is not mutable`
              }
            </CodeHighlighter>

            <p>
              Only fields marked with mutable can be changed, if you attempt to
              update a non mutable field you will receive an error from Reason
              telling you exactly this.
            </p>


            <h2>Comparing Records and Javascript Objects</h2>

            <p>
              Records in Reason are <i>similar</i> to objects in Javascript, but there are some crucial differences. The major differences are that with records:
            </p>

            <ul>
              <li>You cannot ask for a field that does not exist.</li>
              <li>No field will ever be undefined or null.</li>
              <li>Records are Immutable</li>
            </ul>

            <h2>Diving Deeper</h2>

            <p>If you want to learn about each of the core language sections deeper:</p>

            <ul>
              <li>
                <Link to="/corelanguage/functions">Functions</Link>
              </li>
              <li>
                <Link to="/corelanguage/records">Records</Link>
              </li>
              <li>
                <Link to="/corelanguage/tuples">Tuples</Link>
              </li>
              <li>
                <Link to="/corelanguage/lists">Lists</Link>
              </li>
              <li>
                <Link to="/corelanguage/objects">Objects</Link>
              </li>
              <li>
                <Link to="/corelanguage/modules">Modules</Link>
              </li>
              <li>
                <Link to="/corelanguage/functors">Functors</Link>
              </li>
            </ul>
        </div>
      </div>
    );
  }
}

export default CoreLanguage;
