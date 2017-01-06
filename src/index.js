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
      <Match exactly pattern="/anIntroductionToReason/" component={Introduction}/>
      <Match exactly pattern="/anIntroductionToReason" component={Introduction}/>
      <Match pattern="/anIntroductionToReason/getupandrunning" component={GetUpAndRunning} />
      <Match exactly pattern="/anIntroductionToReason/corelanguage" component={CoreLanguage}/>
      <Match pattern="/anIntroductionToReason/corelanguage/functions" component={Functions}/>
      <Match pattern="/anIntroductionToReason/corelanguage/functors" component={Functors}/>
      <Match pattern="/anIntroductionToReason/corelanguage/lists" component={Lists}/>
      <Match pattern="/anIntroductionToReason/corelanguage/modules" component={Modules}/>
      <Match pattern="/anIntroductionToReason/corelanguage/objects" component={Objects}/>
      <Match pattern="/anIntroductionToReason/corelanguage/records" component={Records}/>
      <Match pattern="/anIntroductionToReason/corelanguage/tuples" component={Tuples}/>
      <Match exactly pattern="/anIntroductionToReason/types" component={Types}/>
      <Match pattern="/anIntroductionToReason/types/readingtypes" component={ReadingTypes}/>
      <Match pattern="/anIntroductionToReason/types/typealiases" component={TypeAliases}/>
      <Match pattern="/anIntroductionToReason/types/variants" component={Variants}/>
    </div>
  </Router>,
  document.getElementById('root')
);
