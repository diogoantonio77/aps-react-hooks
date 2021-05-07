import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function App() {
  const [quantity, setQuantity] = useState(0);
  const finishOrder = useRef(null);

  useEffect(() => {
    async function getStorage() {
      const productStorage = await AsyncStorage.getItem('quantities');

      if (productStorage) {
        setQuantity(Number(productStorage));
      }
    }
    getStorage();
  }, []);

  useEffect(() => {
    async function saveStorage() {
      await AsyncStorage.setItem('quantities', quantity);
    }
    saveStorage();
  }, [quantity]);

  function focusOrder() {
    finishOrder.current.focus();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.productImage}
          source={{
            uri: 'https://s.zst.com.br/cms-assets/2020/07/shutterstock_333597428.jpg'
          }}
        />

        <View style={styles.productInfo}>
          <Text style={{ fontWeight: 'bold' }}>Iphone 6s otimo aparelho, compra ai pra me ajudar a comprar pão</Text>
          <Text>Quantidade: <Text style={{ fontWeight: 'bold' }}>{quantity}</Text></Text>

          <View style={styles.addProduct}>
            <TextInput
              style={styles.textInput}
              placeholder='0'
              value={quantity}
              editable={false}
            />

            <TouchableHighlight
              style={styles.addButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={{ color: '#ffff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

      <View style={styles.orderButtons}>
        <TouchableHighlight
          style={styles.finishButton}
          onPress={focusOrder}
        >
          <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>FINALIZAR</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.orderButton}
          ref={finishOrder}
        >
          <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}> <Feather name={'shopping-cart'} size={15}  /> REALIZAR PEDIDO</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 40
  },
  card: {
    flexDirection: 'row',
    width: 270,
    height: 150,
    borderRadius: 8,
    borderWidth: 2
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginTop: 20
  },
  productInfo: {
    flexDirection: 'column',
    width: 150,
    margin: 15
  },
  addProduct: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  textInput: {
    borderRadius: 4,
    borderWidth: 1,
    width: 60,
    height: 30,
    padding: 5
  },
  addButton: {
    backgroundColor: '#99D178',
    width: 30,
    marginLeft: 10,
    borderRadius: 15
  },
  finishButton: {
    justifyContent: 'center',
    backgroundColor: '#99D178',
    width: 150,
    height: 30,
    borderRadius: 4,
    borderColor: '#000000',
    borderWidth: 1
  },
  orderButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20
  },
  orderButton: {
    justifyContent: 'center',
    backgroundColor: '#99D178',
    width: 150,
    height: 30,
    borderRadius: 8,
    marginTop: 400,
    alignItems: 'center'
  }
});