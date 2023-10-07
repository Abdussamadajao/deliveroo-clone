import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../lib/sanity";
import Currency from 'react-currency-formatter'
import { removeFromCart } from "../Redux/slices/basketSlice";


const CartScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const items = useSelector((state) => state.basket.items);
  const cartTotal = items.reduce((total, item) => (total += item.price), 0);
  const dispatch = useDispatch();
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((result, item) => {
      (result[item.id] = result[item.id] || []).push(item);
      return result;
    }, {});

    setGroupedItemsInCart(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className='flex-1 bg-white '>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
          <View>
            <Text className="text-lg font-bold text-center">Cart</Text>
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack} className='absolute bg-gray-100 rounded-full top-3 right-5'>
            <XCircleIcon color={'#00ccbb'} height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center px-4 py-3 my-5 space-x-4 bg-white'>
          <Image
            className='p-4 bg-gray-300 rounded-full h-7 w-7'
            source={{
              uri: 'https://links.papareact.com/wru'
            }} />
          <Text className='flex-1'>Delivery in 50-75 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00ccbb]'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInCart).map(([key, items]) => (
            <View key={key} className='flex-row items-center px-5 py-2 space-x-3 bg-white'>
              <Text className='text-[#00ccbb] '>{items.length} X </Text>
              <Image source={{ uri: urlFor(items[0]?.image).url() }} className='w-12 h-12 rounded-full' />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text>
                <Currency quantity={items[0]?.price} currency='NGN' />
              </Text>

              <TouchableOpacity>
                <Text className='text-[#00ccbb] text-xs' onPress={() => dispatch(removeFromCart({ id: key }))}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>


        <View className='p-5 mt-5 space-y-4 bg-white'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              <Currency quantity={cartTotal} currency='NGN' />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
              <Currency quantity={2500} currency='NGN' />
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className='font-extrabold'>
              <Currency quantity={cartTotal + 2500} currency='NGN' />
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Order')} className='roudedlg bg-[#00ccbb] p-4 '>
            <Text className='text-lg font-bold text-center text-white'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
