import './Career.scss';
import React, { FC, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {
  differenceInDays,
  format,
  add,
  sub,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  parseISO
} from 'date-fns';

import useGithub from '../hooks/useGithub';
import useQuery from '../hooks/useQuery';
import { useSelector } from '../store';

import GoogleMap from './GoogleMap';

const Career: FC = () => {
  const { query, setQuery } = useQuery();
  const { getContributions, loading } = useGithub();
  const { total, contributions } = useSelector((state) => state.github);
  const view = query.date ? parseISO(`${query.date}-01`) : new Date();
  const start = startOfWeek(startOfMonth(view), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(view), { weekStartsOn: 1 });
  const days = differenceInDays(end, start);

  // When loading the page, load all Github contributions from the API
  useEffect(() => {
    getContributions();
  }, [getContributions]);

  if (loading) {
    return (
      <div className="Career">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="Career">
      <div className="calendar-heading">
        <h1>
          <i className="fab fa-github" /> Github Activity
        </h1>
        <div className="switch-month">
          <span
            onClick={() => {
              setQuery({ date: format(sub(view, { months: 1 }), 'yyyy-MM') });
            }}
            className="icon"
          >
            <i className="fas fa-chevron-left" />
          </span>
          <div className="center">{format(view, 'MMMM yyyy')}</div>
          <span
            onClick={() => {
              setQuery({ date: format(add(view, { months: 1 }), 'yyyy-MM') });
            }}
            className="icon"
          >
            <i className="fas fa-chevron-right" />
          </span>
        </div>
        <span className="total">
          {new Intl.NumberFormat().format(total)} contributions since 2011
        </span>
      </div>
      <div className="weekdays">
        {new Array(7).fill(null).map((_, index) => (
          <div key={index}>{format(new Date(2018, 0, index + 1), 'EEEE')}</div>
        ))}
      </div>
      {new Array(Math.ceil(days / 7)).fill(null).map((_, weekIndex) => (
        <div key={weekIndex} className="week">
          {new Array(7).fill(null).map((_, dayIndex) => {
            const day = add(start, { days: weekIndex * 7 + dayIndex });
            const date = format(day, 'yyyy-MM-dd');
            const currentMonth = format(day, 'MM') === format(view, 'MM');

            return (
              <div
                className={`day${!currentMonth ? ' not-current-month' : ''}${
                  contributions[date] !== undefined
                    ? ` level-${Math.ceil(
                        (contributions[date] > 15 ? 15 : contributions[date]) / 3
                      )}`
                    : ''
                }`}
                key={dayIndex}
              >
                <span>{format(day, 'd')}</span>
                {!!contributions[date] && (
                  <div>
                    {contributions[date]}
                    <small>Contribution{contributions[date] !== 1 && 's'}</small>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <GoogleMap />
    </div>
  );
};

export default Career;
