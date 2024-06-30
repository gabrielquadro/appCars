import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity , StyleSheet } from 'react-native';
import axios from 'axios';
import * as SQLite from "expo-sqlite";

const Home = ({ navigation }) => {
    const db = SQLite.openDatabaseSync("leads.db");
    const [cars, setCars] = useState([]);

    useEffect(() => {
        db.execAsync('CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, car_id INTEGER, user_info TEXT);')

        axios.get('https://wswork.com.br/cars.json')
            .then(response => {
                setCars(response.data.cars)
            })
            .catch(error => console.error(error));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectCar(item)}>
            <Text style={styles.itemText}>Modelo: {item.nome_modelo}</Text>
            <Text style={styles.itemText}>Cor: {item.cor}</Text>
            <Text style={styles.itemText}>Ano: {item.ano}</Text>
        </TouchableOpacity>
    );

    const handleSelectCar = (car) => {
        navigation.navigate('Details', { car });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cars}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f0f0f0',
    },
    itemContainer: {
        backgroundColor: '#d9d9d9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
        color: '#6a6a6a',
    },
});

export default Home;