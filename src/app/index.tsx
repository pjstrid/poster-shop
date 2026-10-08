import { PosterCard } from "@/components/PosterCard";
import { ShopHeader } from "@/components/ShopHeader";
import { useShopGrid } from "@/hooks/useShopGrid";
import { MOVIES } from "@/mock/movies";
// import { useTheme } from "@/theme/useTheme";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function Index() {
  // const { t } = useTheme();
  const { columns, gap, rowGap, padding, itemWidth } = useShopGrid();
  const [query, setQuery] = useState("");

  let visible = MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

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
          />
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

// const styles = StyleSheet.create({

// });
