import React, {useState} from 'react'
import {datasource} from "./Data";
import {TextInput, View, Text, Button, Alert} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Edit = ({navigation, route}) => {
    const [task, setTask] = useState(route.params.key);
    const [type, setType] = useState(route.params.type);
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
            <View style={{padding: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{flex:1, margin: 10}}>
                    <Button title="SAVE"
                            onPress={() => {
                                let originalIndex = route.params.type === 'Completed' ? 0 : 1;
                                let newIndex = type === 'Completed' ? 0 : 1;

                                // Remove the task from the original section
                                datasource[originalIndex].data.splice(route.params.index, 1);

                                // Add the task to the new section
                                datasource[newIndex].data.push({ key: task, type });

                                navigation.navigate("Home");
                            }

                        }
                    />

                </View>
                <View style={{flex:1, margin: 10}}>
                    <Button title="DELETE"
                            onPress={()=>{
                                let indexNum=1;
                                if(route.params.type == 'Completed') {
                                    indexNum = 0;
                                }
                                Alert.alert("Are you sure?", "",
                                    [{text:"yes", onPress:()=>{
                                            datasource[indexNum].data.splice(route.params.index,1);
                                            navigation.navigate("Home")
                                        }},
                                        {text:"no"}])
                            }}
                    />
                </View>
            </View>
        </View>
    );
};
export default Edit;
