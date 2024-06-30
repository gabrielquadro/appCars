import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity onPress={() => handleSelectCar(item)}>
            <Text style={{ padding: 10, fontSize: 18 }}>{item.nome_modelo}</Text>
        </TouchableOpacity>
    );

    const handleSelectCar = (car) => {
        navigation.navigate('Details', { car });
    };

    return (
        <View>
            <FlatList
                data={cars}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default Home;