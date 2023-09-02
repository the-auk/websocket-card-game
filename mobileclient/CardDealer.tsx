import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';

// This is an example query. Replace this with what you need
const EXAMPLE_QUERY = gql`
  query example {
    exampleObjects {
      foo
      bar
    }
  }
`;

// This is an example rendering. Replace this with what you need
export default function CardDealer() {
  const {data, loading, error} = useQuery(EXAMPLE_QUERY);

  if (loading) {
    return (
      <View style={styles.container}>
        {<Text>Loading...</Text>}
      </View>
    );
  }

  if (error != null) {
    return (
      <View style={styles.container}>
        {<Text>Error</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.exampleObjects.map(exampleObject => <Text key={exampleObject.foo}>{exampleObject.foo}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
