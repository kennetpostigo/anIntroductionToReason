import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class ReadingTypes extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Reading Types</h1>
          <p>
            In the <Link to="/corelanguage">Core Language section</Link> of this book,
            we ran a bunch of code in the REPL. Well, we are going to do it again,
            but now with an emphasis on the types that are getting spit out. So
            type fire up your REPL again in your terminal with <code>npm run top</code>.
            You should see this:
          </p>
          <CodeHighlighter>
            {
`──────────────┬──────────────────────────────────────────────────────────────┬────────
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
          <h2>Primitives and Lists</h2>
          <p>Let's enter some simple expressions and see what happens:</p>
          <CodeHighlighter>
            {
`Reason # "hello";
 - : string = "hello"

 Reason # not true;
 - : bool = false

 Reason # floor 3.1415;
 - : float = 3.`
            }
          </CodeHighlighter>
          <p>
            In these three examples, the REPL tells us what_type_of value it along
            with the resulting value. The value <code>"hello"</code> is
            a <code>string</code>. The value <code>3</code>. is an <code>float</code>.
            Nothing too crazy here.
          </p>
          <p>
            Let's see what happens with lists holding different types of values:
          </p>
          <CodeHighlighter>
            {
`Reason # [ "Alice", "Bob" ];
 - : list string = ["Alice", "Bob"]

 Reason # [ 1.0, 8.6, 42.1 ];
 - : list float = [1., 8.6, 42.1]

 Reason # [];
 - : list 'a = []`
            }
          </CodeHighlighter>
          <p>
            In the first case, we have a <code>list</code> filled with <code>string</code> values.
            In the second, the <code>list</code> is filled with <code>float</code> values.
            In the third case the list is empty, so we do not actually know what
            kind of values are in the list. So the type <code>list {"`a"}</code> is
            saying "I know I have a list, but it could be filled with anything".
            The lower-case {"`a"} is called <i>atype variable</i>, meaning that
            there are no constraints in our program that pin this down to some
            specific type. In other words, the type can vary based on how it is used.
          </p>

          <h2>Functions</h2>
          <p>Let's see the type of some functions:</p>
          <CodeHighlighter>
            {
`Reason # String.length;
 - : string => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            The {"function"} <code>String.length</code> has type <code>string => int</code>.
            This means it <i>must take</i> in a <code>string</code> argument, and
            it will definitely return an integer result. So let's try giving it
            an argument:
          </p>
          <CodeHighlighter>
            {
`Reason # String.length "Supercalifragilisticexpialidocious";
 - : int = 34`
            }
          </CodeHighlighter>
          <p>
            The important thing to understand here is how the type of the
            result <code>int</code> is built up from the initial expression. We
            have a <code>string => int</code> {"function"} and give it
            a <code>string</code> argument. This results in an <code>int</code>.
          </p>
          <p>
            What happens when you do not give a <code>string</code> though?
          </p>
          <CodeHighlighter>
            {
`Reason # String.length [1,2,3];
 Error: This expression has type list 'a
        but an expression was expected of type string

 Reason # String.length true;
 Error: This expression has type bool but an expression was expected of type
          string`
            }
          </CodeHighlighter>
          <p>
            A <code>string => int</code> {"function"} must get a <code>string</code> argument!
          </p>
          <h2>Anonymous Functions</h2>
          <p>
            Reason has a feature called <i>anonymous functions</i>. Basically,
            you can create a {"function"} without naming it, like this:
          </p>
          <CodeHighlighter>
            {
`Reason # fun n => n / 2;
 - : int => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            Defining anonymous functions or lambdas is like defining any {"function"},
            beginning with the <code>fun</code> keyword followed by the list of
            arguments of the {"function"}, and on the right of the arrow, you say
            what to do with those arguments. In this example, it is saying: I take
            in some argument I will call <code>n</code> and then I am going to
            divide it by two.
          </p>
          <p>
            We can use anonymous functions directly. Here is us using our anonymous
            {" function"} with 128 as the argument:
          </p>
          <CodeHighlighter>
            {
`Reason # (fun n => n / 2)(128);
 - : int = 64`
            }
          </CodeHighlighter>
          <p>
            We start with a <code>int => int</code> {"function"} and give it
            a <code>int</code> argument. The result is another <code>int</code>.
          </p>
          <h2>Named Functions</h2>
          <p>
            In the same way that we can name a value, we can name an anonymous {"function"}.
            So rebellious!
          </p>
          <CodeHighlighter>
            {
`Reason # let oneHundredAndTwentyEight = 128.0;
 let oneHundredAndTwentyEight : float = 128.

 Reason # let half = fun n => n /. 2.0;
 let half : float => float = <fun>

 Reason # half oneHundredAndTwentyEight;
 - : float = 64.

 Reason # half(oneHundredAndTwentyEight);
 - : float = 64.`
            }
          </CodeHighlighter>
          <p>
            In the end, it works just like when nothing was named. You have
            a <code>float => float</code> {"function"}, you give it a <code>float</code>,
            and you end up with another <code>float</code>. The last two examples
            are the same, you can choose to optionally include parens on the
            parameters passed in.
          </p>
          <p>
            This is true for all functions, no matter how many arguments they
            have. So now let's take that a step farther and think about what it
            means for functions with <i>multiple arguments</i>:
          </p>
          <CodeHighlighter>
            {
`Reason # let divide = fun x y => x / y;
 let divide : int => int => int = <fun>

 Reason # divide 4 2;
 - : int = 2`
            }
          </CodeHighlighter>
          <p>
            That seems fine, but why are <i>there two arrows</i> in the
            type <code>divide</code> ?! To start out, it is fine to think
            that "all the arguments are separated by arrows, and whatever is last is the result of the function".
            So <code>divide</code> takes two arguments and returns a <code>int</code>.
          </p>
          <p>
            To really understand why there are two arrows in the type
            of <code>divide</code> , it helps to convert the definition to use
            anonymous functions.
          </p>
          <CodeHighlighter>
            {
`Reason # let divide = fun x y => x / y;
 let divide : int => int => int = <fun>

 Reason # let divide = fun x => fun y => x / y;
 let divide : int => int => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            All of these are totally equivalent. We just moved the arguments over,
            turning them into anonymous functions one at a time. So when we run
            an expression like <code>divide 4 2</code> we are actually doing a
            bunch of evaluation steps:
          </p>
          <CodeHighlighter>
            {
`divide 4 2
 (divide 4) 2                         -- Step 1 - Add the implicit parentheses
 ((fun x => (fun y => x / y)) 4) 2    -- Step 2 - Expand \`divide\`
 (fun y => 4 / y) 2                   -- Step 3 - Replace x with 3
 4 / 2                                -- Step 4 - Replace y with 2
 2                                    -- Step 5 - Do the math`
            }
          </CodeHighlighter>
          <p>
            After you expand <code>divide</code>, you actually provide the arguments
            one at a time. Replacing <code>x</code> and <code>y</code> are actually
            two different steps.
          </p>
          <p>
            Let's break that down a bit more to see how the types work. In evaluation
            step #3 we saw the following {"function"}:
          </p>
          <CodeHighlighter>
            {
`Reason # (fun y => 4 / y);
 - : int => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            It is a <code>int => int</code> {"function"}, just like <code>half</code>.
            Now in step #2 we saw a fancier {"function"}:
          </p>
          <CodeHighlighter>
            {
`Reason # (fun x => (fun y => x / y));
 - : int => int => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            Well, we are starting with <code>fun x => ...</code> so we know the
            type is going to be something like <code>int => ...</code>. We also
            know that <code>(fun y => x / y)</code> has type <code>int => int</code>.
          </p>
          <p>
            So if you actually wrote down all the parentheses in the type, it would
            instead say <code>int => (int => int)</code>. You provide arguments
            one at a time. So when you replace <code>x</code>, the result is
            actually <i>another {"function"}</i>. The same goes for all functions
            in Reason.
          </p>
          <p>
            Because all functions in Reason work this way, you do not need to
            give all the arguments at once. It is possible to say things like this:
          </p>
          <CodeHighlighter>
            {
`Reason # divide 128;
 - : int => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            This is called partial application. It lets us
            use <a href="https://caml.inria.fr/pub/docs/manual-ocaml/libref/Pervasives.html">the <code>|></code> operator</a> to
             chain functions together in a nice way, and it is why {"function "}
             types have so many arrows!
          </p>

          <h2>Type Annotations</h2>
          <p>
            In Reason you are able to use types as much or as little as you want.
            Types come in handy when trying to figure out input and output of
            functions, tuples, records, etc. Lets take a look:
          </p>
          <CodeHighlighter>
            {
`let frameworkName : string = "React";

 let manyFrameworks: (string, string, string) = ("React", "Vue", "Angular");

 let stuff = fun (lol: int) => lol;`
            }
          </CodeHighlighter>

          <h2>Type Aliases</h2>
          <p>
            So far we have just let Reason figure out the types, but it also lets
            you write a <i>type annotation</i> on the line above a definition if
            you want. So when you are writing code, you can say things like this:
          </p>
          <CodeHighlighter>
            {
`type half = int => int;
 let half = fun n => n / 2;

 type divide = int => int => int;
 let divide = fun x y => x / y;

 type askVegeta = int => string;
 let askVegeta = fun powerLevel => {
   if (powerLevel >9000) {
     "It's over 9000!!!";
   } else {
     "It is " ^ string_of_int powerLevel ^ ".";
   }
 };`
            }
          </CodeHighlighter>
          <p>
            People can make mistakes in type annotations, so what happens if they
            say the wrong thing? Well, the compiler does not make mistakes, so it
            still figures out the type on its own. It then checks that your annotation
            matches the real answer. In other words, the compiler will always verify
            that all the annotations you add are correct.
          </p>
        </div>
      </div>
    );
  }
}

export default ReadingTypes;
