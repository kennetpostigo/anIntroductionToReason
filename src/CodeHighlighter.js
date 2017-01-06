import React, { PureComponent, PropTypes } from 'react';
import Prism from 'prismjs';
Prism.languages.reason=Prism.languages.extend("clike",{comment:{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},string:{pattern:/"(\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,greedy:!0},"class-name":/\b[A-Z]\w*/,keyword:/\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,operator:/\.{3}|:[:=]|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/}),Prism.languages.insertBefore("reason","class-name",{character:{pattern:/'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'])'/,alias:"string"},constructor:{pattern:/\b[A-Z]\w*\b(?!\s*\.)/,alias:"variable"},label:{pattern:/\b[a-z]\w*(?=::)/,alias:"symbol"}}),delete Prism.languages.reason.function;
class CodeHighlighter extends PureComponent {
  componentDidMount() {
    this.hightlight();
  }

  componentDidUpdate() {
    this.hightlight();
  }

  hightlight() {
    Prism.highlightElement(this.prismNode, this.props.async);
    if (this.props.plugins) {
      this.props.plugins.map((plugin) => plugin.func(Prism));
    }
  }

  render () {
    return (
      <pre className={(this.props.plugins) ? this.props.plugins.map((plugin) => plugin.title).join(" ") : ''}
           data-line={this.props.dataLine || ''}
           data-dependecies={this.props.dataDependecies || ''}
           data-user={this.props.dataUser || ''}
           data-host={this.props.dataHost || ''}
           data-prompt={this.props.dataPrompt || ''}
           data-output={this.props.dataOutput || ''} >
        <code
          ref={(prismNode) => this.prismNode = prismNode}
          className={`language-reason`}
        >
          {this.props.children}
        </code>
      </pre>

    );
  }
}

export default CodeHighlighter;
