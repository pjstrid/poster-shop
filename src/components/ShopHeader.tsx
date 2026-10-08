import { ListKey } from "@/api/tmdb";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { CalendarClock, Search, Star } from "lucide-react-native";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Chip } from "./Chip";

type Props = {
  count: number;
  query: string;
  onQueryChange: (text: string) => void;
  listKey: ListKey;
  onListChange: (key: ListKey) => void;
};

export function ShopHeader({
  count,
  query,
  onQueryChange,
  listKey,
  onListChange,
}: Props) {
  const { t } = useTheme();
  const { isDesktop } = useIsDesktop();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontFamily: fonts.display,
            fontSize: isDesktop ? 60 : 40,
            color: t.fg,
          }}
        >
          Now showing
        </Text>
        <Text style={{ color: t.fg2, fontSize: 12 }}>{count} posters</Text>
      </View>

      <View style={{ marginVertical: 16, justifyContent: "center" }}>
        <Search
          size={18}
          color={t.fg2}
          style={{ position: "absolute", left: 16, zIndex: 1 }}
        />
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search titles"
          placeholderTextColor={t.fg2}
          style={{
            height: 48,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: t.line,
            backgroundColor: t.surface,
            paddingLeft: 44,
            paddingRight: 16,
            color: t.fg,
            fontFamily: fonts.sans,
            fontSize: 15,
          }}
        />
      </View>

      <Text style={{ color: t.fg2, fontSize: 12 }}>Selection:</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingTop: 8, paddingBottom: 16 }}
      >
        <Chip
          label="Top rated"
          icon={Star}
          active={listKey === "top"}
          onPress={() => onListChange("top")}
        />
        <Chip
          label="Upcoming"
          icon={CalendarClock}
          active={listKey === "upcoming"}
          onPress={() => onListChange("upcoming")}
        />
      </ScrollView>
    </>
  );
}
