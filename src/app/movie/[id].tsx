import { BackBtn } from "@/components/BackBtn";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { MOVIES } from "@/mock/movies";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function MovieDetails() {
  const { t } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = MOVIES.find((movie) => movie.id === Number(id));
  const { isDesktop } = useIsDesktop();

  const padding = isDesktop ? 48 : 16;

  if (!movie) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <BackBtn />
        <Text style={{ color: t.fg2, marginTop: 24 }}>Movie not found</Text>
      </View>
    );
  }

  const year = movie.release_date.slice(0, 4);

  return (
    <ScrollView contentContainerStyle={[styles.content, { padding }]}>
      <BackBtn />

      {/* Poster */}
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "70%", maxWidth: 320 }}>
          <View
            style={[
              styles.poster,
              { backgroundColor: t.surface, borderColor: t.line },
            ]}
          >
            <Text
              style={{ fontFamily: fonts.sansBold, color: t.fg }}
              numberOfLines={2}
            >
              {movie.title}
            </Text>
          </View>
        </View>
      </View>

      {/* Title + info */}
      <View>
        <Text
          style={[styles.title, { color: t.fg, fontSize: isDesktop ? 72 : 48 }]}
        >
          {movie.title}
        </Text>
        <Text style={{ color: t.fg2, fontSize: 14 }}>
          <Text style={{ color: t.fg, fontFamily: fonts.sansSemi }}>
            {year}
          </Text>
          {"  ·  "}Directed by {movie.director}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 24,
    paddingBottom: 48,
  },
  title: {
    fontFamily: fonts.display,
    lineHeight: undefined,
  },
  poster: {
    aspectRatio: 2 / 3,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});
