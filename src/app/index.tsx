import { PosterCard } from "@/components/PosterCard";
import { ShopHeader } from "@/components/ShopHeader";
import { useShopGrid } from "@/hooks/useShopGrid";
import { MOVIES } from "@/mock/movies";
import { useTheme } from "@/theme/useTheme";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const { t } = useTheme();
  const { columns, gap, rowGap, padding, itemWidth } = useShopGrid();
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);

  let visible = MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  if (activeChip === "newest") {
    visible = [...visible].sort(
      (a, b) =>
        Number(b.release_date.slice(0, 4)) - Number(a.release_date.slice(0, 4)),
    );
  }

  const toggleChip = (chip: string) =>
    setActiveChip((current) => (current === chip ? null : chip));

  return (
    <View>
      <FlatList
        key={columns}
        data={visible}
        ListHeaderComponent={
          <ShopHeader
            count={visible.length}
            query={query}
            onQueryChange={setQuery}
            activeChip={activeChip}
            onChipPress={toggleChip}
          />
        }
        ListEmptyComponent={
          <Text style={{ color: t.fg2, textAlign: "center", marginTop: 48 }}>
            No posters found...
            <br />
            Try a different title, or clear your filters.
          </Text>
        }
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
                router.push(`/movie/${item.id}`);
                console.log("Tryckt på:", item.title);
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

// const styles = StyleSheet.create({

// });
