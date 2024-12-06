import React, {useState} from 'react'
import {TextInput, View, Text, Button} from "react-native";
import {datasource} from "./Data";
import RNPickerSelect from 'react-native-picker-select';

const Add = ({navigation}) => {
    const [task, setTask] = useState('');
    const [type, setType] = useState('Completed');
    return (

        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Task:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText= {(text)=> setTask(text)}/>
            </View>

            <View style={{padding: 10}}>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value)=>setType(value)}
                    items={[
                        {label:"Completed", value:"Completed"},
                        {label:"Not Completed", value:"Not Completed"}
                    ]}
                />
            </View>
            <Button title="SUBMIT"
                    onPress={() => {
                        let item = {key: task};
                        let indexNum = 1;
                        if (type == 'Completed') {
                            indexNum = 0
                        }
                        datasource[indexNum].data.push(item);
                        navigation.navigate("Home")
                    }

                    }
            />
        </View>
    );
};
export default Add;
