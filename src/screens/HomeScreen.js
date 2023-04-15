import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { removeCat } from '../store/StoreCats';

const HomeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const CatList = useSelector((state) => state.StoreCats.catsList)



    const createTwoButtonAlert = (id) => {
        return (
            Alert.alert('Delete Cat', 'Are you sure?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => dispatch(removeCat(id)) },
            ])
        )
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, padding: 15 }}>Your Cats</Text>
            {
                CatList?.length > 0 ?
                    (
                        <FlatList
                            data={CatList}
                            renderItem={({ item }) =>
                                <View style={styles.card}>
                                    <View>
                                        <View style={{ width: 55, height: 55, borderRadius: 50, marginRight: 12, backgroundColor: '#ec94aa', justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon2 name="cat" color={'#fff'} size={36} />
                                        </View>
                                    </View>

                                    <View style={styles.info}>
                                        <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                            {item.name}
                                        </Text>
                                        <Text>
                                            Breed: {item.breed}
                                        </Text>
                                        <Text>
                                            Weight: {item.weight}
                                        </Text>
                                        <Text>
                                            Gender: {item.gender}
                                        </Text>
                                        <Text>
                                            Description: {item.description}
                                        </Text>
                                    </View>

                                    <MenuContext style={styles.menu}>
                                        <View>
                                            <Menu>
                                                <MenuTrigger style={{ width: 30, height: 30 }} children={<Icon2 name="dots-vertical" color={'#000'} size={28} />} />
                                                <MenuOptions >
                                                    <MenuOption onSelect={() => navigation.navigate('Edit Cat', item)} text="Edit" style={{ padding: 10 }} />
                                                    <MenuOption onSelect={() => createTwoButtonAlert(item.id)} style={{ padding: 10, marginBottom: -5 }}>
                                                        <Text style={{ color: 'red' }}>Delete</Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>
                                        </View>
                                    </MenuContext>
                                </View>}
                            keyExtractor={item => item.id}
                        />
                    )
                    : (
                        <Text>No Cats found {'\n'} please Add one</Text>
                    )
            }

            <Pressable style={styles.Fab}
                onPress={() => navigation.navigate('Add Cat')} >
                <Icon name="pets" color={'#fff'} size={24} />
            </Pressable>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Fab: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#ec1149",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#fafafa',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        padding: 12
    },
    info: {

    },
    menu: {
        flex: 1,
        alignItems: 'flex-end',
    },
})