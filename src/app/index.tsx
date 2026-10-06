import { PosterCard } from "@/components/PosterCard";
import { MOVIES } from "@/mock/movies";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { t, name, toggle } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: fonts.display, fontSize: 40, color: t.fg }}>
        Popular
      </Text>

      <Pressable onPress={toggle} style={{ marginVertical: 16 }}>
        <Text style={{ color: t.accent }}>
          Tema: {name} - press here to change{" "}
        </Text>
      </Pressable>

      <View style={styles.preview}>
        <PosterCard
          movie={MOVIES[0]}
          onPress={() => console.log("Tryckt på:", MOVIES[0].title)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: { width: 170 },
});
