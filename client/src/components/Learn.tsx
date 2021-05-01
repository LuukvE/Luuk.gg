import './Learn.scss';
import React, { FC, useCallback } from 'react';
import { Redirect, Route, Switch, useHistory, useParams, NavLink } from 'react-router-dom';

import Gist from './Gist';

const Learn: FC = () => {
  const history = useHistory();
  const { index } = useParams<{ index: string }>();

  const active = useCallback((i: number) => (parseInt(index, 10) === i ? 'active' : ''), [index]);

  return (
    <div className="Learn">
      <ul
        onClick={(e) => {
          if (!(e.target instanceof Element)) return;

          if (e.target.tagName !== 'LI') return;

          const children: Element[] = [].slice.call(e.target.parentElement?.children);

          const index = children.indexOf(e.target);

          history.push(`/learn/${index}/${e.target.textContent?.toLowerCase().replace(/ /g, '-')}`);
        }}
      >
        <li className={active(0)}>Learning web development</li>
        <li className={active(1)}>Creating a local website</li>
        <li className={active(2)}>Styling your website</li>
        <li className={active(3)}>Logging to console</li>
        <li className={active(4)}>Selecting elements</li>
        <li className={active(5)}>Using colours</li>
        <li className={active(6)}>Nesting HTML</li>
        <li className={active(7)}>Embedding Youtube</li>
        <li className={active(8)}>Hosting a basic API</li>
        <li className={active(9)}>Making an XHR request</li>
        <li className={active(10)}>Sending JSON</li>
        <li className={active(11)}>Using flexbox</li>
        <li className={active(12)}>Applying margin, padding &amp; border</li>
        <li className={active(13)}>Calling functions</li>
        <li className={active(14)}>Using setTimeout</li>
        <li className={active(15)}>Working with arrays and objects</li>
        <li className={active(16)}>Using libraries with package.json</li>
        <li className={active(17)}>Setting up React</li>
        <li className={active(18)}>Attaching click handlers</li>
        <li className={active(19)}>Attaching change and submit handlers</li>
        <li className={active(20)}>Creating HTTP endpoints</li>
        <li className={active(21)}>Understanding scopes</li>
        <li className={active(22)}>Setting up React Router</li>
        <li className={active(23)}>Writing SCSS</li>
        <li className={active(24)}>Working with React Bootstrap</li>
        <li className={active(25)}>Using useState</li>
        <li className={active(26)}>Using useEffect</li>
        <li className={active(27)}>Using useMemo</li>
        <li className={active(28)}>Using useCallback</li>
        <li className={active(29)}>Using useRef</li>
        <li className={active(30)}>Postioning elements</li>
        <li className={active(31)}>Styling with psuedo selectors</li>
        <li className={active(32)}>Writing TypeScript</li>
        <li className={active(33)}>Defining typed functions</li>
        <li className={active(34)}>Using promises</li>
        <li className={active(35)}>Working with special operators</li>
        <li className={active(36)}>Launching apps with Google Cloud Run</li>
        <li className={active(37)}>Saving cookies</li>
        <li className={active(38)}>Working with HTTP status codes</li>
        <li className={active(39)}>Storing data with Google FireStore</li>
        <li className={active(40)}>Keeping secrets in ENV files</li>
        <li className={active(41)}>Implementing Redux</li>
        <li className={active(42)}>Using React props</li>
      </ul>
      <div className="content">
        <Switch>
          <Route path="/learn/0/learning-web-development">
            <div>
              There are many ways to develop web applications. For these lessons, I have picked a
              specific way in order to shorten your learning journey. Once you master each chapter
              on this page, you will be able to work professionally as a web developer.
            </div>
            <div>
              There are multiple names for developing both sides of a complete website. On one side,
              there is the client / front-end / user interface. On the other, there is the server /
              back-end / API. The client will be downloaded and opened in browsers like Chrome,
              Firefox, Safari and Opera. It will need to adapt to multiple screen sizes and input
              devices like mice and mousepads. You cannot store data in your front-end, since a
              browser will have to download it each time they open your website. Storing data is the
              responsibility of the API. Clients will connect to your API to load data.
            </div>
            <div>
              In my approach, both sides will be written in TypeScript. This language is identical
              to JavaScript, but it adds the ability to provide types to your code. Types allow you
              to know the structure the software expects you to write. I do not expect you to
              understand what that means yet, or how to define types. In the beginning, we will
              write pure JavaScript, and once you understand the basics, we will start adding types.
            </div>
            <div>
              It is common within software engineering, to rely on software written by others. This
              will allow you to write less code, at the cost of having to learn how the software you
              imported works. Imported software is called "a dependency", because your software will
              depend on it. There are two kinds of dependencies. There are libraries, which can be
              used in specific places in your source code to handle a small task for you. And there
              are frameworks, which will require you to write nearly all of your code in the way the
              framework requires you to. Libraries therefore can be easily added or removed from
              your software, but frameworks "lock you in". Changing your chosen framework will
              require a complete rewrite of your code. In these lessons I have chosen all frameworks
              and libraries for you. But once you are on your own, you will need to be careful when
              deciding what software you want your software to depend on.
            </div>
            <div>
              In these lessons the user interface will make use of the React framework. This is
              software written by Facebook and is considered the industry-standard way to build
              complex interfaces. I have built applications without help from frameworks like React.
              And I do not recommend it. Employers will always advertise the framework they use in
              their job openings. And none of them use no framework at all. React is by far the most
              common choice within this field. By teaching you only React, you will still have
              plenty of choices in terms of career. Other frameworks like Angular, Svelte and Vue
              use similair techniques, so the knowledge you will gain will aid you, no matter what
              framework you will want to use in the future.
            </div>
            <div>
              The API will be written with pure NodeJS, without the use of any framework. I have
              purposefully ignored frameworks like ExpressJS, because I believe these tools provide
              us with more problems than solutions. It is our job to fully understand how our
              software works. Therefor, needlessly using software written by others is a mistake.
              Whenever I will use a library, I will explain why I felt forced to use it. There will
              already be a lot of complexity to go through in these lessons. I have tried to keep it
              to the absolute minimum, while still giving you the advantage of not having to write
              everything from scratch.
            </div>
            <div>
              But for now, we can forget about all the complexity, and start at the beginning.
            </div>
            <div>I wish you good luck studying the upcoming chapters.</div>
          </Route>
          <Route path="/learn/1/creating-a-local-website">
            <div>
              Before we can start building even the most basic website, we need to install a program
              to write our source code with. You are free to use any text editor. I recommend{' '}
              <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">
                Visual Studio Code <i className="fas fa-external-link-square-alt" />
              </a>
            </div>
            <div>
              Now you can simply write <code>Hello World</code> in a completely empty file. And save
              it as <code>website.html</code>. Then find the file on your hard disk and double click
              it to open it in your browser. You just created the most useless and unprofessional
              website imaginable, but you did write a website. Good job.
            </div>
            <div>
              The first thing we might want to do, is change the title of your website. The title is
              displayed in the tab of the browser, and currently it will simply say{' '}
              <code>website.html</code>. In order to customise this, we need to write some HTML:{' '}
              <Gist url="LuukvE/b0e2947739351727a90d743ea9c27bd1/website.html" />
            </div>
            <div>
              As you can see, in HTML you can write elements. Elements start with{' '}
              <code>&lt;element&gt;</code> and optionally end with <code>&lt;/element&gt;</code>.
              Those are called the element opening and closing tags. Not all elements have a closing
              tag. If they do not have a closing tag the tag will look like{' '}
              <code>&lt;element /&gt;</code>. This is called a self-closing tag. An example of this
              is the <code>&lt;meta /&gt;</code> tag.
            </div>
            <div>
              By using opening and closing tags, we can put elements inside of other elements. This
              is also called nested elements. From now on we will write all our code inside of the
              body element: <code>&lt;body&gt;Our future code&lt;/body&gt;</code>
            </div>
            <div>
              The body of a website is used to display something on the user interface. The head is
              for all kinds of metadata, including the title of your website.
            </div>
            <div>
              An important thing to realise is that this website is not viewable for anyone except
              you. The source code is saved onto your hard disk. In order for others to see your
              website, you will need to put your code online, this is called hosting. In chapter 36
              we will go through the steps of hosting your website on Google servers. Until then, we
              will keep your code only on your computer.
            </div>
            <div>
              You are now able to write really ugly websites, that offer nothing to the user except
              text. Not a single company would hire you at this point, so we need to continue to
              build on your new knowledge of HTML.
            </div>
            <div>
              I hope this quick introduction was clear, so you can learn how to make websites look
              better in the next chapter:{' '}
              <NavLink to="/learn/2/styling-your-website">Styling your website</NavLink>
            </div>
          </Route>
          {/* <Route path="/learn/2/styling-your-website"></Route> */}
          <Route path="/learn/:index/:chapter">
            <div className="chapter-not-found">This chapter is still being written</div>
          </Route>
          <Redirect to="/learn/0/learning-web-development" />
        </Switch>
      </div>
    </div>
  );
};

export default Learn;
