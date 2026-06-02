import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../theme/colors";
import YoutubeIframe from "react-native-youtube-iframe";

export const VideoPlaceholder = ({ videoThumbnail }) => {
  const searchParams = new URLSearchParams(videoThumbnail.split('?')[1])

  return (
    <View style={styles.videoContainer}>
      <YoutubeIframe
        videoId={searchParams.get('v')}
        height={200}
      />
      {/* <View style={styles.videoPlaceholder}>
            <View style={styles.playButton}>
                <View style={styles.playIcon} />
            </View>
            <Text style={styles.videoLabel}>Visualizar Exercício</Text>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    height: 180
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: "#1A3C28",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 20,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: colors.white,
    marginLeft: 4,
  },
  videoLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
});
