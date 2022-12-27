import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { AppRegistry, ToastAndroid } from 'react-native';
import { Card, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { BottomNavigation, Text, Appbar, TextInput, IconButton, MD3Colors, Chip, Button } from 'react-native-paper';
var dictonary = {
  egg: { boiled: "why are you clicking", boiled2: "you sus", boiled3: "amogus(sus)" },
  app: { name: "MyContainers" },
  search: { inputtitle: "Search" },
  options: { sort: "Sort", nosort: "No Sort" }
}
function ExampleCard(props) {
  var theme = useTheme();
  return (
    <Card>
      <Card.Cover source={{ uri: props.image }} />
      <Card.Title titleVariant='headlineSmall' subtitleVariant='bodyLarge' subtitleStyle={{ fontWeight: "700", flex: 1, backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }} title={props.name} subtitle={props.code} />
      <Card.Content>
      </Card.Content>
      <Card.Actions>
        <Chip style={{ width: 200 }} icon='archive' onPress={() => setFilter({ ...filter, sort: !filter.sort })}>
          Big box
        </Chip>
      </Card.Actions>
    </Card>
  )
}
function App() {
  var theme = useTheme();
  var filtry = {
    sort: false
  }
  var data = [
    { image: 'https://picsum.photos/700', name: 'testjmy', code: 'AB', id: '4275988' },
    { image: 'https://picsum.photos/700', name: 'testuj', code: 'D7', id: 'is9w948' },
    { image: 'https://picsum.photos/700', name: 'tester', code: 'C0', id: '2g98284' },
  ]
  const [eggClick, setEggClick] = React.useState(0);
  const [text, setText] = React.useState("");
  const [filter, setFilter] = React.useState(filtry)
  function clicks() {
    setEggClick(eggClick + 1);
    if (eggClick == 5) {
      ToastAndroid.show(dictonary.egg.boiled, ToastAndroid.SHORT);
    }
    else if (eggClick > 10 && eggClick < 20) {
      ToastAndroid.show(dictonary.egg.boiled2, ToastAndroid.TOP);
    }
    else if (eggClick > 20) {
      ToastAndroid.show(dictonary.egg.boiled3, ToastAndroid.TOP);
    }
  }
  return (
    <>
      <StatusBar style="auto" />
      <Appbar.Header>
        <Appbar.Action icon="archive" iconColor={theme.colors.primary} onPress={() => { clicks() }} />
        <Appbar.Content title={dictonary.app.name} />
        <Appbar.Action icon="home-edit" onPress={() => { }} />
        <Appbar.Action icon="magnify" onPress={() => { }} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={{
          margin: 16,
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
          <TextInput
            style={{ flex: 4 }}
            label={dictonary.search.inputtitle}
            value={text}
            onChangeText={text => setText(text)}
          />
          <IconButton
            icon="magnify"
            mode='contained-tonal'
            size={32}
            onPress={() => console.log('Pressed')}
          />
        </View>
        <Text variant='headlineSmall'>{"Kowalski' House"}</Text>
        <Chip style={{ width: 200 }} icon={filter.sort ? 'sort-variant' : 'sort-reverse-variant'} mode={filter.sort ? 'flat' : 'outlined'} onPress={() => setFilter({ ...filter, sort: !filter.sort })}>
          {filter.sort ? dictonary.options.sort : dictonary.options.nosort}
        </Chip>
        <View>
          <FlatList data={data} renderItem={({ item }) => {return <ExampleCard image={item.image} title={item.name} code={item.code} /> }} keyExtractor={item => item.id} />
        </View>
      </View>
    </>

  );
}

export default function Main() {
  return (
    <PaperProvider>
      <MyComponent />
    </PaperProvider>
  );
}

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'albums', title: 'Favorite', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'recents', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: App,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 8
  },
});
