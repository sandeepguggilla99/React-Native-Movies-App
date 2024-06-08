import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Button } from "react-native";
import { fetchMovies } from "../services/api";
import CustomSelectInput from "../components/CustomSelectInput";

const MovieScreen = (props) => {
  const FILTER_OPTIONS = {
    NOW_PLAYING: "now_playing",
    POPULAR: "popular",
    TOP_RATED: "top_rated",
    UPCOMING: "upcoming",
  };

  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.POPULAR);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const data = await fetchMovies(filterBy);
      setMovies(data.results);
    };

    fetchMoviesData();
  }, [filterBy]);

  /**
   * Renders a view with a custom select input and a list of movies.
   * @returns JSX element containing the view with select input and movie list.
   */
  return (
    <View style={{ flex: 1 }}>
      <View contentContainerStyle={styles.selectInputContainer}>
        <CustomSelectInput
          data={Object.values(FILTER_OPTIONS)}
          value={filterBy}
          onSelect={setFilterBy}
          placeHolder="Select Category"
        />
      </View>
      <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={<ScrollView></ScrollView>}
            data={movies}
            renderItem={({ item, idx }) => (
              <View style={styles.card} key={idx}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <View style={styles.details}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.popularity}>
                    Popularity : {item.popularity}
                  </Text>
                  <Text style={styles.release}>
                    Release Date : {item.release_date}
                  </Text>
                  <Button
                    onPress={() =>
                      props.navigation.navigate("Details", {
                        id: item.id,
                        media_type: "movie",
                      })
                    }
                    title="Details"
                    style={styles.button}
                  />
                </View>
              </View>
            )}
          />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.2)",
    elevation: 5,
  },
  selectInputContainer: {
    backgroundColor: "white",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  popularity: {
    fontSize: 14,
  },
  release: {
    fontSize: 14,
  },
  button: {
    marginTop: 10,
  },
});
export default MovieScreen;
