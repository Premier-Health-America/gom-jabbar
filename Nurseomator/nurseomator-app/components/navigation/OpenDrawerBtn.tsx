import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function OpenDrawerBtn({ ...rest }) {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <TouchableOpacity
            onPress={openDrawer}
            activeOpacity={0.8}
            style={{ marginLeft: 20 }}
            {...rest}
        >
            <Ionicons name="menu" size={30} color={Colors.primary} />
        </TouchableOpacity>
    );
}
