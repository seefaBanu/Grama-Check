import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Loading from './Loading';
import FadeComponent from './FadeComponent';

export default function (props) {
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  function onRefresh() {
    setRefreshing(true);
    props.getData().then(() => setRefreshing(false));
  }
  React.useEffect(() => {
    props.getData().then(() => setLoaded(true));
  }, [props.getData]);
  return !loaded ? (
    <Loading />
  ) : (
    <ScrollView
      howsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FadeComponent>{props.children}</FadeComponent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    width: '100%',
  },
});
