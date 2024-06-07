import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { PICTURES_URI } from "../configs/apiConfig";
import { fetchMovies, fetchTVShows, fetchPersons } from "../services/api";

const DetailScreen = ({ route, navigation }) => {
  const mediaId = route.params?.id;
  const mediaType = route.params?.media_type;
  const [details, setDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let response;
        switch (mediaType) {
          case "movie":
            response = await fetchMovies(mediaId);
            console.log(response);
            break;
          case "tv":
            response = await fetchTVShows(mediaId);
            console.log(response);
            break;
          case "person":
            response = await fetchPersons(mediaId);
            console.log(response);
            break;
          default:
            break;
        }

        setDetails(response ?? {});
        navigation.setOptions({
          title: response[mediaType === "movie" ? "original_title" : "name"],
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mediaId, mediaType]);

  /**
   * Renders a view with details of a media item, such as title, image, description, and additional information.
   * @returns JSX element containing the details view.
   */
  return (
    <View>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {details[mediaType === "movie" ? "original_title" : "name"]}
          </Text>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: `${PICTURES_URI}/${
                mediaType === "person" ? "w200/" : "original"
              }${details?.poster_path ?? details?.profile_path}`,
            }}
          />
          <Text style={styles.description}>
            {details?.overview ?? details.biography}
          </Text>
          {mediaType !== "person" && (
            <Text style={styles.additionalInfo}>
              Popularity: {details?.popularity} |{" "}
              {mediaType === "movie"
                ? `Release Date: ${details?.release_date}`
                : `First Air Date: ${details?.first_air_date}`}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 10,
  },
  additionalInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
});

export default DetailScreen;
