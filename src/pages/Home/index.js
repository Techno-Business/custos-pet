import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getPet } from '../../store/modules/app/actions';

import { Cover, Box, Title, Spacer, TextP, Button, ActivityIndicator } from './../../components';
import illustration from './../../assets/illustration.jpg';

import ModalAddCost from '../../components/modal/addCost';

import FlatListAnimated from '../../components/FlatListAnimated';

import { navigate } from './../../services/navigation';

const Home = () => {
    const dispatch = useDispatch();
    const { pet, form } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(getPet());    
    }, []);
    
    return (
        <>
            <ModalAddCost/>
            <Box background="primary" hasPadding aling="center" justify="center">
                {form?.loading && (
                    <Box hasPadding align="center" justify="center">
                        <ActivityIndicator color="brand" size="large" />
                        <Spacer size="40px"/>
                        <Title color="tertiary" medium>Searching for information</Title>
                        <Spacer size="10px" />
                        <TextP align="center">Please wait a moment...</TextP>
                    </Box>
                )}
                
                {!pet?.pets && !form?.loading &&(
                    <Box hasPadding align="center" justify="center">
                        <Cover source={illustration} width="300px" height="160px" transparent/>
                        <Spacer size="40px"/>
                        <Title big color="tertiary" small>No pet registered at the moment</Title>
                    </Box>
                )}

                {pet?.pets && !form?.loading && (
                    <Box height="90%" justify="center" align="center">
                        <FlatListAnimated/>
                    </Box>
                )}

                {!form?.loading && (
                    <Button 
                        disabled={form?.saving}
                        loading={form?.saving}
                        onPress={() => navigate('AddPet')}>Add new pet
                    </Button>
                )}
            </Box>     
        </>   
    );
}

export default Home;