import './Restaurants.scss';
import React, { FC, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import { useSelector } from '../store';
import useRestaurants from '../hooks/useRestaurants';

const Restaurants: FC = () => {
  const { getAll, loading } = useRestaurants();
  const items = useSelector((state) => state.restaurants.items);

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <div className="Restaurants">
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Description</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, name, description, url, categories }) => (
              <tr key={id}>
                <td className="nowrap">
                  <a href={url} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </td>
                <td className="nowrap">{description}</td>
                <td>
                  {Object.values(categories)
                    .map((c) => c.name)
                    .join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Restaurants;
