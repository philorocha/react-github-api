import * as React from 'react';
import { Avatar, List, Appbar, Divider } from 'react-native-paper';
import { View, ActivityIndicator, ScrollView, SafeAreaView, StyleSheet } from 'react-native';


const UserComponent = (props) => {
    return (
        <View>
            <List.Item
                title={props.name}
                description={props.login}
                left={() => <Avatar.Image size={90} source={{ uri: props.avatar }} />}
            />
            <Divider />
        </View>
    );
}

const Follower = (props) => {
    return (
        <View>
            <List.Item
                title={props.login}
                left={() => <Avatar.Image size={90} source={{ uri: props.avatar }} />}
            />
            <Divider />
        </View>
    );
}

function UserScreen({ route, navigation }) {
    const [isLoading, setLoading] = React.useState(true);
    const [isLoadingFollower, setLoadingFollower] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [followers, setFollowers] = React.useState([]);
    const { username } = route.params;

    const getUser = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const json = await response.json();
            setData(json);
            /*if (json.message) {
                console.log('vai dar merda');
                navigation.navigate('userFormScreen', {data: 'deu errado aqui visse'});
            }*/
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getFollowers = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/followers`);
            const json = await response.json();
            setFollowers(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFollower(false);
        }
    }

    React.useEffect(() => {
        getUser();
        getFollowers();
    }, []);

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: '#000' }} >
                <Appbar.BackAction onPress={() => { navigation.navigate('userFormScreen') }} />
                <Appbar.Content title={'Github Followers'} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={{ flex: 1 }}>
                        {isLoading ? <ActivityIndicator /> : (
                            <UserComponent name={data.name} location={data.location} avatar={data.avatar_url} />
                        )}
                        {isLoadingFollower ? <ActivityIndicator /> : (
                            followers.map((flw, i) => (
                                <Follower login={flw.login} avatar={flw.avatar_url} key={i} />
                            ))
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 50
    }
});

export default UserScreen;