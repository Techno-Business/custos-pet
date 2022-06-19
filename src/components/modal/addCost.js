import React, { createRef, useState, useRef, forwardRef } from 'react';
import { Alert, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setCost as setCostAction, saveCost } from '../../store/modules/app/actions';

import { Box, Spacer, Button, TextInput, Title, DropDownP } from './../../components';

import TextInputMask from './../TextInputMask';

import AddCostSchema from '../../schemas/addCost.schema';

import { Modalize } from 'react-native-modalize';

export const modalRef = createRef();

const ModalAddCost = () => {
    const dispatch = useDispatch();
    const { costForm, form } = useSelector((state) => state.app);

    const setCost = (payload) => {
        dispatch(setCostAction(payload));
    };

    const sendCost = async () => {
        try {
            await AddCostSchema.validate(costForm);
            dispatch(saveCost());
        } catch ({ errors }) {
            Alert.alert(errors[0], 'Correct the error before continuing');
        }
    };

    const [showDropDown, setShowDropDown] = useState(false);

    const brandInputRef = useRef();
    const weightInputRef = useRef();
    const goalInputRef = useRef();
    
    return (
        <Modalize adjustToContentHeight ref={modalRef}>
            <Box hasPadding background="primary">
                <Box row align="flex-end" justify="flex-start">
                    <Button width="15%" spacing="0 60px 0 0" hasPadding="0 0 0 15px" icon="close" size={25}
                        onPress={() =>modalRef?.current?.close()}></Button>
                    <Title big width="auto">Add cost</Title>
                </Box>
                <Spacer size="20px"/>
                <View style={{width: '100%'}}>
                    <DropDownP       
                        label={"Type"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        inputProps={{
                            left: <TextInput.Icon name="dog-service" color="#F0560A" />,
                        }}
                        value={costForm?.type || 'Service'}
                        setValue={(type) => {
                            setCost({ type });
                        }}
                        list={[{label: 'Service', value: 'Service'}, {label: 'Vaccine', value: 'Vaccine'},
                                {label: 'Feed', value: 'Feed'}]}
                    />          
                </View>        
                <Spacer/>
                <TextInputMask
                    onSubmitEditing={() => {
                        if (costForm?.type != "Feed") goalInputRef.current.focus();
                        else brandInputRef.current.focus();
                    }}
                    label="Date" 
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    placeholder="DD/MM/YYYY" 
                    left={<TextInput.Icon name="calendar" color="#F0560A"/>}
                    disabled={form?.loading}
                    value={costForm?.date}
                    onChangeText={(date) => {
                        setCost({ date });
                    }}
                ></TextInputMask>
                <Spacer/>
                <Box row>
                    <TextInput ref={brandInputRef}
                        onSubmitEditing={() => {
                            weightInputRef.current.focus();
                        }}
                        label="Brand"
                        width="50%"
                        spacing="0 4px 0 0"
                        placeholder="Pedigree" 
                        left={<TextInput.Icon name="paw" color="#F0560A"/>}                    
                        disabled={form?.loading || costForm?.type != "Feed"}
                        value={costForm?.type != "Feed" ? "" : costForm?.brand}
                        onChangeText={(brand) => {
                            setCost({ brand });
                        }}
                    ></TextInput>
                    <TextInput ref={weightInputRef}
                        onSubmitEditing={() => {
                            goalInputRef.current.focus();
                        }}
                        label="Weight"
                        width="50%"
                        spacing="0 0 0 4px"
                        placeholder="4,2" 
                        left={<TextInput.Icon name="weight" color="#F0560A"/>}
                        right={<TextInput.Affix text="Kg" />}
                        disabled={form?.loading || costForm?.type != "Feed"}
                        value={costForm?.type != "Feed" ? "" : costForm?.weight}
                        onChangeText={(weight) => {
                            setCost({ weight });
                        }}
                    ></TextInput>    
                </Box>
                <Spacer/>
                <TextInput ref={goalInputRef}
                    label="Goal"
                    placeholder="Description" 
                    left={<TextInput.Icon name="flag-checkered" color="#F0560A"/>}
                    disabled={form?.loading}
                    value={costForm?.goal}
                    onChangeText={(goal) => {
                        setCost({ goal });
                    }}
                ></TextInput>
                <Spacer/>
                <TextInputMask
                    label="Price"
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: ''
                    }}
                    medium
                    placeholder="60,00" 
                    left={<TextInput.Icon name="cash" color="#F0560A"/>}
                    disabled={form?.loading}
                    value={costForm?.price}
                    onChangeText={(price) => {
                        setCost({ price });
                    }}
                ></TextInputMask>
                <Spacer size="20px"/>
                <Button width="60%" background="greenLight" 
                    disabled={form?.saving}
                    loading={form?.saving}
                    onPress={() => sendCost()}>Add cost
                </Button>  
            </Box>  
        </Modalize>
    );
};

export default ModalAddCost;