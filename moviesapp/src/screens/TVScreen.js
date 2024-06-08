import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Button } from "react-native";
import { fetchTVShows } from "../services/api";
import CustomSelectInput from "../components/CustomSelectInput";


const TVScreen = (props) => {
  const FILTER_OPTIONS = {
    AIRING_TODAY: "airing_today",
    ON_THE_AIR: "on_the_air",
    POPULAR: "popular",
    TOP_RATED: "top_rated",
  };

  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.POPULAR);
  const [tvShows, setTVShows] = useState([]);
  useEffect(() => {
    const fetchTVShowsData = async () => {
      const data = await fetchTVShows(filterBy);
      setTVShows(data.results);
    };

    fetchTVShowsData();
  }, [filterBy]);

  /**
   * Renders a view with a custom select input and a list of TV shows.
   * @returns JSX element containing the view with select input and TV show list.
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
            data={tvShows}
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
                    Release Date : {item.first_air_date}
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
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.2)",
    elevation: 5,
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
export default TVScreen;
