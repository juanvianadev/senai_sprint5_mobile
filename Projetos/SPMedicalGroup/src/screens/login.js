import React, { Component } from 'react';
import { render } from 'react-dom';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';

import api from '../services/api';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'ricardo.lemos@spmedicalgroup.com.br',
            senha: 'ricardolemos123'
        }
    }


login = async () => {

    try {
        // console.warn(this.state.email + ' ' + this.state.senha);

        const response = await api.post('/login', {

            email: this.state.email,
            senha: this.state.senha
        })

        const token = response.data.token
        // console.log(token)

        // console.warn(response)

        await AsyncStorage.setItem('userToken', token)

        this.props.navigation.navigate('Main')

    } catch (error) {

        console.warn(error)

    }

}

}
