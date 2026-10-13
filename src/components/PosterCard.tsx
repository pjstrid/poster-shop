import { useFormatPrice } from "@/hooks/useFormatPrice";
import { useTheme } from "@/theme/useTheme";
import { TmdbMovie } from "@/types/tmdb";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  movie: TmdbMovie;
  onPress?: () => void;
};

export function PosterCard({ movie, onPress }: Props) {
  const { t } = useTheme();
  const year = movie.release_date.slice(0, 4);
  const format = useFormatPrice();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
    >
      {movie.poster_path ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
          }}
          style={styles.poster}
        />
      ) : (
        <View
          style={[
            styles.poster,
            { backgroundColor: t.surface, borderColor: t.line },
          ]}
        >
          <Text style={[styles.title, { color: t.fg }]} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
      )}

      <Text style={[styles.title, { color: t.fg }]} numberOfLines={2}>
        {movie.title}
      </Text>
      <Text style={[styles.year, { color: t.fg2 }]}>{year}</Text>
      <Text style={[styles.price, { color: t.accent }]}>
        from {format(199)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: "100%" },
  poster: {
    aspectRatio: 2 / 3,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: { textAlign: "center", fontSize: 13 },
  title: { marginTop: 12, fontSize: 14, fontWeight: "600", lineHeight: 18 },
  year: { marginTop: 4, fontSize: 12 },
  price: { marginTop: 4, fontSize: 14, fontWeight: "600" },
});
