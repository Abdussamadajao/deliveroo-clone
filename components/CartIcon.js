import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const CartIcon = () => {
  const navigation = useNavigation();
  const items = useSelector((state) => state.basket.items);
  const cartTotal = items.reduce((total, item) => (total += item.price), 0);

  if (items.length === 0) return null;

  return (
    <View className="absolute z-50 w-full bottom-10">
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        className="mx-5 bg-[#00CCbb]  p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-lg font-extrabold text-center text-white">
          View Basket
        </Text>
        <Text className="text-lg font-extrabold text-white">
          <Currency quantity={cartTotal} currency="NGN" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
