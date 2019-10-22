import React from 'react';
import moment from 'moment';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import Flag from '../../components/Flag';
import s from './styles.css';

class DetailPage extends React.Component {

  render() {
    const tournament = this.props.tournaments.find(tournament =>

      tournament.id == this.props.params.id

    ) || {};

    return (
      <Layout className={s.content}>
        <div className={s.detailCard}>
          <h1>
            {tournament.name}
            <small className={s.subtext}>
              <Flag country={tournament.country} />
              &nbsp;{tournament.city}
            </small>
          </h1>
          
          <small>Start: {moment(tournament.date_start.split(' ')[0]).format('D MMM YYYY')}</small><br />
          <small>End: {moment(tournament.date_end.split(' ')[0]).format('D MMM YYYY')}</small><br />
          <br />
          <h1>{tournament.series.name}</h1>
          <small>Start: {moment(tournament.series.date_start).format('D MMM YYYY')}</small><br />
          <small>End: {moment(tournament.series.date_end).format('D MMM YYYY')}</small>
          <br />
          <Link to="/">
            <i className="material-icons">keyboard_backspace</i>
            Go back
          </Link>
        </div>
      </Layout>
    );
  }

}

export default DetailPage;
