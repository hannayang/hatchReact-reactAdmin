import { COUNT } from './queries';

export default {
  Mutation: {
    updateCount: (obj, { amount }, { cache }) => {
      const { count } = cache.readQuery({
        query: COUNT,
      });
      cache.writeQuery({
        query: COUNT,
        data: {
          count: {
            ...count,
            value: count.value + amount,
          },
        },
      });
      return null;
    },
  },
};
