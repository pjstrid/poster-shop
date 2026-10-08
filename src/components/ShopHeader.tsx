import { useIsDesktop } from "@/hooks/useIsDesktop";
import { fonts } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Search } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

type Props = {
  count: number;
  query: string;
  onQueryChange: (text: string) => void;
  activeChip: string | null;
  onChipPress: (chip: string) => void;
};

export function ShopHeader({
  count,
  query,
  onQueryChange,
  activeChip,
  onChipPress,
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

      <View style={{ marginTop: 16, justifyContent: "center" }}>
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
    </>
  );
}
