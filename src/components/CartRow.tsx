import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Item } from "@/types/shop";
import { Image, StyleSheet, Text, View } from "react-native";

export function CartRow({ item }: { item: Item }) {
  const { t } = useTheme();

  const variant = `${item.size} · ${item.frame === "None" ? "No frame" : `${item.frame} frame`}`;

  return (
    <View style={[styles.row, { borderBottomColor: t.line }]}>
      {item.posterPath ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w154${item.posterPath}` }}
          style={styles.thumb}
        />
      ) : (
        <View style={[styles.thumb, { backgroundColor: t.surface }]} />
      )}

      <View style={styles.info}>
        <Text style={[styles.title, { color: t.fg }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{ color: t.fg2, fontSize: 12, marginTop: 4 }}>
          {variant}
        </Text>
        <View style={{ marginTop: 12 }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  thumb: { width: 64, aspectRatio: 2 / 3, borderRadius: 6 },
  info: { flex: 1, minWidth: 0 },
  title: { fontFamily: fonts.sansSemi, fontSize: 15 },
  right: { alignItems: "flex-end", justifyContent: "space-between" },
  price: { fontFamily: fonts.sansSemi, fontSize: 15 },
});
