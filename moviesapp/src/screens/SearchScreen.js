import { View, Text, TextInput, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import {  Image, Button } from "react-native";
import { fetchSearchResults } from "../services/api";
import CustomSelectInput from "../components/CustomSelectInput";


const SearchScreen = (props) => {
  const FILTER_OPTIONS = {
    MULTI: "multi",
    MOVIES: "movie",
  };

  const [movies, setMovies] = useState([]);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.MULTI);
  const [searchQuery, setSearchQuery] = useState("");

  const search_movie = async () => {
    try {
      const response = await fetchSearchResults(filterBy, searchQuery);
      setMovies(response?.results?.length > 0 ? response.results : []);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Renders a search view with a search bar, category selection, and movie results.
   * @returns JSX element containing the search view components.
   */
  return (
    <View style={{flex: 1}}>
      <View style={SeachStyles.searchBarContainer}>
        <TextInput
          style={SeachStyles.searchBar}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View>
        <View style={{ padding: 10 }}>
          <CustomSelectInput
            data={Object.values(FILTER_OPTIONS)}
            value={filterBy}
            onSelect={setFilterBy}
            placeHolder="Select Category"
          />
        <Button
          style={SeachStyles.button}
          title="Search"
          mode="contained"
          onPress={search_movie}
        >
          Search
        </Button>
        </View>
      </View>
      <View>
          <FlatList
            style={{ paddingBottom: 200 }}
            ListHeaderComponent={<ScrollView></ScrollView>}
            data={movies}
            ListEmptyComponent={() => (
              <Text style={SeachStyles.emptyMessage}>
                Please initiate a search!
              </Text>
            )}
            renderItem={({ item, idx }) => (
              <View style={SeachStyles.card} key={idx}>
                <Image
                  style={SeachStyles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <View style={SeachStyles.details}>
                  <Text style={SeachStyles.title}>{item.title}</Text>
                  <Text style={SeachStyles.popularity}>
                    Popularity : {item.popularity}
                  </Text>
                  <Text style={SeachStyles.release}>
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
                    style={SeachStyles.button}
                  />
                </View>
              </View>
            )}
          />
      </View>
    </View>
  );
};

const SeachStyles = {
  searchBarContainer: {
    width: "100%",
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
};

export default SearchScreen;
