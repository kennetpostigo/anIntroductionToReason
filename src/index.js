import React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import ReactDOM from 'react-dom';
import Introduction from './Introduction';
import GetUpAndRunning from './GetUpAndRunning.js';
import CoreLanguage from './CoreLanguage/CoreLanguage.js';
import Functions from './CoreLanguage/Functions.js';
import Functors from './CoreLanguage/Functors.js';
import Lists from './CoreLanguage/Lists.js';
import Modules from './CoreLanguage/Modules.js';
import Objects from './CoreLanguage/Objects.js';
import Records from './CoreLanguage/Records.js';
import Tuples from './CoreLanguage/Tuples.js';
import Types from './Types/Types.js';
import ReadingTypes from './Types/ReadingTypes.js';
import TypeAliases from './Types/TypeAliases.js';
import Variants from './Types/Variants.js';
import SideNav from './SideNav.js';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <SideNav></SideNav>
      <Match exactly pattern="/" component={Introduction}/>
      <Match pattern="/getupandrunning" component={GetUpAndRunning} />
      <Match exactly pattern="/corelanguage" component={CoreLanguage}/>
      <Match pattern="/corelanguage/functions" component={Functions}/>
      <Match pattern="/corelanguage/functors" component={Functors}/>
      <Match pattern="/corelanguage/lists" component={Lists}/>
      <Match pattern="/corelanguage/modules" component={Modules}/>
      <Match pattern="/corelanguage/objects" component={Objects}/>
      <Match pattern="/corelanguage/records" component={Records}/>
      <Match pattern="/corelanguage/tuples" component={Tuples}/>
      <Match exactly pattern="/types/" component={Types}/>
      <Match pattern="/types/readingtypes" component={ReadingTypes}/>
      <Match pattern="/types/typealiases" component={TypeAliases}/>
      <Match pattern="/types/variants" component={Variants}/>
    </div>
  </Router>,
  document.getElementById('root')
);
