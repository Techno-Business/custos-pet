import React, { useRef, useState }from 'react';
import { Alert, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setPet as setPetAction, savePet } from './../../store/modules/app/actions';

import { Box, Spacer, Button, TextInput, Title, DropDownP } from './../../components';

import Uploader from './../../components/uploader';

import KeyboardAvoidingWrapper from './../../components/Keyboard/KeyboardAvoidingWrapper';

import AddPetSchema from './../../schemas/addPet.schema';

import { navigate } from '../../services/navigation';

const AddPet = () => {
    const dispatch = useDispatch();
    const { petForm, form } = useSelector((state) => state.app);

    const setPet = (payload) => {
        dispatch(setPetAction(payload));
    };

    const sendPet = async () => {
        try {
            await AddPetSchema.validate(petForm);
            dispatch(savePet());
        } catch ({ errors }) {
            Alert.alert(errors[0], 'Correct the errors before continuing');
        }
    };

    const [showDropDown, setShowDropDown] = useState(false);

    const nameInputRef = useRef();
    const ageInputRef = useRef();
    const weightInputRef = useRef();
    const speciesInputRef = useRef();
    const breedInputRef = useRef();
    
    return (
        <KeyboardAvoidingWrapper>
            <Box hasPadding background="primary" align="center" justify="center">
                <Box row align="flex-end" justify="flex-start">
                    <Button width="15%" spacing="0 40px 0 0" hasPadding="0 0 0 15px" icon="home" size={30}
                        onPress={() => navigate('Home')}></Button>
                    <Title big width="auto">Register pet</Title>
                </Box>
                <Spacer size="20px"/>
                <Uploader
                    title="Select a photo"
                    desc="This will be your pet's photo"
                    btnDesc="Select photo"
                    image={petForm?.photo?.uri}
                    callback={(photo) => {
                        setPet({ photo });
                    }}
                />
                <Spacer size="15px"/>
                <Box row align="center" justify="space-between">
                    <TextInput ref={nameInputRef}
                        onSubmitEditing={() => {
                            ageInputRef.current.focus();
                        }}
                        width="50%"
                        spacing="0 8px 0 0"
                        small
                        label="Name" 
                        placeholder="Orácio" 
                        left={<TextInput.Icon name="paw" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.name}
                        onChangeText={(name) => {
                            setPet({ name });
                        }}
                    ></TextInput>
                    <View style={{width: '50%'}}>
                        <DropDownP       
                            label={"Sex"}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            inputProps={{
                                left: <TextInput.Icon name="gender-male-female" color="#F0560A" />,
                            }}
                            value={petForm?.sex || 'Male'}
                            setValue={(sex) => {
                                setPet({ sex });
                            }}
                            list={[{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}]}
                        />          
                    </View>                  
                </Box>
                <Spacer/>
                <Box row align="center" justify="space-between">
                    <TextInput ref={ageInputRef}
                        onSubmitEditing={() => {
                            weightInputRef.current.focus();
                        }}
                        width="50%"
                        spacing="0 4px 0 0"
                        small
                        label="Age" 
                        placeholder="2 years" 
                        left={<TextInput.Icon name="calendar" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.age}
                        onChangeText={(age) => {
                            setPet({ age });
                        }}
                    ></TextInput>
                    <TextInput ref={weightInputRef}
                        onSubmitEditing={() => {
                            speciesInputRef.current.focus();
                        }}
                        width="50%"
                        spacing="0 0 0 4px"
                        small
                        label="Weight" 
                        placeholder="4.2" 
                        keyboardType="numeric"
                        left={<TextInput.Icon name="weight" color="#F0560A"/>}
                        right={<TextInput.Affix text="Kg" />}
                        disabled={form?.loading}
                        value={petForm?.weight}
                        onChangeText={(weight) => {
                            setPet({ weight });
                        }}
                    ></TextInput>
                </Box>
                <Spacer/>
                <Box row align="center" justify="space-between">
                    <TextInput ref={speciesInputRef}
                        onSubmitEditing={() => {
                            breedInputRef.current.focus();
                        }}
                        width="50%"
                        spacing="0 4px 0 0"
                        small
                        label="Species" 
                        placeholder="Dog" 
                        left={<TextInput.Icon name="dog" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.species}
                        onChangeText={(species) => {
                            setPet({ species });
                        }}
                    ></TextInput>
                    <TextInput ref={breedInputRef}
                        width="50%"
                        spacing="0 0 0 4px"
                        small
                        label="Breed" 
                        placeholder="Bulldog" 
                        left={<TextInput.Icon name="koala" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.breed}
                        onChangeText={(breed) => {
                            setPet({ breed });
                        }}
                    ></TextInput>
                </Box>
                <Spacer size="30px"/>
                <Button 
                    disabled={form?.saving}
                    loading={form?.saving}
                    onPress={() => sendPet()}>Add pet
                </Button>
            </Box>
        </KeyboardAvoidingWrapper>
    );
};

export default AddPet;