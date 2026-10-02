import { PosterCard } from "@/components/PosterCard";
import { MOVIES } from "@/mock/movies";
import { useTheme } from "@/theme/useTheme";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { t } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: t.app }]}>
      <View style={styles.preview}>
        <PosterCard
          movie={MOVIES[0]}
          onPress={() => console.log("Tryckt på:", MOVIES[0].title)}
        />
      </View>
      {/* <Text>Edit src/app/index.tsx to edit this screen.</Text> */}
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
