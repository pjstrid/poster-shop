import { BackBtn } from "@/components/BackBtn";
import { MOVIES } from "@/mock/movies";
import { useTheme } from "@/theme/useTheme";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function MovieDetails() {
  const { t } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = MOVIES.find((movie) => movie.id === Number(id));

  if (!movie) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <BackBtn />
        <Text style={{ color: t.fg2, marginTop: 24 }}>Movie not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <BackBtn />
      <Text style={{ color: t.fg2, marginTop: 24 }}>{movie.title}</Text>
    </View>
  );
}
