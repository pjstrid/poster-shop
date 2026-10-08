import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

export function BackBtn() {
  const { t } = useTheme();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.navigate("/");
  };

  return (
    <Pressable
      onPress={goBack}
      accessibilityRole="button"
      style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
    >
      <ChevronLeft size={20} color={t.fg} />
      <Text style={[styles.label, { color: t.fg }]}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 40,
    alignSelf: "flex-start",
  },
  label: { fontFamily: fonts.sansSemi, fontSize: 14 },
});
