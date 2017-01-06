import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class Functions extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Functions</h1>
          <blockquote>
            <p>
              If you haven't read the <Link to="/corelanguage">Core Language Overview </Link>
              please do before diving deeper.
            </p>
          </blockquote>
          <p>
            Functions are the smallest unit you have to build with. Many large systems are built on several small units, that are often functions. Functions are your friend!
          </p>
          <h2>Anonymous Functions</h2>
          <p>
            In reason you are able to create anonymous functions or lambdas and
            use them throughout your code.
          </p>
          <CodeHighlighter>
            {
`Reason # fun (x) => x + 10;
 - : int => int = <fun>

 Reason # fun x => x + 10;
 - : int => int = <fun>
`
            }
          </CodeHighlighter>
          <p>
            As you can see when writing functions you can choose to omit the parenthesis
            around the parameters you pass into the {`function`}. Both of the functions
            above are equivalent, even their typing is the same <code>- : int => int = {`<fun>`}</code>.
            However how do we invoke these functions if they have no name?!?! Well, lets do just that:
          </p>
          <CodeHighlighter>
            {
`Reason # (fun (x) => x + 10)(2);
 - : int = 12

 Reason # (fun x => x + 10) 2;
 - : int = 12`
            }
          </CodeHighlighter>
          <p>
            First thing you do is wrap the {'function'} expression in a set of
            parenthesis and then pass in the parameters the lambda takes. Just like
            with the parameters you can invoke the {'function'} with or without parenthesis.
          </p>

          <h2>Named Functions</h2>
          <p>
            Functions in reason are first class citizens! You can treat them as values in your programs and use let bindings to give them names just as you would with integers, floats, strings, etc.
          </p>
          <CodeHighlighter>
            {
`Reason # let add10 (n) => n + 10;
 let add10 : int => int = <fun>

 Reason # let add10 n => n + 10;
 let add10 : int => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            The {'function'} declarations above are given the name <code>add10</code>.
            Both are the equivalent, one doesn't use parenthesis when defining the
            parameters it takes. Now to invoke these functions we simply type the
            name of the {'function'} followed by the parameters (with or without parenthesis).
          </p>
          <CodeHighlighter>
            {
`Reason # add10(5);
 - : int = 15

 Reason # add10 5;
 - : int = 15`
            }
          </CodeHighlighter>

          <h2>Multiargument Functions & Gotchas</h2>
          <p>
            Lets define some functions that take more than one argument:
          </p>
          <CodeHighlighter>
            {
`Reason # let add x y => x + y;
 let add : int => int => int = <fun>

 Reason # let add (x, y) => x + y;
 let add : (int, int) => int = <fun>`
            }
          </CodeHighlighter>
          <p>
            Notice something odd here? The type definitions aren't the same. Meaning these {'function'} aren't really the same. Lets test them out one by one and see what problems we come across:
          </p>
          <CodeHighlighter>
            {
`Reason # let add (x, y) => x + y;
 let add : (int, int) => int = <fun>

 Reason # add(5,5);
 - : int = 10

 Reason # add 5 5;
 Error: This function has type (int, int) => int
        It is applied to too many arguments; maybe you forgot a \`;'.`
            }
          </CodeHighlighter>
          <p>
            First we define the {'function'} <code>add</code> in the REPL, notice
            we used the version with the parentheses around the parameters. Then
            we invoke the {'function'} with parentheses. The call to <code>add</code> returns
            10, as we would expect. However when we invoke it again this
            time without parentheses we get an error complaining about the types
            passed in. The reason that this happens is that when you define a {'function'}
            with 2 or more parameters and you wrap them in parenthesis it interprets
            it as a {'function'} that takes a <code><Link to="/corelanguage/tuples">tuple</Link></code> containing 2 or more values. When you call it without parenthesis you
            are passing 2 values of type <code>int</code>, but the {'function'}
            is expecting 1 <code>tuple</code> value.
          </p>
          <CodeHighlighter>
            {
`Reason # let add x y => x + y;
 let add : int => int => int = <fun>

 Reason # add 5 5;
 - : int = 10

 Reason # add (5, 5);
 Error: This expression has type ('a, 'b)
        but an expression was expected of type int`
            }
          </CodeHighlighter>
          <p>
            The same thing can happens in reverse, this time we don't use parenthesis
            for the <code>add</code> parameters, and when we invoke the {'function'}
            without parenthesis it works out well! However when we use parenthesis
            to invoke the {'function'} we get an error complaining that we we
            didn't pass in an <code>int</code>, rather a <code>tuple</code>. So be
            aware of how you define your functions so that you invoke them correctly.
            Most times the compiler will catch it for you ahead of time and warn you.
          </p>

          <h2>Labelled Arguments</h2>
          <p>
            In many programming languages like Javascript, Java, C++, etc. argument
            to a {'function'} are passed in positionally. {'Let\'s'} illustrate
            what this means by creating a {'function'} that <i>must</i> takes in a boolean
            then a string:
          </p>
          <CodeHighlighter>
            {
`Reason # let boolString (b:bool) (s:string) => (b, s);
 let boolString : bool => string => (bool, string) = <fun>

 Reason # boolString true "word up";
 - : (bool, string) = (true, "word up")

 Reason # boolString "word up" true;
 Error: This expression has type bytes but an expression was expected of type
          bool`
            }
          </CodeHighlighter>
          <p>
            As you can see when we invoke <code>boolString</code> the first time
            with the arguments in the correct order everything goes according to
            plan. For arguments sake (pun intended) lets say we forgot the order
            the arguments and we flip the arguments we get an error saying that
            there was a type mismatch. This is a simple example but say a {'function'}
            takes several arguments that are hard to remember and say some are optional.
            It's makes it difficult to maintain the order in your head and know if you
            need certain parameters, this can happen often in practice. Well good old
            Reason got your back with labelled arguments!
          </p>
          <CodeHighlighter>
            {
`Reason # let getHero sk::sk name::name => {
   if (sk) {
     let sideKicks = ["robin", "speedy"];
     List.find (fun side => name == side) sideKicks;
   } else {
     let heroes = ["batman", "arrow"];
     List.find (fun hero => name == hero) heroes;
   }
 };
 let getHero : sk::bool => name::string => string = <fun>

 Reason # getHero name::"batman" sk::false;
 - : string = "batman"

 Reason # getHero sk::true name::"robin";
 - : string = "robin"`
            }
          </CodeHighlighter>
          <p>
            Above we defined a {'function'} called <code>getHero</code> that takes
            2 labelled arguments, <code>sk</code> and <code>name</code>. To label
            an argument you simply pass the label you want the argument to have
            followed by double colon <code>::</code> and then finally the name
            of the argument you will use in the {'function'}. In <code>getHero</code> we
            used the named the label of the argument and the name of the argument
            the same. Now we can call the arguments in whatever order we want with
            the label and Reason will know how to apply the parameters and no will
            no longer throw and error.
          </p>

          <h2>Argument Punning</h2>
          <p>
            As we in the Labelled Arguments section the <code>getHero</code> {'function'}
            was able to take arguments in any order so long as the label was included
            when passing in arguments to the {'function'}. However when defining
            functions with labelled arguments there is a neat trick for saving a
            few keystrokes! In Reason this is called argument punning, you are only
            able to do this if the label and the name of the argument are the same:
          </p>
          <CodeHighlighter>
            {
`Reason # let getHero sk::sk name::name => {
   if (sk) {
     let sideKicks = ["robin", "speedy"];
     List.find (fun side => name == side) sideKicks;
   } else {
     let heroes = ["batman", "arrow"];
     List.find (fun hero => name == hero) heroes;
   }
 };
 let getHero : sk::bool => name::string => string = <fun>

 Reason # getHero name::"batman" sk::false;
 - : string = "batman"

 Reason # getHero sk::true name::"robin";
 - : string = "robin"`
            }
          </CodeHighlighter>

          <h2>Recursive Functions</h2>
          <p>
            In functional programming languages recursion is important and useful
            to make code simpler and more concise. Reason is unlike most languages
            because you have to explicitly tell it that a {'function'} is recursive
            by using the <code>rec</code> keyword prior to the definition of the {'function'}.
            The <code>rec</code> keyword is the only way a {'function'} is able
            to refer to itself in Reason. If you've ever worked on medium to large
            codebase it can be difficult to remember which functions are recursive
            or read code you are not familiar with it may take you a while to realize
            a {'function'} is recursive. In reason you won't have that problem because
            upon scanning the code you will see the <code>rec</code> keyword prior
            to the {'function'} declaration. Lets take a look at recursive
            {'function'} in action:
          </p>
          <CodeHighlighter>
            {
`Reason # let rec sum list =>
   switch list {
   | [] => 0
   | [hd, ...tl] => hd + sum tl
   };
 let sum : list int => int = <fun>

 Reason # sum [1,2,3];
 - : int = 6`
            }
          </CodeHighlighter>
          <p>
            The {'function'} sum takes a list of type int as an argument, the goal
            of the {'function'} is to iterate through the {'function'} and continuously
            add the values in the list until no items are left traverse. The base
            case is the first branch in the <code>switch</code> that will look at
            the list passed in and if it is empty it will return 0. The second branch
            will grab the head of the list in the <code>hd</code> variable and then
            grab the rest of the list in the <code>tl</code> variable (<code>[hd, ...tl]</code>) and
            then add the <code>hd</code> to the recursive sum of the <code>tl</code> (<code>hd + sum tl</code>).
          </p>
        </div>
      </div>
    );
  }
}

export default Functions;
