import { useIsDesktop } from "@/hooks/useIsDesktop";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const { t } = useTheme();
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
      >
        POSTER SHOP
      </Text>
      <View style={styles.spacer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacer: { flex: 1 },
});
