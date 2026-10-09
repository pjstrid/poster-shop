import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Minus, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
};

export function Stepper({ value, onChange, min = 1 }: Props) {
  const { t } = useTheme();
  const atMin = value <= min;

  return (
    <View
      style={[styles.box, { borderColor: t.line, backgroundColor: t.surface }]}
    >
      <Pressable
        onPress={() => onChange(value - 1)}
        disabled={atMin}
        accessibilityLabel="Decrease"
        style={[styles.btn, atMin && { opacity: 0.3 }]}
      >
        <Minus size={14} color={t.fg} />
      </Pressable>

      <Text style={[styles.value, { color: t.fg }]}>{value}</Text>

      <Pressable
        onPress={() => onChange(value + 1)}
        accessibilityLabel="Increase"
        style={styles.btn}
      >
        <Plus size={14} color={t.fg} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  btn: {
    width: 36,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    minWidth: 28,
    textAlign: "center",
    fontFamily: fonts.sansSemi,
    fontSize: 14,
  },
});
