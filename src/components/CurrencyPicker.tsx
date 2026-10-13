import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrency } from "@/store/settingsSlice";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { CURRENCIES } from "@/utils/formatPrice";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CurrencyPicker() {
  const { t } = useTheme();
  const { isDesktop } = useIsDesktop();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const currency = useAppSelector((s) => s.settings.currency);
  const currentCurrency = CURRENCIES.find((c) => c.code === currency);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityLabel={`Currency: ${currency}`}
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: t.btn },
          {
            borderColor: t.btnLine,
            borderWidth: isDesktop ? 1 : 0,
            marginHorizontal: isDesktop ? 6 : 4,
            paddingHorizontal: isDesktop ? 10 : 6,
          },
        ]}
      >
        <Text style={styles.flag}>{currentCurrency?.flag}</Text>
        {isDesktop && (
          <Text style={[styles.code, { color: t.fg }]}>{currency}</Text>
        )}
        {open ? (
          <ChevronUp size={16} color={t.fg} />
        ) : (
          <ChevronDown size={16} color={t.fg} />
        )}
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View
            style={[
              styles.menu,
              {
                top: insets.top + (isDesktop ? 72 : 56),
                right: isDesktop ? 28 : 12,
                backgroundColor: t.surface,
                borderColor: t.line,
              },
            ]}
          >
            {CURRENCIES.map((c) => {
              const selected = c.code === currency;
              return (
                <Pressable
                  key={c.code}
                  onPress={() => {
                    dispatch(setCurrency(c.code));
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    (selected || pressed) && { backgroundColor: t.line },
                  ]}
                >
                  <Text style={styles.flag}>{c.flag}</Text>
                  <Text
                    style={[
                      styles.code,
                      { color: selected ? t.accent : t.fg, flex: 1 },
                    ]}
                  >
                    {c.code}
                  </Text>
                  {selected && <Check size={16} color={t.accent} />}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  flag: { fontSize: 18 },
  code: { fontFamily: fonts.sansSemi, fontSize: 14 },
  backdrop: { flex: 1 },
  menu: {
    position: "absolute",
    width: 176,
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
