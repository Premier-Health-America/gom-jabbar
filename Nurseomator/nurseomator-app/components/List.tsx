import { StyleSheet, View, Text, SafeAreaView, FlatList, ListRenderItem } from 'react-native';

interface ListItem {
    id: number | string;
}

interface ListProps<T extends ListItem> {
    itemsList: T[];
    title: string;
    renderItem: ({ item }: { item: T }) => JSX.Element;
}

const myListEmpty = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text>No items found</Text>
        </View>
    );
};

export function List<T extends ListItem>({ itemsList, title, renderItem }: ListProps<T>) {
    return (
        <SafeAreaView style={styles.listContainer}>
            <FlatList
                data={itemsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={myListEmpty}
                ListHeaderComponent={() => <Text style={styles.header}>{title}</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    listContainer: {
        paddingHorizontal: 10,
        width: '100%',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
