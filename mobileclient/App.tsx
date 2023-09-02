import { ApolloProvider } from '@apollo/client';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import client from "./apolloGqlClient";
import CardDealer from './CardDealer';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ApolloProvider client={client}>
        <CardDealer />
      </ApolloProvider>
    </SafeAreaView>
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
