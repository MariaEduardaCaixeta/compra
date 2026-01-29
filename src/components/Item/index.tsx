import { View, Text, Pressable } from "react-native";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";
import { Trash2 } from "lucide-react-native";
import { styles } from "./styles";

type ItemData = {
    status: FilterStatus;
    description: string;
}

type Props = {
    data: ItemData;
    onRemove: () => void;
    onStatusChange: () => void;
}

export function Item({ data, onRemove, onStatusChange }: Props) {
    return (
        <View style={styles.rowContainer}>
            <Pressable style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 }
            ]} onPress={onStatusChange}>
                <StatusIcon status={data.status} />
            </Pressable>
            <Text style={styles.rowText}>{data.description}</Text>
            <Pressable onPress={onRemove}>
                {({ pressed }) => (
                    <Trash2 style={{ opacity: pressed ? 0.7 : 1 }} size={16} />
                )}
            </Pressable>
        </View>
    )
}