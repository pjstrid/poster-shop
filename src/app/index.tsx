import { getList, ListKey, searchMovies } from "@/api/tmdb";
import { PosterCard } from "@/components/PosterCard";
import { ShopHeader } from "@/components/ShopHeader";
import { useDebounce } from "@/hooks/useDebounce";
import { useShopGrid } from "@/hooks/useShopGrid";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { TmdbMovie } from "@/types/tmdb";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const { t } = useTheme();
  const { columns, gap, rowGap, padding, itemWidth } = useShopGrid();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [listKey, setListKey] = useState<ListKey>("top");
  const [reloadKey, setReloadKey] = useState(0);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query.trim());
  const requestKey = `${listKey}|${debouncedQuery}|${reloadKey}`;
  const loading = loadedKey !== requestKey;

  const changeList = (key: ListKey) => {
    if (key === listKey) return;
    setListKey(key);
    setQuery("");
  };

  const retry = () => {
    setReloadKey((k) => k + 1);
  };

  useEffect(() => {
    let ignore = false;

    const fetchMovies = debouncedQuery
      ? searchMovies(debouncedQuery)
      : getList(listKey);

    fetchMovies
      .then((data) => {
        if (ignore) return;
        setMovies(data.results.filter((m) => m.poster_path));
        setError(null);
      })
      .catch(() => {
        if (!ignore) setError("Could not load movies");
      })
      .finally(() => {
        if (!ignore) setLoadedKey(requestKey);
      });

    return () => {
      ignore = true;
    };
  }, [requestKey, listKey, debouncedQuery]);

  let sortedMovies = [...movies].sort(
    (a, b) =>
      Number(a.release_date.slice(0, 4)) - Number(b.release_date.slice(0, 4)),
  );

  const emptyContent = loading ? (
    <ActivityIndicator size="large" color={t.accent} style={styles.spinner} />
  ) : error ? (
    <View style={styles.errorBox}>
      <Text style={{ color: t.fg2 }}>{error}</Text>
      <Pressable
        onPress={retry}
        style={({ pressed }) => [
          styles.retryBtn,
          { borderColor: t.btnLine, backgroundColor: t.btn },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.retryText, { color: t.btnFg }]}>Try again</Text>
      </Pressable>
    </View>
  ) : (
    <Text style={[styles.emptyText, { color: t.fg2 }]}>
      {"No posters found...\nTry a different title, or clear your filters."}
    </Text>
  );

  return (
    <FlatList
      key={columns}
      data={loading || error ? [] : sortedMovies}
      ListHeaderComponent={
        <ShopHeader
          count={sortedMovies.length}
          query={query}
          onQueryChange={setQuery}
          listKey={listKey}
          onListChange={changeList}
        />
      }
      ListEmptyComponent={emptyContent}
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
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorBox: {
    alignItems: "center",
    gap: 16,
    marginTop: 48,
  },
  retryBtn: {
    paddingHorizontal: 20,
    height: 44,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 48,
  },
  retryText: {
    fontFamily: fonts.sansSemi,
  },
  pressed: {
    opacity: 0.85,
  },
  spinner: { marginTop: 48 },
});
