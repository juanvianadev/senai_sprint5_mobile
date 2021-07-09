import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// componente de classe p/ Historico
export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            role: '',
            nomeMedico:'',
            nomePaciente:''
        };
    }

    // função para buscar no token o email e o tipo de usuário que está logado 
    buscarDadosStorage = async () => {

        try {

            const valorToken = await AsyncStorage.getItem('userToken');
            // console.warn(jwtDecode(valorToken));

            if (valorToken !== null) {

                this.setState({ email: jwtDecode(valorToken).email });
                this.setState({ role: jwtDecode(valorToken).role });
                this.setState({ nomePaciente: jwtDecode(valorToken).nomePaciente });
                this.setState({ nomeMedico: jwtDecode(valorToken).nomeMedico });
            }

        } catch (error) {

            console.warn(error);

        }
    }

    // função para realizar o logout 
    realizarLogout = async () => {

        try {

            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login');

        } catch (error) {

            console.warn(error);

        }

    }

    // função que será solicitada assim que a tela for renderizada
    componentDidMount() {
        this.buscarDadosStorage();
    }

    // conteúdo a ser renderizado na tela Perfil
    render() {

        return (

            <View style={styles.contentHistorico}>

                <View style={styles.headerHistorico}>

                    <Text style={styles.title}>SPMG</Text>

                </View>

                <View style={styles.subTitleContent}>

                    <Text style={styles.subTitle}>Perfil do usuário</Text>

                    <View style={styles.mainHeaderLine} />

                </View>

                <View style={styles.emailText}>

                    {(this.state.role === "2" &&
                        <Text style={styles.textInfo}>Nome: {this.state.nomePaciente}</Text>                        
                    )}
                    {(this.state.role === "2" &&
                        <Text style={styles.textInfo}>Usuário: Paciente</Text>                        
                    )}

                    {(this.state.role === "3" &&
                        <Text style={styles.textInfo}>Nome: Dr.(a) {this.state.nomeMedico}</Text>
                    )}
                    {(this.state.role === "3" &&
                        <Text style={styles.textInfo}>Tipo de usuário: Médico</Text>
                    )}


                    <Text style={styles.textInfo}>Email: {this.state.email}</Text>
                    
                </View>

                <View>

                    <TouchableOpacity
                        style={styles.btnLogout}
                        onPress={this.realizarLogout}
                    >
                    </TouchableOpacity>


                </View>

            </View>

        )

    }

}