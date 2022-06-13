import React from 'react';
import { Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Spacer, Button, TextInput, Title, IconButton } from './../../components';
import Uploader from './../../components/uploader';

import KeyboardAvoidingWrapper from './../../components/Keyboard/KeyboardAvoidingWrapper';

import {
    setPet as setPetAction,
    savePet,
} from './../../store/modules/app/actions';

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
    
    return (
        <KeyboardAvoidingWrapper>
            <Box hasPadding background="primary">
                <Box row spacing="0 0 0 -40px">
                    <Button width="15%" spacing="0 0 0 15px" icon="home" size={25}
                    onPress={() => navigate('Home')}></Button>
                    <Title big hasPadding="20px">Register pet</Title>
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
                <Box row>
                    <TextInput 
                        width="55%"
                        spacing="0 4px 0 0"
                        label="Name" 
                        placeholder="Orácio" 
                        left={<TextInput.Icon name="paw" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.name}
                        onChangeText={(name) => {
                            setPet({ name });
                        }}
                    ></TextInput>
                    <TextInput 
                        width="50%"
                        spacing="0 0 0 4px"
                        label="Age" 
                        placeholder="2 years" 
                        left={<TextInput.Icon name="calendar" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.age}
                        onChangeText={(age) => {
                            setPet({ age });
                        }}
                    ></TextInput>
                </Box>
                <Spacer size="5px"/>
                <Box row>
                    <TextInput
                        width="55%"
                        spacing="0 4px 0 0"
                        label="Weight" 
                        placeholder="4.2" 
                        left={<TextInput.Icon name="weight" color="#F0560A"/>}
                        right={<TextInput.Affix text="Kg" />}
                        disabled={form?.loading}
                        value={petForm?.weight}
                        onChangeText={(weight) => {
                            setPet({ weight });
                        }}
                    ></TextInput>
                    <TextInput 
                        width="50%"
                        spacing="0 0 0 4px"
                        label="Sex" 
                        placeholder="Male" 
                        left={<TextInput.Icon name="gender-male-female" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.sex}
                        onChangeText={(sex) => {
                            setPet({ sex });
                        }}
                    ></TextInput>
                </Box>
                <Spacer size="5px"/>
                <Box row>
                    <TextInput 
                        width="55%"
                        spacing="0 4px 0 0"
                        label="Species" 
                        placeholder="Dog" 
                        left={<TextInput.Icon name="dog" color="#F0560A"/>}
                        disabled={form?.loading}
                        value={petForm?.species}
                        onChangeText={(species) => {
                            setPet({ species });
                        }}
                    ></TextInput>
                    <TextInput 
                        width="50%"
                        spacing="0 0 0 4px"
                        label="Breed" 
                        placeholder="Male" 
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