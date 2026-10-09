import { BackBtn } from "@/components/BackBtn";
import { CartRow } from "@/components/CartRow";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { clearCart, selectCartItems, selectSubtotal } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { FALLBACK_RATES, formatPrice } from "@/utils/formatPrice";
import { router } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Basket() {
  const { t } = useTheme();
  const { isDesktop } = useIsDesktop();
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectSubtotal);
  const currency = useAppSelector((s) => s.settings.currency);
  const rate = FALLBACK_RATES[currency];

  const padding = isDesktop ? 48 : 16;
  const total = subtotal;

  if (items.length === 0) {
    return (
      <View style={[styles.empty, { padding }]}>
        <ShoppingBag size={40} color={t.accent} />
        <Text style={[styles.emptyTitle, { color: t.fg }]}>
          Your basket is empty
        </Text>
        <Pressable
          onPress={() => router.navigate("/")}
          style={[
            styles.btn,
            { backgroundColor: t.btn, borderColor: t.btnLine },
          ]}
        >
          <Text style={[styles.btnText, { color: t.btnFg }]}>
            Browse posters
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.content, { padding }]}>
      <BackBtn />

      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: t.fg }]}>Basket</Text>
        <Pressable onPress={() => dispatch(clearCart())}>
          <Text style={[styles.clear, { color: t.fg2 }]}>Clear basket</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.list,
          { backgroundColor: t.surface, borderColor: t.line },
        ]}
      >
        {items.map((item) => (
          <CartRow key={item.id} item={item} />
        ))}
      </View>

      <View
        style={[
          styles.summary,
          { backgroundColor: t.surface, borderColor: t.line },
        ]}
      >
        <View
          style={[styles.sumRow, styles.totalRow, { borderTopColor: t.line }]}
        >
          <Text style={[styles.totalLabel, { color: t.fg }]}>Total</Text>
          <Text style={[styles.totalValue, { color: t.accent }]}>
            {formatPrice(total, currency, rate)}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => {
          // TODO nästa branch: dispatch(checkout(...)) + router.push("/confirm")
          console.log("Checkout", { items, subtotal, total, currency });
        }}
        style={({ pressed }) => [
          styles.btn,
          styles.checkoutBtn,
          { backgroundColor: t.btn, borderColor: t.btnLine },
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={[styles.btnText, { color: t.btnFg }]}>Checkout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: 20, paddingBottom: 48 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: { fontFamily: fonts.display, fontSize: 40 },
  clear: { textDecorationLine: "underline", fontSize: 14 },
  list: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16 },
  summary: { borderRadius: 12, borderWidth: 1, padding: 20, gap: 12 },
  sumRow: { flexDirection: "row", justifyContent: "space-between" },
  totalRow: {
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 4,
    alignItems: "baseline",
  },
  totalLabel: { fontFamily: fonts.sansSemi, fontSize: 16 },
  totalValue: { fontFamily: fonts.display, fontSize: 36 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  emptyTitle: { fontFamily: fonts.display, fontSize: 32 },
  btn: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutBtn: { height: 56 },
  btnText: { fontFamily: fonts.sansSemi, fontSize: 16 },
});
