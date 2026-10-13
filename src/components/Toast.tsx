import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideToast } from "@/store/toastSlice";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { CircleCheck } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DURATION = 2500; // ms

export function Toast() {
  const { t } = useTheme();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { message, id } = useAppSelector((s) => s.toast);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => dispatch(hideToast()), DURATION);
    return () => clearTimeout(timer);
  }, [id, message, dispatch]);

  if (!message) return null;

  return (
    <View style={[styles.wrapper, { bottom: insets.bottom + 24 }]}>
      <Animated.View
        key={id}
        entering={FadeInDown}
        exiting={FadeOutDown}
        style={[styles.box, { backgroundColor: t.btn, borderColor: t.btnLine }]}
      >
        <CircleCheck size={20} color={t.ok} />
        <Text style={[styles.text, { color: t.btnFg }]}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    alignItems: "center",
    pointerEvents: "none",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    maxWidth: 420,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  text: {
    fontFamily: fonts.sansSemi,
    fontSize: 15,
    flexShrink: 1,
  },
});
