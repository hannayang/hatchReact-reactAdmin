import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { COUNT } from 'apollo/queries';
import { UPDATE_COUNT } from 'apollo/mutations';
import Counter from 'components/Counter';

function CounterContainer() {
  return (
    <Query query={COUNT}>
      {({ data }) => {
        return (
          <Mutation mutation={UPDATE_COUNT}>
            {(updateCount) => {
              return (
                <Counter
                  count={data.count.value}
                  increment={() => {
                    updateCount({
                      variables: { amount: 1 },
                    });
                  }}
                  decrement={() => {
                    updateCount({
                      variables: { amount: -1 },
                    });
                  }}
                />
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default CounterContainer;
