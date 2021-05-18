import React from 'react';

import NotSupportedBrowserStyles from './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotSupportedBrowserComponent = () => {
  return (
    <div className={NotSupportedBrowserStyles.holder}>
      <div className={NotSupportedBrowserStyles.container}>
        <div className={NotSupportedBrowserStyles.wrapper}>
          <FontAwesomeIcon icon="exclamation-triangle" />
          <h1>Browser not supported!</h1>
          <p>
            Bummer, you are using an ancient browser!
            <br />
            Your privacy and security is our main concern. Because of this reason our site does not support your
            browser.
          </p>
          <p>To solve the issue you can use one of the following browsers:</p>
          <ul>
            <li>
              <a href="https://bestvpn.org/outdatedbrowser/nl">Microsoft Edge</a>
            </li>
            <li>
              <a href="https://bestvpn.org/outdatedbrowser/nl">Google Chrome</a>
            </li>
            <li>
              <a href="https://bestvpn.org/outdatedbrowser/nl">Apple Safari</a>
            </li>
            <li>
              <a href="https://bestvpn.org/outdatedbrowser/nl">Firefox</a>
            </li>
            <li>
              <a href="https://bestvpn.org/outdatedbrowser/nl">Opera</a>
            </li>
          </ul>
          <p>
            We strongly advice you to change to one of above browsers. Microsoft is only providing security related
            fixes for your browser and should only be used for accessing old sites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotSupportedBrowserComponent;
