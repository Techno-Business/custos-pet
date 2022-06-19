import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Box, TextP, Button, Spacer, Cover } from '../index';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import util from '../../util';
import { colors } from '../../assets/theme.json';

const Uploader = ({ title, desc, btnDesc, bg = null, 
  callback = () => {}, image = null }) => {
    const requestAccess = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert(
                'Permission denied',
                'Sorry, but we need access to your photos',
              [
                {
                  text: 'Allow access',
                  onPress: () => {
                    requestAccess();
                  },
                  style: 'cancel',
                },
                {
                  text: 'Cancel',
                },
              ]
            );
          }
    };

  useEffect(() => {
    requestAccess();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
  });
    callback(result);
  };

  return (
    <>
      {image && (
        <Cover width="100%" height="340px" radius="0px"
          image={image} onPress={() => pickImage()}>
            <Box hasPadding justify="flex-end" background={util.toAlpha(colors.darkLight, 30)}>
              <Spacer size="25px" />
              <Button background="brand"
                  onPress={() => pickImage()}>Change image
              </Button>
            </Box>
        </Cover>
      )}

      {!image && (
        <Box height="240px" background={!bg ? util.toAlpha(colors.darkLight, 25) : bg} 
          justify="center" align="center">
            <Box direction="column" hasPadding justify="center" align="center">
              <Box height="60px" align="center">
                <Icon name="image" size={70} color={util.toAlpha(colors.darkLight, 95)}/>
              </Box>    
              <Spacer size="15px" />
              <TextP color="darkLight" align="center" small>
                  {title}
              </TextP>
              <TextP color="darkLight" align="center" small >
                  {desc}
              </TextP>
              <Spacer size="25px" />
              <Button color="darkLight" background="brand"
                  onPress={() => pickImage()}>{btnDesc}
              </Button>
            </Box>
        </Box>
      )}
    </>
  );
};

export default Uploader;
