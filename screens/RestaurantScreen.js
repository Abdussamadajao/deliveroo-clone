import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../lib/sanity";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import CartIcon from "../components/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../Redux/slices/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);
  return (
    <>
      <CartIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full p-4 bg-gray-300 h-72"
          />

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute p-2 bg-gray-100 rounded-full top-14 left-5"
          >
            <ArrowLeftIcon size={20} color={"#00ccbb"} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row my-1 space-x-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color={"green"} opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> . {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color={"green"} opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  Nearby . {address}
                </Text>
              </View>
            </View>
            <Text className="pb-4 mt-2 text-gray-500">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center flex-1 p-4 space-x-2 border-gray-300 border-y">
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
            <Text className="flex-1 pl-2 font-bold text-md">
              Have a food allergy
            </Text>
            <ChevronRightIcon color={"#00ccbb"} />
          </TouchableOpacity>
          <View className="pb-36">
            <Text className="px-4 pt-6 mb-3 text-xl font-bold">Menu</Text>
            {dishes.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                price={dish.price}
                description={dish.short_description}
                image={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
