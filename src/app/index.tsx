import { PosterCard } from "@/components/PosterCard";
import { useShopGrid } from "@/hooks/useShopGrid";
import { MOVIES } from "@/mock/movies";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { t } = useTheme();
  const { columns, gap, rowGap, padding, itemWidth } = useShopGrid();

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: fonts.display, fontSize: 40, color: t.fg }}>
        Popular
      </Text>

      <FlatList
        key={columns}
        data={MOVIES}
        keyExtractor={(movie) => String(movie.id)}
        numColumns={columns}
        columnWrapperStyle={{ gap }}
        ItemSeparatorComponent={() => <View style={{ height: rowGap }} />}
        contentContainerStyle={{
          paddingHorizontal: padding,
          paddingVertical: 20,
        }}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth }}>
            <PosterCard
              movie={item}
              onPress={() => {
                router.push(`/`);
                console.log("Tryckt på:", item.title);
              }}
            />
          </View>
        )}
      />
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
