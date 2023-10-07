import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../lib/sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectBasketItemsWithID,
} from "../Redux/slices/basketSlice";
const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithID(state, id));
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addToCart({ id, name, description, price, image }));
  };
  const removeItemFromCart = () => {
    if (!items.length > 0) return;
    dispatch(removeFromCart({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`p-4 bg-white border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row ">
          <View className="flex-1 pr-2">
            <Text className="mb-1 text-lg">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="mt-2 text-gray-400">
              <Currency quantity={price} currency="NGN" />
            </Text>
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3f3f4",
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="w-20 h-20 p-4 bg-gray-300 rounded-full"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="px-4 bg-white">
          <View className="flex-row items-center pb-3 space-x-2">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromCart}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#00ccbb" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToCart}>
              <PlusCircleIcon color={"#00ccbb"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
