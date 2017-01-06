import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class Variants extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Variants</h1>
          <p>
            Many languages have trouble expressing data with weird shapes. They give you a small set of built-in types, and you have to represent everything with them. So you often find yourself using null or booleans or strings to encode details in a way that is quite error prone.
          </p>
          <p>
            Reasons variants let you represent complex data much more naturally. We will go through a couple concrete examples to build some intuition about how and when to user variants.
          </p>
          <blockquote>
            <p>
              Note: Variants are sometimes called Union types or <a href="https://en.wikipedia.org/wiki/Tagged_union">tagged unions</a>.
              Some communities call them <a href="https://en.wikipedia.org/wiki/Algebraic_data_type">ADTs</a>.
            </p>
          </blockquote>
          <h2>Filtering a Todo List</h2>
          <blockquote>
            <p>
              Problem: We are creating a todo list full of tasks. We want to
              have three views: show all tasks, show only active tasks, and
              show only completed tasks. How do we represent which of these
              three states we are in?
            </p>
          </blockquote>
          <CodeHighlighter>
            {
`Reason # type Visibility =
          | All
          | Active
          | Completed;

 Reason # All;
 - : Visibility = All

 Reason # Active;
 - : Visibility = Active

 Reason # Completed;
 - : Visibility = Completed`
          }
        </CodeHighlighter>
        <p>
          Now that we have these three cases defined, we want to create a {"function"} keep that will properly filter our tasks. It should work like this:
        </p>
        <CodeHighlighter>
          {
`type task = {
   task: string,
   complete: bool
 };

 type buy = task;
 let buy = {
   task: "Buy milk",
   complete: true
 };

 type drink = task;
 let drink = {
   task: "Drink milk",
   complete: false
 };

 type tasks = list task;
 let tasks = [buy, drink];

 # type keep = Visibility => List Task => List Task;
 # keep All tasks == [buy, drink];
 # keep Active tasks == [drink];
 # keep Complete tasks == [buy];`
            }
          </CodeHighlighter>
          <p>
            So they <code>keep</code> {"function"} needs to look at its first
            argument, and depending on what it is, filter the list in various
             ways. We use a <code>switch</code> expression to do this. It is
             like an <code>if</code> on steroids:
          </p>
          <CodeHighlighter>
            {
`type keep = visibility => list task => list tasks;
 let keep = fun visibility tasks => {
  switch visibility {
    | All => tasks;
    | Active => List.filter (fun task => not task.complete) tasks;
    | Completed => List.filter (fun task => task.complete) tasks;
  };
 };`
            }
          </CodeHighlighter>
          <p>
            The <code>switch</code> is saying, look at the structure of visibility.
            If it is <code>All</code> , just give back all the tasks. If it
            is <code>Active</code> , keep only the tasks that are not complete.
            If it is <code>Complete</code>, keep only the tasks that are complete.
          </p>
          <p>
            The cool thing about switch expression is that all the branches
            are checked by the compiler. This has some nice benefits:
          </p>
          <ol>
            <li>
              If you mistype <code>Compleet</code> by accident, you get a
              hint about the typo.
            </li>
            <li>
              If you forget to handle a case, the compiler will figure it out and tell you.
            </li>
          </ol>
          <p>
            So say you want to add <code>Recent</code> as a fourth
            possible <code>Visibility</code> value. The compiler will find
            all the <code>switch</code> expressions in your code that work
            with <code>Visibility</code> values and remind you to handle the
            new possibility! This means you can change and
            extend <code>Visibility</code> without the risk of silently creating
            bugs in existing code.
          </p>

          <h2>Anonymous Users</h2>
          <blockquote>
            <p>
              Problem: We have a chat room where people can post whatever they
              want. Some users are logged in and some are anonymous. How should
              we represent a user?
            </p>
          </blockquote>
          <p>
            Again, whenever there is weird shaped data, you want to reach for
            a variant. For this case we want one where users are either
            anonymous or named:
          </p>
          <CodeHighlighter>
            {
`Reason # type user =
          | Anonymous
          | Named string;

 Reason # Anonymous;
 - : user = Anonymous

 Reason # Named "AzureDiamond";
 - : user = Named "AzureDiamond"

 Reason # Named "abraham-lincoln";
 - : user = Named "abraham-lincoln"`
            }
          </CodeHighlighter>
          <p>
            So creating the type <code>user</code> also created {"constructors"}
            named <code>Anonymous</code> and <code>Named</code>. If you want
            to create a <code>user</code> you <i>must</i> use one of these
            two {"constructors"}. This guarantees that all the possible <code>user</code> values
            are things like:
          </p>
          <CodeHighlighter>
            {
`Anonymous
 Named "AzureDiamond"
 Named "abraham-lincoln"
 Named "catface420"
 Named "Tom"
...`
            }
          </CodeHighlighter>
          <p>
            Now that we have a representation of a <code>user</code>, lets
            say we want to get a photo of the to show next to their posts.
            Again, we need to use a <code>case</code> expression to work with
            out <code>user</code> type:
          </p>
          <CodeHighlighter>
            {
`type userPhoto = user -> string;
 let userPhoto = switch user {
  | Anonymous => "anon.png";
  | Named name => "users/" ^ name ^ ".png";
 };`
            }
          </CodeHighlighter>
          <p>
            There are two possible cases when we have a <code>user</code>. If
            they are Anonymous we show a dummy picture. If they
            are <code>Named</code> we construct the URL of their photo.
            This <code>switch</code> is slightly fancier than the one we saw
            before. Notice that the second branch has a lower case variable name.
            This means that when we see a value like Named <code>"AzureDiamond"</code>,
            the <code>name</code> variable will be bound to <code>"AzureDiamond"</code> so
            we can do other things with it. This is called <i>pattern matching</i>.
          </p>
          <p>
            Now imagine we have a bunch of users in a chat room and we want
            to show their pictures.
          </p>
          <CodeHighlighter>
            {
`type activeUsers = list user;
 let activeUsers = [Anonymous, Named "catface420", Named "AzureDiamond", Anonymous];

 type photos = list string;

 # [ "anon.png", "users/catface420.png", "users/AzureDiamond.png", "anon.png" ];`
            }
          </CodeHighlighter>
          <p>
            The nice thing about creating a type like <code>user</code> is
            that no one in your whole codebase can ever "forget" that some
            users may be anonymous. Anyone who can get a hold of
            a <code>user</code> needs to use a <code>switch</code> to get
            any information out of it, and the compiler guarantees
            every <code>case</code> and handles all possible scenarios!
          </p>

          <h2>Widget Dashboard</h2>
          <blockquote>
            <p>
              <b>Problem</b>: You are creating a dashboard with three
              different kinds of widgets. One shows a recent log data,
              one shows time plots, and one shows scatter plots. How do
              you represent a widget?
            </p>
          </blockquote>
          <p>
            Alright, we are getting a bit fancier now. In Reason, you want to
            start by solving each case individually. (As you get more experience,
            you will see that Reason <i>wants</i> you to build programs out
            of small, reusable parts. It is weird.) So I would create representations
            for each of our three scenarios, along with view functions to
            actually turn them into HTML or SVG or whatever:
          </p>
          <CodeHighlighter>
            {
`type logsInfo = {
   logs: list string
 };

 type timeInfo = {
   events: list (string, float),
   yAxis: string
 };

 type scatterInfo = {
   points: list (float, float),
   xAxis: string,
   yAxis: string
 };`
            }
          </CodeHighlighter>
          <p>
            At this point you have created all the helper functions needed to
            work with these three cases totally independent from each other.
            Someone can come along later and say,
            "I need a nice way to show scatter plots" and use just that part
            of code.
          </p>
          <p>
            So the question is really: how do I put these three standalone
            things together in my particular scenario?
          </p>
          <p>
            Again, variants are there to put a bunch of different types!
          </p>
          <CodeHighlighter>
            {
`Reason # type widget =
          | Logs logsInfo
          | TimePlot timeInfo
          | ScatterPlot scatterInfo;`
            }
          </CodeHighlighter>
          <p>
            So we created a widget type that can only be created with these
            {"constructor"} functions. You can think of these {"constructors "}
            as tagging the data so we can tell it apart at runtime
          </p>
          <CodeHighlighter>
            {
`type view = widget;

 let view = switch widget {
   | Logs logsInfo => logsInfo;
   | TimePlot timeInfo => timeInfo;
   | ScatterPlot scatterInfo => scatterInfo;
 };`
            }
          </CodeHighlighter>
          <p>
            One nice thing about this approach is that there is no mystery about
            what kind of widgets are supported. There are exactly three. If
            someone wants to add a fourth, they modify the <code>widget</code>
            {" "}type. This means you can never be surprised by the data you get,
            even if someone on a different team is messing with your code.
          </p>
          <blockquote>
            <p><b>Takeaways:</b></p>
            <ul>
              <li>Solve each subproblem first.</li>
              <li>Use variants to put together all the solutions.</li>
              <li>Creating a variant type generates a bunch of <i>{"constructors"}</i>.</li>
              <li>
                These {"constructors"} <i>tag</i> data so that we can
                differentiate it at runtime.
              </li>
              <li>
                A <code>switch</code> expression lets us tear data apart
                based on these tags.
              </li>
            </ul>
            <p>
              The same strategies can be used if you are making a game and have a bunch of different bad guys. Goombas should update one way, but Koopa Troopas do something totally different. Solve each problem independently, and then use a union type to put them all together.
            </p>
          </blockquote>

          <h2>Linked Lists</h2>
          <blockquote>
            <p>
              <b>Problem</b>: You are stuck on a bus speeding down the highway.
              If the bus slows down, it will blow up. The only way to save
              yourself and everyone on the bus is to reimplement linked lists
              in Reason. HURRY, WE ARE RUNNING OUT OF GAS!
            </p>
          </blockquote>
          <p>
            Yeah, yeah, the problem is contrived this time, but it is important
            to see some of the more advanced things you can do with variants!
          </p>
          <p>
            A linked list is a sequence of values. If you are looking at a
            linked list, it is either empty or it is a value and more more list.
            That list is either empty or is a value and more list. etc. This
            intuitive definition works pretty directly in Reason Let's see it
            for lists of integers:
          </p>
          <CodeHighlighter>
            {
`Reason # type intList = Empty | Node int intList;

 Reason # Empty;
 - : intList = Empty

 Reason # Node 42 None;
 - : intList = Node 42 Empty

 Reason # Node 64 (Node 128 Empty);
 - : intList = Node 64 (Node 128 Empty)`
            }
          </CodeHighlighter>
          <p>
            Now we did two new things here:
          </p>
          <ol>
            <li>
              The <code>Node</code> {"constructor"} takes two arguments instead
              of one. This is fine. In fact, you can have them take as many
              arguments as you want.
            </li>
            <li>
              Our variant type is recursive. An <code>intList</code> may hold
              another <code>intList</code>. Again, this is fine if you are using
              variant types.
            </li>
          </ol>
          <p>
            The nice thing about our intList type is that now we can only build
            valid linked lists. Every linked list needs to start
            with <code>Empty</code> and the only way to add a new value is
            with <code>Node</code>.
          </p>
          <p>
            It is equally nice to work with. {"Let's"} say we want to compute
            the sum of all of the numbers in a list. Just like with any other
            union type, we need to use a switch and handle all possible scenarios:
          </p>
          <CodeHighlighter>
            {
`type sum = intList => int;
 let rec sum = fun numbers =>
   switch numbers {
     | Empty => 0;
     | Node n remainingNumbers => n + sum remainingNumbers;
   };`
            }
          </CodeHighlighter>
          <p>
            If we get an <code>Empty</code> value, then the sum is 0. If we have
            a <code>Node</code> we add the first element to the sum of all the
            remaining ones. So an expression
            like <code>(sum (Node 1 (Node 2 (Node 3 Empty))))</code> is evaluated
            like this:
          </p>
          <CodeHighlighter>
            {
`sum (Node 1 (Node 2 (Node 3 Empty)))
 1 + sum (Node 2 (Node 3 Empty))
 1 + (2 + sum (Node 3 Empty))
 1 + (2 + (3 + sum Empty))
 1 + (2 + (3 + 0))
 1 + (2 + 3)
 1 + 5
 6`
            }
          </CodeHighlighter>
          <p>
            On each line, we see one evaluation step. When we
            call <code>sum</code> it transforms the list based on whether it
            is looking at a <code>Node</code> or and <code>Empty</code> value.
          </p>
          <blockquote>
            <p>
              <b>Note</b>: This is the first recursive {"function"} we have written
              together! Notice that the assignment of has the
              keyword <code>rec</code> to explicitly let you know that
              the <code>sum</code> is recursive, and <code>sum</code> calls
              itself to get the sum. It can be tricky to get into the mindset
              of writing recursive functions, so I wanted to share one weird
              trick. <b>Pretend you are already done.</b>
            </p>
            <p>
              I always start with a <code>switch</code> and all of the branches
              listed but not filled in. From there, I solve each branch one at
              a time, pretending that nothing else exists. So with <code>sum</code> I'd
              look at <code>Empty =></code> and say, and empty list has to sum
              to zero. Then I'd look at the <code>Node n remainingNumbers =></code> branch
              and think, well, I know I have a number, a list, and a sum {"function"}
              that definitely already exists and totally works. I can just use
              that and add a number to it!
            </p>
          </blockquote>

          <h2>Generic Data Structures</h2>
          <blockquote>
            <p>
              <b>Problem</b>: The last section showed lined lists that only
              worked for integers. That is pretty lame. How can we make linked
              lists that hold any kind of value?
            </p>
          </blockquote>
          <p>
            Everything is going to be pretty much the same, except we are going
            to introduce a type variable in our definition of lists:
          </p>
          <CodeHighlighter>
            {
`Reason # type linkList 'a = Empty | Node 'a (linkList 'a);
 type linkList 'a = Empty | Node of 'a linkList 'a

 Reason # Empty;
 - : linkList 'a = Empty

 Reason # Node "hi" Empty;
 - : linkList string = Node "hi" Empty

 Reason # Node 1.618 (Node 6.283 Empty);
 - : linkList float = Node 1.618 (Node 6.283 Empty)`
            }
          </CodeHighlighter>
          <p>
            The fancy part comes in the <code>Node</code> {"constructor"}. Instead
            of pinning the data to int and <code>intList</code>, we say that
            it can hold <code>{"`a"}</code> and <code>linkList {"`a"}</code>.
            Basically, you can add a value as long as it is the same type of
            value as everything else in the list.
          </p>
          <p>
            Everything else is the same. You pattern match on lists with switch
            and you write recursive functions. The only difference is that our
            lists ca hold anything now!
          </p>
          <h2>Languages</h2>
          <p>
            We can even model a programming language as data if we want to go
            really crazy! In this case it is one that only deals with <a href="https://en.wikipedia.org/wiki/Boolean_algebra#Operations">Boolean algebra</a>:
          </p>
          <CodeHighlighter>
            {
`type boolean =
  | T
  | F
  | Not boolean
  | And boolean boolean
  | Or boolean boolean;

 let customOr = Or T F;

 let customAnd = And T T

 let customBoolAlgebra = And T (Not T);`
            }
          </CodeHighlighter>
        </div>
      </div>
    );
  }
}

export default Variants;
