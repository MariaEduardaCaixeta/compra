import { Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";

type Props = PressableProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {
    return (
        <Pressable {...rest} style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.7 },
        ]}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
}