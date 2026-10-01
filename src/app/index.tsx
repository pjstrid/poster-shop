// import { StyleSheet, Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View style={styles.container}>
//       <Text>Edit src/app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { FALLBACK_RATES, formatPrice } from "@/utils/formatPrice";
import { unitPrice } from "@/utils/pricing";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  console.log(unitPrice({ product: "Poster", size: "30x50", frame: "None" })); // 199 – ingen ramavgift
  console.log(unitPrice({ product: "T-shirt", size: "M", frame: "None" })); // 249
  console.log(formatPrice(299, "SEK", FALLBACK_RATES.SEK)); // 299 kr – symbol efter

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
