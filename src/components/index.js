import styled from 'styled-components/native';

import { Title as TitlePaper, Text as TextPaper, Button as ButtonPaper, TextInput as TextInputPaper, 
ActivityIndicator as ActivityIndicatorPaper, IconButton as IconButtonPaper } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';

export const Box = styled.View`
    flex: 1;
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
    justify-content: ${(props) => props.justify || 'center'};
    aling-items: ${(props) => props.align || 'center'};

    width: ${(props) => props.width || '100%'};
    max-width: ${(props) => props.width || '100%'};
    min-width: ${(props) => props.width || '100%'};

    height: ${(props) => props.height || 'auto'};
    max-height: ${(props) => props.height || 'auto'};
    min-height: ${(props) => props.height || 'auto'};

    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};

    margin: ${(props) => props.spacing || 0};
    border-radius: ${(props) => (props.radius ? '10px' : '0px')};
    border: ${(props) => props.border || 'none'};

    background: ${(props) => 
        props.theme[props.background] || props.background || 'transparent'};
`;

export const Spacer = styled.View`
    width: 100%;
    height: ${(props) => props.size || '10px'};
`;

export const ActivityIndicator = styled(ActivityIndicatorPaper).attrs(
    (props) => ({
      animating: true,
      color: props.theme[props.color],
    })
)``;

export const Title = styled(TitlePaper)`
    color: ${(props) => props.theme[props.color || 'tertiary']};
    font-size: ${(props) => (props.big ? '32px' : props.medium ? '24px' : '18px')};
    line-height: ${(props) => (props.big ? '32px' : props.medium ? '24px' : '18px')};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
    letter-spacing: 1px;
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
    text-align: ${(props) => props.align || 'center'};
    transform: ${(props) => (props.scale ? `scale(${props.scale})` : '')};
    font-family: 'Inter_700Bold';
`;

export const Cover = styled.ImageBackground.attrs((props) =>
  props.image
    ? {
        source: { uri: props.image },
      }
    : undefined
)`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  margin: ${(props) => props.spacing || '0px'};
  border-radius: ${(props) => (props.circle ? props.width : '10px')};
  border: ${(props) => props.border || 'none'};
  overflow: hidden;
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.darkLight};
`;

export const TextP = styled(TextPaper)`
    color: ${(props) => props.theme[props.color || 'tertiary']};
    font-size: ${(props) => (props.medium ? '16px' : props.small ? '13px' : '20px')};
    font-family: ${(props) => 
        props.bold ? 'Inter_700Bold' : 'Inter_400Regular'};
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
    margin: ${(props) => props.spacing || 0};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
    opacity: ${(props) => props.opacity || 0.5};
    text-align: ${(props) => props.align || 'center'};
`;

export const Button = styled(ButtonPaper).attrs((props) => ({
    mode: props.mode || 'contained',
    justifyContent: props.justify || 'center',
    alingItems: props.align || 'center',
    uppercase: true,
    color: props.theme[props.background] || props.background || props.theme.brand,
    labelStyle: {
        color: props.theme[props.textColor || 'primary'],
        letterSpacing: 1,
        fontFamily: 'Inter_700Bold',
        fontSize: props.size || 18
    }
}))`
    width: ${(props) => props.width || '85%'};
    height: 50px;
    margin: 0 auto;
    padding: ${(props) => props.spacing || 0};
    border-radius: 20px;
`;

export const TextInput = styled(TextInputPaper).attrs(({ theme }) => ({
    mode: 'outlined',
    theme: {
        colors: {
            background: theme.primary,
            placeholder: theme.darkLight,
            primary: theme.tertiary,
            text: theme.tertiary
        }
    }
}))`
    height: ${(props) => props.height || '60px'};
    width: ${(props) => props.width || '100%'};
    margin: ${(props) => props.spacing || 0};
    font-size: ${(props) => (props.medium ? '18px' : props.small ? '14px' : '16px')};
`;

export const IconButton = styled(IconButtonPaper).attrs()``;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${(props) => props.theme[props.color || 'tertiary']};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: flex-end;
`;

export const TextLinkContent = styled.Text`
    color: ${(props) => props.theme[props.color || 'brand']};
    font-size: ${(props) => (props.small ? '13px' : props.medium ? '15px' : '20px')};
`;

