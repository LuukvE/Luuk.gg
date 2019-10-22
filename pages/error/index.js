import React from 'react';
import cx from 'classnames';
import history from '../../core/history';
import Link from '../../components/Link';
import s from './styles.css';
import bg from '../../components/Layout.css';

class ErrorPage extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
  };

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    if (this.props.error) console.error(this.props.error); // eslint-disable-line no-console

    const [code, title] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      ['Error', 'Oups, something went wrong'];

    return (
      <div className={cx(s.container, bg.layout)}>
        <main className={s.content}>
          <h1 className={s.code}>{code}</h1>
          <p className={s.title}>{title}</p>
          {code === '404' &&
            <p className={s.text}>
              The page you're looking for does not exist or an another error occurred.
            </p>
          }
          <p className={s.text}>
            <a className={s.anchor} href="/" onClick={this.goBack}>Go back</a> or head over to the&nbsp;
            <Link className={s.anchor} to="/">front page</Link>.
          </p>
        </main>
      </div>
    );
  }

}

export default ErrorPage;
