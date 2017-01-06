import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';

class Modules extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Modules</h1>
          <blockquote>
            <p>
              If you haven't read the <Link to="/corelanguage">Core Language Overview </Link>
              please do before diving deeper.
            </p>
          </blockquote>
          <p>
            Modules in Reason give you the ability to wrap up units of code into
            reusable pieces that you may include in other parts of your codebase.
            Modules may contain types or values or both. How do modules look?
          </p>
          <CodeHighlighter>
            {
`Reason # module Cool = {
   /* cool stuff up in hurr */
 };
 module Cool : {  }`
            }
          </CodeHighlighter>
          <p>
            First things that should catch your eye is that we use <code>module</code> keyword
            instead of the <code>let</code> keyword to bind a module to an identifier.
            Which in this case is <code>Cool</code> . Lets populate <code>Cool</code> now:
          </p>
          <CodeHighlighter>
            {
`Reason # module Cool = {
   type rate = int;
   let coolMeter (rating: rate) : string => {
     if (rating <= 5) {
       "Not Cool";
     } else {
       "Cool";
     }
   };
 };
 module Cool : { type rate = int; let coolMeter : rate => string; }`
            }
          </CodeHighlighter>
          <p>
            As you can see after the <code>Cool</code> module definition we are
            returned the signature of the module. You can access the contents of
            a module similar to how you access fields on a record. Now we can use
            the functions and types that <code>Cool</code> exposes:
          </p>
          <CodeHighlighter>
            {
`Reason # let tv : Cool.rate = 5;
 let tv : int = 5

 Reason # let computer : Cool.rate = 10;
 let computer : int = 10

 Reason # Cool.coolMeter tv;
 - : string = "Not Cool"

 Reason # Cool.coolMeter computer;
 - : string = "Cool"`
            }
          </CodeHighlighter>

          <h2>Rebinding Modules</h2>
          <p>
            When using modules you defined or third party modules in your codebase
            they may have really long names and it can get really bothersome to
            constantly type them especially if they are used often. To avoid this
            you may also bind the module to another identifier:
          </p>
          <CodeHighlighter>
            {
`Reason # module C = Cool;
 module C = Cool

 Reason # let tv : C.rate = 5;
 let tv : int = 5

 Reason # let computer : C.rate = 10;
 let computer : int = 10

 Reason # C.coolMeter tv;
 - : string = "Not Cool"

 Reason # C.coolMeter computer;
 - : string = "Cool"`
            }
          </CodeHighlighter>

          <h2>Extending Modules</h2>
          <p>
            Modules can be extended with additional functionality by using
            the <code>include</code> keyword. When using the include keyword the
            module has access to all the modules content:
          </p>
          <CodeHighlighter>
            {
`Reason # module Cool = {
   type rate = int;
   let coolMeter (rating: rate) : string => {
     if (rating <= 5) {
       "Not Cool";
     } else {
       "Cool";
     }
   };
 };
 module Cool : { type rate = int; let coolMeter : rate => string; }

 Reason # module SuperDuperCool = {
   include Cool;
   let superDuperCoolMeter (rating: rate) : string => {
     "Super Duper " ^ coolMeter rating;
   }
 };
 module SuperDuperCool :
   {
     type rate = int;
     let coolMeter : rate => string;
     let superDuperCoolMeter : rate => string;
   }`
            }
          </CodeHighlighter>
          <p>
            <code>SuperDuperCool</code> now has all the functionality and content
              present in <code>Cool</code> because we used <code>include</code>,
              but in addition we defined a new function <code>superDuperCoolMeter</code> that
              uses <code>coolMeter</code> and super dupefies the result. We can
              confirm this because <code>rtop</code> returns the module signature.
              Lets take the new Method out for a spin:
          </p>
          <CodeHighlighter>
            {
`Reason # SuperDuperCool.superDuperCoolMeter 9;
 - : string = "Super Duper Cool"`
            }
          </CodeHighlighter>
          <h2>Module signature</h2>
          <p>
            Similar to many data structures in Reason, modules themselves can be
            typed. In reason you can type modules by using the <code>module type</code> combination.
            Module typing is referred to as module signature or signatures because
            signatures describe the structure of values and types that a module contains.
          </p>
          <p>
            Lets take a look at a module signature and a module that implements the signature:
          </p>
          <CodeHighlighter>
            {
`Reason # module type CoolStringAndRateInt = {
   type rate = int;
   let coolMeter: rate => string;
 };
 module type CoolStringAndRateInt =
   { type rate = rating; let coolMeter : rate => string; }

 Reason # module Cool: CoolStringAndRateInt = {
   type rate = int;
   let coolMeter (rating: rate) : string => {
     if (rating <= 5) {
       "Not Cool";
     } else {
       "Cool";
     }
   };
 };
 module Cool : CoolStringAndRateInt`
            }
          </CodeHighlighter>
          <p>
            Above we created a <code>module type</code> which you can think of as
            interface or contract that a module must abide by, if it doesn't then
            the compiler will make sure to let you know and throw a type mismatch.
          </p>
          <p>
            In the code above <code>CoolStringAndRateInt</code> signature defines
            a type <code>int</code> for the <code>rate</code> field. Followed by
            that, we define a value <code>coolMeter</code>. However it may look
            odd because we don't use <code>=</code> when defining it
            <code>let coolMeter: rate => string;</code> This is because we are
            defining an interface to of a value.
          </p>
          <p>
            Finally we revisit the <code>Cool</code> module and we set it's signature
            {" "}<code>module Cool: CoolStringAndRateInt {"{ ... }"}</code>. This will
            enforce the module to abide by the signature, lets take a look:
          </p>
          <CodeHighlighter>
            {
`Reason # module type CoolStringAndRateInt = {
   type rate = int;
   let coolMeter: rate => string;
 };
 module type CoolStringAndRateInt =
   { type rate = rating; let coolMeter : rate => string; }

 Reason # module Cool: CoolStringAndRateInt = {
   let coolMeter (rate: int) : string => {
     if (rate <= 5) {
       "Not Cool";
     } else {
       "Cool";
     }
   };
 };
 Error: Signature mismatch:
        Modules do not match:
          { let coolMeter : int => string; }
        is not included in
          CoolStringAndRateInt
        The type \`rate' is required but not provided`
            }
          </CodeHighlighter>
          <p>
            If we we're to omit anything specified in the module signature Reason
            will point it out immediately. This is great from a maintenance and
            refactoring stand point. Because as soon as the interface of a module
            changes Reason will tell you about it and help you keep your modules
            and other code in you codebase that depend on your module stay up to date.
          </p>
          <p>
            With that said as long as we satisfy the module signature we get no
            problems. What if we add more fields or types to a module than what
            is defined in the signature? 🤔
          </p>
          <CodeHighlighter>
            {
`Reason # module type CoolStringAndRateInt = {
   type rate = int;
   let coolMeter: rate => string;
 };
 module type CoolStringAndRateInt =
   { type rate = int; let coolMeter : rate => string; }

 Reason # module Cool: CoolStringAndRateInt = {
   type rate = int;
   let coolMeter (rate: rate) : string => {
     if (rate <= 5) {
       "Not Cool";
     } else {
       "Cool";
     }
   };
   let popularityMeter (rate: rate) : string => {
     if (rate <= 5) {
       "Not Popular";
     } else {
       "Popular";
     }
   };
 };
 module Cool : CoolStringAndRateInt`
            }
          </CodeHighlighter>
          <p>
            Well, if we we're to include additional types or values that we're not
            defined in the signature they would be hidden. Constraining Modules
            to a signature might be something you want depending on what you are
            using it for, it could be useful for hiding implementation details of
            a module while exposing a public API for the module. Lets take a look
            and make for certain this is the case:
          </p>
          <CodeHighlighter>
            {
`Reason # module type CoolStringAndRateInt = {
   type rate = int;
   let coolMeter: rate => string;
 };
 module type CoolStringAndRateInt =
   { type rate = int; let coolMeter : rate => string; }

 Reason # module Cool: CoolStringAndRateInt = {
   type rate = int;
   let coolMeter (rate: rate) : string => {
     if (rate <= 5) {
       "Not Cool";
     } else {
       "Cool";
     }
   };
   let popularityMeter (rate: rate) : string => {
     if (rate <= 5) {
       "Not Popular";
     } else {
       "Popular";
     }
   };
 };
 module Cool : CoolStringAndRateInt

 Reason # Cool.coolMeter 6;
 - : string = "Cool"

 Reason # Cool.popularityMeter 5;
 Error: Unbound value Cool.popularityMeter`
            }
          </CodeHighlighter>
          <p>
            As soon as we reach for <code>popularityMeter</code> which was not
            defined in the module signature <code>CoolStringAndRateInt</code> Reason
            lets us know that it's an unbound value, and in effect hiding it from
            the public API.
          </p>

          <h2>Interface Files</h2>
          <p>
            In reason you typically write your code in a <code>.re</code> file
            and this implicitly creates a module that has the capitalized name
            of the file. However there are also interface reason files with
            the <code>.rei</code> extension, that will create a module signature
            for the corresponding <code>.re</code> file.
          </p>
          <p>
            So lets say we define a <code>Cool.re</code> file with the following
            contents:
          </p>
          <CodeHighlighter>
            {
`type rate = int;
 let coolMeter (rate: rate) : string => {
   if (rate <= 5) {
     "Not Cool";
   } else {
     "Cool";
   }
 };`
            }
          </CodeHighlighter>
          <p>With a corresponding <code>Cool.rei</code> file :</p>
          <CodeHighlighter>
            {
`type rate = int;
 let coolMeter: rate => string;`
            }
          </CodeHighlighter>
          <p>
            In this case the <code>Cool.rei</code> file will constrain
            the <code>Cool.re</code> file because it will contain the module signature
            of <code>Cool.re</code>. Aside from this <code>.rei</code> files can
            be useful to developers because you can quickly scan over the public
            API of the corresponding <code>.re</code> file.
          </p>
        </div>
      </div>
    );
  }
}

export default Modules;
