import * as React from 'react';
import { Image, FlatList, Dimensions, Animated, Text, View, 
  StyleSheet, SafeAreaView } from 'react-native';
import { FlingGestureHandler, Directions, State } 
from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { setCost as setCostAction, 
  setForm } from './../../store/modules/app/actions';

import { Button, Spacer } from './../../components';

const { width } = Dimensions.get('screen');

import util from '../../util';

import { modalRef as modalRefCost } from './../modal/addCost';

import { navigate } from '../../services/navigation';

const OVERFLOW_HEIGHT = 70;
const SPACING = 5;
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const dispatch = useDispatch();
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT * 2],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          const petId = item._id;
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.name]} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.species]}>
                  {item.species}, {item.breed}
                </Text>
                <Text style={[styles.age]}>{item.age}</Text>
              </View>
              <Spacer size="15px"/>
              <View style={styles.itemContainerRow}>
                <Button width="45%" background="greenLight" size={16}
                  onPress={async () => { 
                      await dispatch(setCostAction({petId}))
                      modalRefCost?.current?.open()
                    }
                  }>Add cost</Button>
                <Button width="45%" background="blueLight" size={16}
                 onPress={async () => { 
                      await dispatch(setCostAction({petId}))   
                      dispatch(setForm({ loading: true }));
                      navigate('HistoryCost');
                  }
                }>History</Button>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const FlatListAnimated = () => {
  const { pet } = useSelector((state) => state.app);
  const [data, setData] = React.useState(pet.pets);

  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) return;
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) return;
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated}/>
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
              marginTop: 20,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [70, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [{ translateX }, { scale }],
                  }}
                >
                  <Image
                    source={{ uri: `${util.AWS.bucketURL}/${item.photo}`}}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    name: {
      fontSize: 28,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: -1,
    },
    species: {
      fontSize: 16,
    },
    age: {
      fontSize: 14,
    },
    itemContainer: {
      height: OVERFLOW_HEIGHT * 2,
      padding: SPACING * 2,
    },
    itemContainerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    overflowContainer: {
      height: OVERFLOW_HEIGHT * 2,
      overflow: 'hidden',
    },
});

export default FlatListAnimated;