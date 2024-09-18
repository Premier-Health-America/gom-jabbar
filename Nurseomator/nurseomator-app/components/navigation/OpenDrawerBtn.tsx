import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export function OpenDrawerBtn({ ...rest }) {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <Pressable onPress={openDrawer} style={{ margin: 20 }} {...rest}>
            <Ionicons name="menu" size={30} color={Colors.primary} />
        </Pressable>
    );
}
