import { getDetails } from "@/api/tmdb";
import { BackBtn } from "@/components/BackBtn";
import { Chip } from "@/components/Chip";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useAppSelector } from "@/store/hooks";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Frame } from "@/types/shop";
import { TmdbDetails } from "@/types/tmdb";
import { FALLBACK_RATES, formatPrice } from "@/utils/formatPrice";
import { unitPrice } from "@/utils/pricing";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const FRAME_COLORS = {
  Black: ["#1b1b1d", "#0d0d10ff", "#1e1e21ff"],
  Silver: [
    "#cdcfd3ff",
    "#aeb3bb",
    "#e9ebef",
    "#8d939c",
    "#cfd6e0ff",
    "#b4b9c1",
  ],
} as const;

type DetailsResult = {
  id: string;
  movie: TmdbDetails | null;
};

export default function MovieDetails() {
  const { t } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDesktop } = useIsDesktop();
  const [size, setSize] = useState<"30x50" | "50x70">("50x70");
  const [frame, setFrame] = useState<Frame>("None");
  const [result, setResult] = useState<DetailsResult | null>(null);
  const currency = useAppSelector((s) => s.settings.currency);

  useEffect(() => {
    let ignore = false;

    getDetails(id)
      .then((data) => {
        if (!ignore) setResult({ id, movie: data });
      })
      .catch(() => {
        if (!ignore) setResult({ id, movie: null });
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const padding = isDesktop ? 48 : 20;
  const price = unitPrice({ product: "Poster", size, frame });
  const priceText = formatPrice(price, currency, FALLBACK_RATES[currency]);

  const loading = result?.id !== id;
  const movie = loading ? null : result.movie;

  if (loading) {
    return (
      <View style={{ flex: 1, padding }}>
        <BackBtn />
        <Text style={{ color: t.fg2, marginTop: 24 }}>Movie not found</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <BackBtn />
        <Text style={{ color: t.fg2, marginTop: 24 }}>Movie not found</Text>
      </View>
    );
  }

  const year = movie.release_date.slice(0, 4);
  const director = movie.credits.crew.find(
    (person) => person.job === "Director",
  )?.name;

  const poster = movie.poster_path ? (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}` }}
      style={styles.poster}
    />
  ) : (
    <View
      style={[
        styles.poster,
        styles.placeholder,
        { backgroundColor: t.surface, borderColor: t.line },
      ]}
    >
      <Text
        style={{ fontFamily: fonts.sansBold, color: t.fg }}
        numberOfLines={3}
      >
        {movie.title}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={[styles.content, { padding }]}>
      <BackBtn />

      {/* Poster */}
      <View style={{ alignItems: "center" }}>
        <View
          style={[
            { width: "70%", maxWidth: 320 },
            size === "30x50" && { transform: [{ scale: 0.88 }] },
          ]}
        >
          {frame === "None" ? (
            poster
          ) : (
            <LinearGradient
              colors={FRAME_COLORS[frame]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 16 }}
            >
              {poster}
            </LinearGradient>
          )}
        </View>
      </View>

      {/* Title + info */}
      <View>
        <Text
          style={[styles.title, { color: t.fg, fontSize: isDesktop ? 72 : 48 }]}
        >
          {movie.title}
        </Text>
        <Text style={{ color: t.fg2, fontSize: 14 }}>
          <Text style={{ color: t.fg, fontFamily: fonts.sansSemi }}>
            {year}
          </Text>
          {director && `  ·Directed by ${director}`}
        </Text>
      </View>

      {/* Size and frame options */}
      <Text style={[styles.optionLabel, { color: t.fg2 }]}>SIZE</Text>
      <View style={styles.optionRow}>
        {(["30x50", "50x70"] as const).map((s) => (
          <Chip
            key={s}
            label={s}
            active={size === s}
            onPress={() => setSize(s)}
          />
        ))}
      </View>

      <Text style={[styles.optionLabel, { color: t.fg2 }]}>FRAME</Text>
      <View style={styles.optionRow}>
        {(["None", "Black", "Silver"] as const).map((f) => (
          <Chip
            key={f}
            label={
              f === "None"
                ? "None"
                : `${f} +${formatPrice(100, currency, FALLBACK_RATES[currency])}`
            }
            active={frame === f}
            onPress={() => setFrame(f)}
          />
        ))}
      </View>

      {/* Price */}
      <Text style={[styles.optionLabel, { color: t.fg2 }]}>PRICE</Text>
      <Text style={[styles.priceText, { color: t.accent }]}>{priceText}</Text>

      {/* Basket button */}
      <Pressable
        onPress={() => {
          console.log("Add", movie.title, size, frame, priceText);
        }}
        style={({ pressed }) => [
          styles.addBtn,
          { backgroundColor: t.btn, borderColor: t.btnLine },
          pressed && { opacity: 0.85 },
        ]}
      >
        <ShoppingCart size={24} color={t.btnFg} />
        <Text style={[styles.btnText, { color: t.btnFg }]}>Add to basket</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 24,
    paddingBottom: 48,
  },
  title: {
    fontFamily: fonts.display,
    lineHeight: undefined,
  },
  priceText: {
    fontFamily: fonts.display,
    fontSize: 56,
  },
  btnText: {
    fontFamily: fonts.sansSemi,
    fontSize: 16,
  },
  poster: {
    aspectRatio: 2 / 3,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontFamily: fonts.sansSemi,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
  },
  placeholder: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});
