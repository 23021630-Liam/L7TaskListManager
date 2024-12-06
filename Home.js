import React from 'react';
import { datasource } from './Data';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

const styles = StyleSheet.create({
    textStyle: {
        flex: 1,
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
        color: 'blue',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red',
    },
    footerButton: {
        margin: 20,
        color: 'green'
    },
});

const Home = ({ navigation }) => {
    const totalTasks = datasource[0].data.length + datasource[1].data.length; // Completed + Not Completed
    const completedTasks = datasource[0].data.length;
    const unfinishedTasks = datasource[1].data.length;

    const completedPercentage =
        totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;
    const unfinishedPercentage =
        totalTasks > 0 ? ((unfinishedTasks / totalTasks) * 100).toFixed(1) : 0;

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate('Edit', {
                        index: index,
                        type: section.title,
                        key: item.key,
                    });
                }}
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    const handleSubmit = () => {
        Alert.alert(
            'Task Summary',
            `Completed Tasks: ${completedTasks} (${completedPercentage}%)\nUnfinished Tasks: ${unfinishedTasks} (${unfinishedPercentage}%)`
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <Button
                title="Add Task"
                onPress={() => {
                    navigation.navigate('Add');
                }}
            />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
                        {title}
                    </Text>
                )}
            />
            <View style={styles.footerButton}>
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                />
            </View>
        </View>
    );
};

export default Home;
