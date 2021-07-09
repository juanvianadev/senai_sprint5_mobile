import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Agenda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Agenda: []
        }
    }

    getAgenda = async () => {

        try {

            const valorToken = await AsyncStorage.getItem('userToken');

            const resposta = await api.get('/consulta/agenda', {

                headers: {
                    'Authorization': 'Bearer ' + valorToken
                }
            })

            this.setState({ Agenda: resposta.data })

        } catch (error) {

            console.warn(error)

        }

    }

    componentDidMount() {
        this.getAgenda();
    }

    render(){
        return(
            <div>
                <TextInput
                            autoCorrect={false}
                            style={styles.inputLogin}
                            placeholder='email'
                            placeholderTextColor='black'
                            keyboardType='email-address'
                            onChangeText={email => this.setState({ email })}
                        />
    
                        <TextInput
                            autoCorrect={false}
                            style={styles.inputLogin}
                            placeholder='senha'
                            placeholderTextColor='black'
                            secureTextEntry={true}
                            onChangeText={senha => this.setState({ senha })}
                        />
    
                        <TouchableOpacity
                            style={styles.btnLogin}
                            onPress={this.login}
                        >
    
                        </TouchableOpacity>
            </div>
        )
    }
    
    
    render() {
    
        return (
    
            <View style={styles.contentHistorico}>
    
                <View style={styles.headerHistorico}>
    
                    <Text style={styles.title}>SPMedicalGroup</Text>
    
                </View>
    
                <View style={styles.subTitleContent}>
    
                    <Text style={styles.subTitle}>Agenda de consultas</Text>
    
                    <View style={styles.mainHeaderLine} />
    
                </View>
    
                <ScrollView style={styles.mainBody}>
    
                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.Agenda}
                        keyExtractor={item => item.IdConsulta}
                        renderItem={this.renderItem}
                    />
    
                </ScrollView>
    
            </View>
    
        )
    
    }
    
    // conteudo renderizado dentro do flat list
    renderItem = ({ item }) => (
    
        <View style={styles.flatItemRow}>
    
            <View style={styles.flatItemContainer}>
    
    
                <Text style={styles.flatItemInfo}>Status: {(item.idStatusConsultaNavigation.descricaoConsulta)}</Text>
                <Text style={styles.flatItemInfo}>Paciente: {(item.idPacienteNavigation.nomePaciente)}</Text>
                <Text style={styles.flatItemInfo}>Médico: {(item.idMedicoNavigation.nomeMedico)}</Text>
                <Text style={styles.flatItemInfo}>Especialidade: {(item.idMedicoNavigation.idEspecialidadeNavigation.descricaoEspecialidade)}</Text>
                <Text style={styles.flatItemInfo}>Data: {(item.dataConsulta)}</Text>
                <Text style={styles.flatItemInfo}>Horário: {(item.horaConsulta)}</Text>
    
    
            </View>
    
        </View>
    )
    
}

