import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { StyleSheet, Text, View } from "react-native";

export default function Basket() {
  const { t } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: t.fg }]}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
  },
  title: { fontFamily: fonts.display, fontSize: 40, marginTop: 8 },
});
