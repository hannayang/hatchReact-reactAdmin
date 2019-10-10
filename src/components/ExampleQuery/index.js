import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import css from './styles.module.css';

const ExampleQuery = ({ data }) => {
  const { allStarships, loading, error } = data;
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={css.container}>
      <h2>Starships</h2>
      {!!allStarships && (
        <ul className={css.starships}>
          {allStarships.map((starship) => (
            <li className={css.starship} key={starship.id}>
              <h3>{starship.name}</h3>
              Hyperdrive Rating: <b>{starship.hyperdriveRating}</b>
              <br />
              Crew: <b>{starship.crew}</b>
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ExampleQuery.propTypes = {
  data: PropTypes.object.isRequired,
};

// You can run this query at https://api.graph.cool/simple/v1/swapi
export default graphql(gql`
  query AllStarshipsQuery {
    allStarships(first: 6, orderBy: name_ASC) {
      id
      name
      hyperdriveRating
      crew
      passengers
    }
  }
`)(ExampleQuery);
