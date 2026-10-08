import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: LucideIcon;
};

export function Chip({ label, onPress, active = false, icon: Icon }: Props) {
  const { t } = useTheme();

  const textColor = active ? t.app : t.fg;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? t.accent : t.surface,
          borderColor: active ? t.accent : t.line,
        },
        pressed && styles.pressed,
      ]}
    >
      {Icon && <Icon size={14} color={textColor} />}

      <Text
        style={[
          styles.label,
          {
            color: textColor,
            fontFamily: active ? fonts.sansSemi : fonts.sans,
          },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
