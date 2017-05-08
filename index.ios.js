import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ListView,
  Text,
  View,
} from 'react-native';

// define url for http reqs
const URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'

export default class reactMovie extends Component {
  // set the app state
  constructor(props) {
    super(props);
    this.state = {
      // listview only renders data that is being viewed
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      // handles buffer
      loaded: false,
    };
  }

  // fires when parent component is mounted
  componentDidMount() {
    this.fetchData();
  }

  // holds the http req
  fetchData() {
    // gets data using predefined url above -> converts to json -> updates the state
    fetch(URL)
    .then( res => res.json())
    .then( data => {
      console.log(data);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data.movies),
        loaded: true,
      })
    })
    .done()
  }

  render() {
    // sets a loading view until movies state changes
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    // renders the movies based on listview
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.infoSect}>
          <Text style={styles.title}>{movie.title.toUpperCase()}</Text>
          <Text style={styles.subtitle}>year {movie.year ? movie.year : 'not listed'}</Text>
          <Text style={styles.subtitle}>rating {movie.ratings.critics_score}</Text>

        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  infoSect: {
    flex: 1,
  },
  title: {
    color: '#444',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    textAlign: 'left',
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 9,
  },
  listView: {
    paddingTop: 20,
    padding: 10,
    backgroundColor: 'goldenrod',
  }

});

AppRegistry.registerComponent('reactMovie', () => reactMovie);
