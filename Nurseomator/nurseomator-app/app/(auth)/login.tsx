import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useRef } from 'react';
import { useAuth } from '@/context/auth';

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    const usernameRef = useRef('');
    const passwordRef = useRef('');

    return (
        <>
            <Stack.Screen options={{ title: 'Login', headerShown: false }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        placeholder="username"
                        autoCapitalize="none"
                        nativeID="username"
                        onChangeText={(text) => {
                            usernameRef.current = text;
                        }}
                        style={styles.textInput}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        nativeID="password"
                        onChangeText={(text) => {
                            passwordRef.current = text;
                        }}
                        style={styles.textInput}
                    />
                </View>

                <TouchableOpacity
                    onPress={async () => {
                        console.log(`Login ${usernameRef.current} ${passwordRef.current}`);
                        const { data, error } = await login(
                            usernameRef.current,
                            passwordRef.current
                        );
                        if (data) {
                            router.replace('/map');
                        } else {
                            console.log(error);
                        }
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 32 }}>
                    <Text style={{ fontWeight: '500' }} onPress={() => router.push('/register')}>
                        Click Here To Create A New Account
                    </Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 4,
        color: '#455fff',
    },
    textInput: {
        width: 250,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#455fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        width: 250,
        borderRadius: 5,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
