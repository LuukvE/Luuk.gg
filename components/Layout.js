import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Header from './Header';
import Footer from './Footer';
import s from './Layout.css';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={s.layout} >
          <Header />
          <div {...this.props} className={cx(s.content, this.props.className)} />
          <Footer />
      </div>
    );
  }
}

export default Layout;
