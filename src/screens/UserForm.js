import * as React from 'react';
import { Avatar, List, TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { Text, View, ActivityIndicator } from 'react-native';

const UserForm = ({ route, navigation }) => {
    const [username, setUserName] = React.useState('');

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            </View>
            <TextInput
                label={'Github username'}
                value={username}
                onChangeText={username => setUserName(username)}
            />
            <Button mode='contained' style={{marginTop: 20}} onPress={() => {navigation.navigate('mainScreen', {username: username});}}>Entrar</Button>

            <View style={{ flex: 1 }}>

            </View>
        </View>
    );
}

export default UserForm;