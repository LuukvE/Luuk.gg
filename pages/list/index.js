import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import Flag from '../../components/Flag';
import s from './styles.css';

class ListPage extends React.Component {

  static propTypes = {
    tournaments: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.toggleSeries = this.toggleSeries.bind(this);
  }

  state = {
    selectedSeries: [],
    startDate: null,
    endDate: null
  }

  handleStartClick(day, { selected }) {
    this.setState({ startDate: selected ? null : day });
  }

  handleEndClick(day, { selected }) {
    this.setState({ endDate: selected ? null : day });
  }

  toggleSeries(event) {
    const { checked, dataset } = event.target;
    const { selectedSeries } = this.state;
    const index = selectedSeries.indexOf(dataset.id);
    const update = selectedSeries.slice();

    if(index == -1 && checked) update.push(dataset.id);
    else if(!checked) update.splice(index, 1);

    this.setState({ selectedSeries: update });
  }
  
  render() {
    const { startDate, endDate, selectedSeries } = this.state;
    const series = this.props.tournaments.reduce((series, tournament) => {
      series[tournament.series.id] = tournament.series;
      return series;
    }, {});

    return (
      <Layout className={cx(s.content, s.rowLayout)}>
        <aside className={s.filters}>
          <h3>Series</h3>
          <ul>
            {Object.keys(series).map((id, i) =>
              <li key={i}>
                <label>
                  <input data-id={id} onChange={this.toggleSeries} type="checkbox" />
                  {series[id].name}
                </label>
              </li>
            )}
          </ul>
          <h3>Starts at</h3>
          <DayPicker
            onDayClick={this.handleStartClick}
            selectedDays={startDate}
          />
          <h3>Ends at</h3>
          <DayPicker
            onDayClick={this.handleEndClick}
            selectedDays={endDate}
          />
        </aside>
        <div className={s.tournaments}>
          {this.props.tournaments.map((tournament, i) => {
            const tourStart = moment(tournament.date_start.split(' ')[0]);
            const tourEnd = moment(tournament.date_end.split(' ')[0]);
            if(startDate && tourStart < moment(startDate)) return;
            if(endDate && tourEnd > moment(endDate)) return;
            if(selectedSeries.length && selectedSeries.indexOf(`${tournament.series.id}`) == -1) return;
            return (
              <Link key={i} to={`/tournament/${tournament.id}`}>
                <Flag country={tournament.country} />
                &nbsp;{tournament.name}
                <small>{tourStart.format('D MMM YYYY')}</small>
              </Link>
            );
          })}
        </div>
      </Layout>
    );
  }

}

export default ListPage;
