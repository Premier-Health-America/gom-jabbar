import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useRef } from 'react';
import { useAuth } from '@/context/auth';

export default function Register() {
    const { register } = useAuth();
    const router = useRouter();

    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const userNameRef = useRef('');

    return (
        <>
            <Stack.Screen options={{ title: 'sign up', headerShown: false }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text style={styles.label}>UserName</Text>
                    <TextInput
                        placeholder="Username"
                        autoCapitalize="none"
                        nativeID="userName"
                        onChangeText={(text) => {
                            userNameRef.current = text;
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
                        console.log(`register ${usernameRef.current} ${passwordRef.current}`);
                        const { data, error } = await register(
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
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 32 }}>
                    <Text style={{ fontWeight: '500' }} onPress={() => router.push('/login')}>
                        Click Here To Return To Login Page
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
