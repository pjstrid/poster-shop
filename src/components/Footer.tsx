import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Linking, StyleSheet, Text, View } from "react-native";

export function Footer() {
  const { t } = useTheme();

  return (
    <View style={[styles.footer, { borderTopColor: t.line }]}>
      <Text style={[styles.text, { color: t.fg }]}>
        Movie data and images from{" "}
        <Text
          style={[styles.link, { color: t.accent }]}
          onPress={() => Linking.openURL("https://www.themoviedb.org")}
        >
          TMDB
        </Text>
      </Text>

      <Text style={[styles.small, { color: t.fg2 }]}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Text>

      <Text style={[styles.text, { color: t.fg }]}>
        Exchange rates from{" "}
        <Text
          style={[styles.link, { color: t.accent }]}
          onPress={() => Linking.openURL("https://frankfurter.dev")}
        >
          Frankfurter
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
  text: {
    fontFamily: fonts.sans,
    fontSize: 14,
    textAlign: "center",
  },
  link: {
    fontFamily: fonts.sansSemi,
    textDecorationLine: "underline",
  },
  small: {
    fontFamily: fonts.sans,
    fontSize: 12,
    textAlign: "center",
    maxWidth: 360,
  },
});
