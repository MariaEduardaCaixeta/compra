import { Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

type Props = PressableProps & {
    status: FilterStatus;
    isActive: boolean;
}

export function Filter({ status, isActive, ...rest }: Props) {
    return (
        <Pressable {...rest} onPress={rest.onPress} style={({ pressed }) => [
            styles.filterContainer,
            { opacity: isActive ? 1 : 0.5 },
            pressed && { opacity: 0.7 },
        ]}>
            <StatusIcon status={status} />
            <Text style={styles.filterText}>{status === FilterStatus.PENDING ? "Pendentes" : "Comprados"}</Text>
        </Pressable>
    );
}