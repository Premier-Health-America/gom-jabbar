import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { Text } from '@rneui/themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <Text h1>This screen doesn't exist.</Text>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
