import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class TypeAliases extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Type Aliases</h1>
          <p>
            The whole point of type aliases is to make you type annotations
            easier to read.
          </p>
          <p>
            As your programs get more complicated, you find yourself working with
            larger and more complex data. For example maybe you are making
            twitter-for-dogs and you need to represent a user. Maybe you want a
            {"function"} that checks to see if a user has a bio or not. You might
            write a {"function"} like this:
          </p>
          <CodeHighlighter>
            {
`type user = {name: string, bio: string, pic: string};

 type hasBio = user => bool;

 let hasBio = fun {bio} => String.length bio > 0;`
            }
          </CodeHighlighter>
          <p>
            The type annotation here are clear. There is a <code>user</code> type
            that is a record. Then the type for <code>hasBio</code> takes
            a <code>user</code> and returns a <code>bool</code>. Finally the
            implementation of hasBio which uses some pattern-matching to take the
            bio field off the <code>user</code> record passed in.
          </p>
          <p>
            So if we write a {"function"} to add a bio, it would be like this:
          </p>
          <CodeHighlighter>
            {
`type addBio = string => user => user;
 let addBio = fun bio user => {
   let user = {...user, bio: bio};
 };`
            }
          </CodeHighlighter>
          <p>
            Imagine what the type annotation would look like if we did not have
            the user type alias. Bad!
          </p>
          <p>
            Type aliases are not just about cosmetics though. They can help you
            think more clearly. When writing Reason programs, it is often best
            to <i>start</i> with the type alias before writing a bunch of functions.
            I find it helps direct my progress in a way that ends up being more
            efficient overall. Suddenly you know exactly what kind of data you
            are working with. If you need to add stuff to it, the compiler will
            tell you about any existing code that is affected by it. I think most
            experienced Reason folks use a similar process when working with
            records especially.
          </p>
        </div>
      </div>
    );
  }
}

export default TypeAliases;
