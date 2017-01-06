import React from 'react';
import Link from 'react-router/Link';
import './../prismjs.css';
import CodeHighlighter from './../CodeHighlighter.js';


class Functors extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Functors</h1>
          <blockquote>
            <p>
              If you haven't read the <Link to="/anIntroductionToReason/corelanguage">Core Language Overview </Link>
              please do before diving deeper.
            </p>
          </blockquote>
          <p>
            Module Functions are commonly referred to as Functors in the OCaml
            Reason Community. Functors are special functions that can operate on
            modules. They give you the power to pass modules and signatures through
            functions to extend the behavior of modules, help structure your code
            better, and instantiate modules with state and more!
          </p>
          <p>
            Lets take a look at usage of functors:
          </p>
          <CodeHighlighter>
            {
`Reason # module type Car = {
   type y = int;
   type m = string;
   let year: y;
   let make: m;
 };
 module type Car =
   { type y = int; type m = string; let year : y; let make : m; }

 Reason # module SpeedRacin = fun (C: Car) => {
   type whip = {year: C.y, make: C.m};
   let myWhip = {year: C.year, make: C.make};
   let drive (w: whip) =>
     "Pull off the lot in my " ^ string_of_int w.year ^ " " ^ w.make ^ " Speed Racin!";
 };
 module SpeedRacin :
   (C : Car) => {
      type whip = { year : year, make : make, };
      let myWhip : whip;
      let drive : whip => make;
    }`
            }
          </CodeHighlighter>
          <p>
            What we've done is first define a module signature <code>Car</code> so
            that we can use it when typing the module parameter of the functor <code>SpeedRacin</code>.
            In the <code>SpeedRacin</code> module {'function'}/functor there should be
            a few things that stand out to you. First that we bind the {'function'}
            to <code>module</code> rather than <code>let</code>. Second that we
            distinguish <code>SpeedRacin</code> as functor vs a regular module
            by using the fun keyword. Within the body of the functor we define
            the <code>whip</code> record type and the record value <code>myWhip</code> both
            which depend on types and values from the <code>C</code> parameter passed
            in. Finally we finish the functor off by defining the <code>drive</code> {'function'}
            that will output a string with the values of a record of type <code>whip</code>.
          </p>
          <p>
            Now lets see the functor in action:
          </p>
          <CodeHighlighter>
            {
`Reason # module Honda1996 = {
   type y = int;
   type m = string;
   let year = 1996;
   let make = "Honda";
 };
 module Honda1996 :
   { type y = year; type m = make; let year : y; let make : m; }


 Reason # module HondaGoVroom = SpeedRacin Honda1996;
 module HondaGoVroom :
   {
     type whip = SpeedRacin(Honda1996).whip = { year : year, make : make, };
     let myWhip : whip;
     let drive : whip => make;
   }


 Reason # let speedinOffInWhat = HondaGoVroom.drive  HondaGoVroom.myWhip;
 let speedinOffInWhat : make = "Pull off the lot in my 1996 Honda Speed Racin!"`
            }
          </CodeHighlighter>
          <p>
            Before we put the functor to use, lets define module <code>Honda1996</code> so
            that we can pass it to the functor as a parameter. <code>Honda1996</code> seems
            to implement the <code>Car</code> signature but we don't type it explicitly
            when defining it. Now, lets use the functor! We're going to define a
            module <code>HondaGoVroom</code> that is going to be set to the module
            that our <code>SpeedRacin</code> functor returns. We pass <code>SpeedRacin</code> our
            {" "}<code>Honda1996</code> module which from the definition of <code>SpeedRacin</code> must
            implement the <code>Car</code> signature. This is because we set the parameter type to <code>Car</code>
            {""} it will constrain the parameter to the <code>Car</code>{"'"}s signature.
            After we run the code we are returned a module from the functor that
            is bound to <code>HondaGoVroom</code> .
          </p>
          <p>
            Lastly, we invoke the <code>HondaGoVroom.drive</code> {'function'} and
            pass it the <code>HondaGoVroom.myWhip</code> record, and it will
            successfully output <code>"Pull off the lot in my 1996 Honda Speed Racin!"</code>
            {" "}and bind it to <code>speedinOffInWhat</code> variable.
          </p>
          <p>
            Just like that, we're using functors! Since functors return modules
            can we type them as well? The answer is yes! We do it the same way
            we constrain regular modules:
          </p>
          <CodeHighlighter>
            {
`Reason # module type Car = {
   type y = int;
   type m = string;
   let year: y;
   let make: m;
 };
 module type Car =
   { type y = int; type m = string; let year : y; let make : m; }


 Reason # module type Racin = (SpeedRacinCar: Car) => {
   type whip = {year: SpeedRacinCar.y, make: SpeedRacinCar.m};
   let myWhip: whip;
   let drive: whip => string;
 };
 module type Racin =
   (SpeedRacinCar : Car) => {
      type whip = { year : int, make : string, };
      let myWhip : whip;
      let drive : whip => string;
    }


 Reason # module SpeedRacin: Racin = fun (C: Car) => {
   type whip = {year: C.y, make: C.m};
   let myWhip = {year: C.year, make: C.make};
   let drive (w: whip) =>
     "Pull of the lot in my " ^ string_of_int w.year ^ " " ^ w.make ^ " Speed Racin!";
 };
 module SpeedRacin : Racin`
            }
          </CodeHighlighter>
          <p>
            This should look familiar to you! The only difference is that we
            assert the <code>Racin</code> type on the functor just like we would
            on modules <code>module SpeedRacin: Racin</code>.
          </p>
        </div>
      </div>
    );
  }
}

export default Functors;
