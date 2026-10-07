import { useIsDesktop } from "@/hooks/useIsDesktop";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { router } from "expo-router";
import { Moon, ShoppingCart, Sun, User } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const { t, name, toggle } = useTheme();
  const { isDesktop } = useIsDesktop();
  const insets = useSafeAreaInsets();

  const barHeight = isDesktop ? 72 : 56;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: t.header,
          borderBottomColor: t.line,
          paddingTop: insets.top,
          height: barHeight + insets.top,
          paddingHorizontal: isDesktop ? 40 : 12,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: isDesktop ? 40 : 32,
          color: t.accent,
        }}
        onPress={() => router.push("/")}
      >
        POSTER SHOP
      </Text>

      <View style={styles.spacer}></View>

      <Pressable
        onPress={() => router.push("/")}
        style={({ pressed }) => [
          styles.icon,
          pressed && { backgroundColor: t.btn },
          { borderColor: t.btnLine },
        ]}
      >
        <ShoppingCart size={20} color={t.btnFg} />
        {isDesktop && (
          <Text style={[styles.iconText, { color: t.btnFg }]}>Basket</Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push("/")}
        style={({ pressed }) => [
          styles.icon,
          pressed && { backgroundColor: t.btn },
          { borderColor: t.btnLine },
        ]}
      >
        <User size={20} color={t.fg} />
        {isDesktop && (
          <Text style={[styles.iconText, { color: t.fg }]}>Profile</Text>
        )}
      </Pressable>

      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.themeIcon,
          pressed && { backgroundColor: t.btn },
        ]}
      >
        {name === "dark" ? <Sun color={t.fg2} /> : <Moon color={t.fg2} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  spacer: { flex: 1 },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    gap: 8,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
  },
  themeIcon: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    gap: 8,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  iconText: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
  },
});
