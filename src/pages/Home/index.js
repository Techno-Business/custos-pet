import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getPet } from '../../store/modules/app/actions';

import { Cover, Box, Title, Spacer, TextP, Button, ActivityIndicator } from './../../components';
import illustration from './../../assets/illustration.jpg';

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
            <Box hasPadding background="primary">
                {form?.loading && (
                    <Box spacing="60px 0 0 0" hasPadding align="center">
                        <ActivityIndicator size="large" />
                        <Spacer size="20px" />
                        <Title color="tertiary" small>Searching for information</Title>
                        <Spacer size="10px" />
                        <TextP>Please wait a moment...</TextP>
                    </Box>
                )}

                {!pet?.pets && !form?.loading &&(
                    <Box hasPadding>
                        <Spacer size="160px"/>
                        <Cover source={illustration} width="340px" height="200px" spacing="0px auto" transparent/>
                        <Spacer size="40px"/>
                        <Title big color="tertiary" small>No pet registered at the moment</Title>
                    </Box>
                )}

                {pet?.pets && !form?.loading && (
                    <Box height="90%">
                        <FlatListAnimated/>
                    </Box>
                )}

                {!form?.loading && (
                    <Box hasPadding>
                        <Button 
                            disabled={form?.saving}
                            loading={form?.saving}
                            onPress={() => navigate('AddPet')}>Add new pet
                        </Button>
                    </Box>         
                )}
            </Box>     
        </>   
    );
}

export default Home;