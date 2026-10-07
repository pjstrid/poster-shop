import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useAppSelector } from "@/store/hooks";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { CURRENCIES } from "@/utils/formatPrice";
import { router } from "expo-router";
import {
    ChevronDown,
    Moon,
    ShoppingCart,
    Sun,
    User,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const { t, name, toggle } = useTheme();
  const { isDesktop } = useIsDesktop();
  const insets = useSafeAreaInsets();
  const currency = useAppSelector((s) => s.settings.currency);
  const currentCurrency = CURRENCIES.find((c) => c.code === currency);
  const barHeight = isDesktop ? 72 : 56;

  const count = 3;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: t.header,
          borderBottomColor: t.line,
          paddingTop: insets.top,
          height: barHeight + insets.top,
          paddingHorizontal: isDesktop ? 28 : 12,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: isDesktop ? 40 : 28,
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
          {
            borderColor: t.btnLine,
            borderWidth: isDesktop ? 1 : 0,
            marginHorizontal: isDesktop ? 6 : 4,
            paddingHorizontal: isDesktop ? 10 : 6,
          },
        ]}
      >
        <ShoppingCart size={20} color={t.btnFg} />
        {isDesktop && (
          <Text style={[styles.iconText, { color: t.btnFg }]}>Basket</Text>
        )}
        {count > 0 && (
          <View
            style={[
              styles.basketBadge,
              { backgroundColor: t.surface, borderColor: t.line },
            ]}
          >
            <Text style={[styles.basketText, { color: t.accent }]}>
              {count}
            </Text>
          </View>
        )}
      </Pressable>

      <Pressable
        onPress={() => router.push("/")}
        style={({ pressed }) => [
          styles.icon,
          pressed && { backgroundColor: t.btn },
          {
            borderColor: t.btnLine,
            borderWidth: isDesktop ? 1 : 0,
            marginHorizontal: isDesktop ? 6 : 4,
            paddingHorizontal: isDesktop ? 10 : 6,
          },
        ]}
      >
        <User size={20} color={t.fg} />
        {isDesktop && (
          <Text style={[styles.iconText, { color: t.fg }]}>Profile</Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.icon,
          pressed && { backgroundColor: t.btn },
          {
            borderColor: t.btnLine,
            borderWidth: isDesktop ? 1 : 0,
            marginHorizontal: isDesktop ? 6 : 4,
            paddingHorizontal: isDesktop ? 10 : 6,
          },
        ]}
      >
        {/* TILLFÄLLIGT BORTTAGET DÅ SIMULATORN INTE VISAR FLAGGAN
         PÅ RÄTT SÄTT, SKA KOLLA ÖVER EN NY SIMULATOR */}
        {/* <Text style={styles.flag}>{currentCurrency?.flag}</Text> */}
        {/* {isDesktop && ( */}
        <Text style={[styles.cCode, { color: t.fg }]}>{currency}</Text>
        {/* )} */}
        <ChevronDown size={16} color={t.fg} />
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
    gap: 8,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderStyle: "solid",
  },
  themeIcon: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
    gap: 8,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  iconText: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
  },
  flag: { fontSize: 18 },
  cCode: { fontFamily: fonts.sansSemi, fontSize: 14 },
  basketBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  basketText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    lineHeight: 13,
  },
});
