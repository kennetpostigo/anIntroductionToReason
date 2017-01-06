import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class Lists extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Lists</h1>
          <blockquote>
            <p>
              If you haven't read the <Link to="/anIntroductionToReason/corelanguage">Core Language Overview </Link>
              please do before diving deeper.
            </p>
          </blockquote>
          <p>
            Lists in reason are immutable singly lists. If you come from a Javascript
            background they should look familiar to you and feel natural to use.
            Lists have a great range of helpful built in methods that are useful
            for traversing, scanning, and manipulating lists. Lets dive in:
          </p>
          <CodeHighlighter>
            {
`Reason # let numbers = [1, 2, 3];
 let numbers : list int = [1, 2, 3]`
            }
          </CodeHighlighter>
          <p>
            Some things to keep in mind are that lists can only hold values of
            the same type. You cannot mix different types together in a list.
            Lets take a look at this:
          </p>
          <CodeHighlighter>
            {
`Reason # let mixed = [1, "one", 2, "two", 3, "three"];
 Error: This expression has type string but an expression was expected of  type
         int`
            }
          </CodeHighlighter>
          <p>
            Reason will make you aware of the error immediately because it infers
            the type the list should be.
          </p>
          <p>
            Combining and appending elements to a list in Reason is different to how it is done in most languages because there is no dedicated method on List for this operation.
          </p>
          <CodeHighlighter>
            {
`Reason # let number = 5;
 let number : int = 5

 Reason # let numbers = [4, 3, 2, 1];
 let numbers : list int = [4, 3, 2, 1]

 Reason # let numbers = [number, ...numbers];
 let numbers : list int = [5, 4, 3, 2, 1]`
            }
          </CodeHighlighter>
          <p>
            The <code>...numbers</code> is similar to JavaScripts spread but not
            quite the same. If it we're the following would be valid:
          </p>
          <CodeHighlighter>
            {
              `Reason # let number = 5;
               let number : int = 5

               Reason # let numbers = [1, 2, 3, 4];
               let numbers : list int = [1, 2, 3, 4]

               Reason # let numbers = [...numbers, number];
               Error: Syntax error`
            }
          </CodeHighlighter>
          <p>
            This is because <code>...</code> is the <code>cons</code> operator
            from OCaml under the hood and the <code>cons</code> operator expects
            an element to the left because it should always come after some initial
            element. Also you should keep in mind that appending to the end of a
            list is an anti pattern because it requires a full copy of the list.
            Adding an element to the front of the list requires allocating a single
            cell, whereas the tail of the new list can just point to the old list.
            OCaml community is ruthlessly hell bent on performance and for good
            reason (is that a pun?). If you want to accomplish this sort of task
            you can do the following:
          </p>
          <CodeHighlighter>
            {
`Reason # let number = 5;
 let number : int = 5

 Reason # let numbers = [1, 2, 3, 4];
 let numbers : list int = [1, 2, 3, 4]

 Reason # numbers @ [number];
 - : list int = [1, 2, 3, 4, 5]`
            }
          </CodeHighlighter>

          <h2>Useful List Operations</h2>
          <p>
            You can get the length of a list by using the <code>length</code> operator:
          </p>
          <CodeHighlighter>
            {
`Reason # let numbers = [1, 2, 3, 4, 5];
 let numbers : list int = [1, 2, 3, 4, 5]

 Reason # List.length numbers;
 - : int = 5`
            }
          </CodeHighlighter>
          <p>
            To grab a specific element in a list you can use the <code>nth</code> operator:
          </p>
          <CodeHighlighter>
            {
`Reason # let numbers = [1, 2, 3, 4, 5];
 let numbers : list int = [1, 2, 3, 4, 5]

 Reason # List.nth numbers 2;
 - : int = 3`
            }
          </CodeHighlighter>
          <p>
            Keep in mind that you pass in the index you want and lists start at 0.
          </p>
          <p>
            You can iterate and apply transformations of elements from a list with map:
          </p>
          <CodeHighlighter>
            {
              `Reason # let numbers = [1, 2, 3, 4, 5];
               let numbers : list int = [1, 2, 3, 4, 5]

               Reason # List.map (fun n => n + 1) numbers;
               - : list int = [2, 3, 4, 5, 6]`
            }
          </CodeHighlighter>
          <p>
            If you want to process a list in order to build a return value
            then <code>fold_left</code> and <code>fold_right</code> are the tools
            for the job. If you come from a JavaScript background then <code>fold_left</code> is
            {" "} <code>reduce</code> and <code>fold_right</code> is <code>reduceRight</code>.
            Lets take a look at both:
          </p>
          <CodeHighlighter>
            {
`Reason # List.fold_left (fun a b => a + b) 0  numbers;
 - : int = 15

 Reason # List.fold_right (fun a b => a + b) numbers 0;
 - : int = 15`
            }
          </CodeHighlighter>
          <p>
            They both provide the same result in this scenario but not always.
            There is a subtle difference between the order in which the lists
            is being processed:
          </p>
          <CodeHighlighter>
            {
`// fold_left
 (((((0 + 1) + 2) + 3) + 4) + 5)

 fold_right
 (1 + (2 + (3 + (4 + (5 + 0)))))`
            }
          </CodeHighlighter>
          <p>
            There are a lot more operators we won't cover here, but you can find
            them in the <a target="blank" href="http://caml.inria.fr/pub/docs/manual-ocaml/libref/List.html">List module</a> of
            the OCaml documentation.
          </p>
          <h2>Similar Data Structures</h2>
          <p>
            Reason has similar list like data structures that you can use. Array is one alternative to List but using Array over List and vice versa has their own tradeoffs. Heres a simple example of what Arrays look like in Reason:
          </p>
          <CodeHighlighter>
            {
`Reason # [| 1, 2, 3 |];
 - : array int = [|1, 2, 3|]`
            }
          </CodeHighlighter>
        </div>
      </div>
    );
  }
}

export default Lists;
