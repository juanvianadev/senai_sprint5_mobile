import React, { Component } from 'react';

//importação do DraweNavigator
import { createDrawerNavigator } from '@react-navigation/drawer';

// importação das telas para a main
import Agenda from './agenda';
import Historico from './historico';
import Perfil from './perfil';

// constante para criação da Drawer Navigator
const Drawer = createDrawerNavigator();

// componente de classe p/ Main
export default class Main extends Component {

    render() {

        return (

            <Drawer.Navigator>
                               
                <Drawer.Screen name="Agenda" component={Agenda} />
                <Drawer.Screen name="Histórico" component={Historico} />
                <Drawer.Screen name="Perfil" component={Perfil} />

            </Drawer.Navigator>

        )

    }

}