import React, { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Pressable,
    Keyboard,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch, useSelector } from 'react-redux';
import { editCat } from '../store/StoreCats';
import { useNavigation } from '@react-navigation/native'

const EditCat = ({ route }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [name, setname] = useState(route.params.name || '')
    const [breed, setbreed] = useState(route.params.breed || '')
    const [weight, setweight] = useState(route.params.weight || 0)
    const [description, setdescription] = useState(route.params.description || '')
    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'Male',
            selected: route.params.gender === 'Male' ? true : false
        },
        {
            id: '2',
            label: 'Female',
            value: 'Female',
            selected: route.params.gender === 'Female' ? true : false
        }
    ]);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    function handleCat(params) {
        //Check for the Name TextInput
        if (!name.trim()) {
            alert('Please Enter Name');
            return;
        }
        //Check for the brees TextInput
        if (!breed.trim()) {
            alert('Please Enter breed');
            return;
        }
        //Check for the weight TextInput
        if (!weight) {
            alert('Please Enter weight');
            return;
        }
        if (!radioButtons.find((i) => i.selected === true)) {
            alert('Please Choose gender');
            return;
        }
        let gender = radioButtons.find((i) => i.selected === true).value
        const obj = {
            id: route.params.id,
            name,
            breed,
            weight,
            description,
            gender
        }

        dispatch(editCat(obj))

        setname('')
        setbreed('')
        setweight(0)
        setdescription('')
        navigation.goBack()

    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Edit Information</Text>
                    <TextInput placeholder="Name" value={name} style={styles.textInput} onChangeText={(value) => setname(value)} />
                    <TextInput placeholder="Breed" value={breed} style={styles.textInput} onChangeText={(value) => setbreed(value)} />
                    <TextInput placeholder="Weight" value={weight} style={styles.textInput} keyboardType='number-pad' onChangeText={(value) => setweight(value)} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text>Gender</Text>
                        <RadioGroup
                            containerStyle={styles.radio}
                            radioButtons={radioButtons}
                            onPress={onPressRadioButton}
                        />
                    </View>
                    <TextInput
                        value={description}
                        placeholder="Descreption"
                        multiline
                        numberOfLines={4}
                        style={styles.textInput}
                        onChangeText={(value) => setdescription(value)} />

                    <View style={styles.btnContainer}>
                        <Pressable style={styles.button} onPress={handleCat}>
                            <Text style={styles.text}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default EditCat

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 20,
        flex: 1,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    textInput: {
        height: 60,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    btnContainer: {
        width: '50%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#ec1149'
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    radio: {
        flexDirection: 'row',
        marginLeft: '20%',
        marginVertical: 10,
        gap: 20
    }

})