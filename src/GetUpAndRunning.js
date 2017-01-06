import React from 'react';
import Link from 'react-router/Link';
import './prismjs.css';
import CodeHighlighter from './CodeHighlighter.js';

class GetUpAndRunning extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="contentContainer">
          <h1>Get Up & Running</h1>
          <p>
            Getting up and running in reason is a bit different than your
            traditional programming language. Reason embraces sandboxed or
            self-contained environments for programming applications or libraries
            in Reason. So instead of installing reason globally on your machine
            and installing reason tools and editor plugins and configuring all of
            these yourself you use <a target="blank" href="https://reasonml.github.io/ReasonProject/">ReasonProject</a>.
            {" "}It will automatically get this all setup for you.
          </p>
          <CodeHighlighter>
            {
`git clone https://github.com/reasonml/ReasonProject.git [ project name ]
 cd [ project name ]
 npm install`
            }
          </CodeHighlighter>
          <p>
            Once you do this add the following to your <b>.bashrc</b>:
          </p>
          <CodeHighlighter>
            {
`//pick your editor
 export EDITOR=atom
 export EDITOR=vim
 export EDITOR=mvim`
            }
          </CodeHighlighter>
          <p>
            Then run this command in your project directory:
          </p>
          <CodeHighlighter>
            {
              `npm run editor`
            }
          </CodeHighlighter>

          <h2>Refmt</h2>
          <p>
            After you install all of this in your editor you should
            have <code>refmt</code> available to you. It is a powerful tool that
            will allow you to forget about code style and linting. It will
            automatically format your code to what is considered "standard" in
            Reason. This is great for a few reasons but most importantly that your
            code and another persons code will look the same, it will help
            readability and make it easier to understand code that is not your
            own. After you write some code or make changes to code
            type <code>cmd+shift+c</code> to format your code.
          </p>
          <p>
            From here on out you should have:
          </p>
          <ul>
            <li>Syntax Highlighting</li>
            <li>Auto Completion</li>
            <li>In Editor Error Reporting</li>
            <li>Build Tools</li>
            <li>Code Formatting (refmt)</li>
          </ul>
          <p>
            If you want to have a complete list of commands and tools available
            to you please consult the <a target="blank" href="https://reasonml.github.io/ReasonProject/">ReasonProject Documentation</a>.
          </p>

          <h2>Reason Extension</h2>
          <p>
            Reason is new and there aren't many resources out there written in
            Reason. However, because Reason is a new syntax on top of OCaml it
            is possible to convert OCaml to Reason. <a target="blank" href="https://github.com/rickyvetter">Ricky Vetter</a> created <a target="blank" href="https://github.com/rickyvetter/reason-tools">reason-tools</a>
            for this purpose and it seamlessly converts OCaml resources (docs,
            code, etc.) into reason resources. You grab the reason-tools
            extension on <a target="blank" href="https://chrome.google.com/webstore/detail/reason-tools/kmdelnjbembbiodplmhgfjpecibfhadd">chrome</a>/<a target="blank" href="https://addons.mozilla.org/en-US/firefox/addon/reason-tools/">firefox.</a>
          </p>
        </div>
      </div>
    );
  }
}

export default GetUpAndRunning;
