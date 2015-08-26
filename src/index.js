'use strict';

import React from 'react';
import App from './App';
import Hero from './Hero';
import Navbar from './Navbar';
import ContentSection from './ContentSection';
import CodeBlock from './CodeBlock';
import CodeDemo from './CodeDemo';
import MyButton from './examples/MyButton';
import ToggleButton from './examples/ToggleButton';
import { INSTALL, LIPSUM, BASIC_EXAMPLE, ADVANCED_EXAMPLE } from './strings';

const APP = (
  <App>
    <link href='http://fonts.googleapis.com/css?family=Fira+Sans:400,300' rel='stylesheet' type='text/css' />
    <Hero />
    <Navbar />
    <ContentSection name="Install">
      <CodeBlock
        lang="bash"
        code={INSTALL}
        large
        center
        style={{ textAlign: 'center' }}
      />
    </ContentSection>

    <ContentSection name="Intro">
      <h2>React Styling. Plain and Simple.</h2>
      <p>
        Classy makes styling React components *composable*, *extensible*, and *simple*.
        Usage requires only 3 steps:
      </p>
      <ul>
        <li>Import <code>react-classy</code> into your React component module.</li>
        <li>Decorate your React component with <code>@Classy</code>.</li>
        <li>Declare a static <code>style</code> prop on your React component.</li>
      </ul>
      <p>
        The styles defined on your React component will get automatically injected into
        the DOM right before your component mounts. Check out some basic and advanced
        examples in the next section.
      </p>
    </ContentSection>
    <div id="examples" />
    <ContentSection name="Basics">
      <h2>Basics</h2>
      <p>
        Let's say you have a file called <code>MyButton.js</code> in which you
        plan to create a simple button React component. Here's how you might
        use Classy to encapsulate your component's styles inside of an ES7
        class definition.
      </p>
      <CodeDemo height="300px">
        <MyButton />
      </CodeDemo>
      <CodeBlock code={BASIC_EXAMPLE} />
    </ContentSection>

    <ContentSection name="Advanced">
      <h2>Advanced</h2>
      <p>
        Classy is also highly customizable and supports asynchronous style
        rendering, custom middleware, and theming! In the next example, we'll
        demonstrate all of the aforementioned while creating a button that
        switches themes when clicked.
      </p>
      <CodeDemo height="300px">
        <ToggleButton />
      </CodeDemo>
      <CodeBlock code={ADVANCED_EXAMPLE} />
    </ContentSection>

    <ContentSection name="Recipes">
      <h2>Recipes</h2>
      <p>
        <span>More examples coming soon... For now, take a look at our </span>
        <a href="https://github.com/inturn/classy/tree/gh-pages">gh-pages branch</a>
        <span> to see how we used it to style this website.</span>
      </p>
    </ContentSection>

    <ContentSection name="Rationale">
      <h2>Rationale</h2>
      <p>Classy was created with the following principles in mind:</p>
      <ul>
        <li>Composability (es7)</li>
        <li>Simplicity (plain css)</li>
        <li>Flexibility (middleware/async)</li>
        <li>Extensibility (shareable!)</li>
      </ul>
      <p>We'll elaborate more on our motivation and process in an upcoming blog post :)</p>
    </ContentSection>
    <ContentSection name="footer">
      <p style={{ textAlign: 'center' }}>
        Lovingly crafted by the developers at <a target="_blank" href="http://inturn.co">INTURN</a>.
      </p>
      <p style={{ textAlign: 'center' }}>
        Interested in joining our team? <a target="_blank" href="http://jobs.inturn.co/">Check out our open positions</a>.
      </p>
      <img
        style={{ display: 'block', margin: 'auto' }}
        height="50px"
        src="http://inturn-co.squarespace.com/assets/madeinnyc@2x.png"
      />
    </ContentSection>
  </App>
);

React.render(APP, document.getElementById('root'));
