import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDownIcon, UserIcon, UserCircleIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Catergories from "../components/Catergories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../lib/sanity";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [featureCategories, setFeatueredCategories] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const query = ` *[_type == "featured"]{
    ...,
    restaurants[]->{
      ...,
      dishes[]->
    }
  }`


  useEffect(() => {
    sanityClient.fetch(query).then((data) => { setFeatueredCategories(data) });
  }, [])
  return (
    <SafeAreaView className='pt-5 bg-white'>
      <View className="flex-row items-center pb-3 mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="p-4 bg-gray-300 rounded-full h-7 w-7"
        />
        <View className='flex-1'>
          <Text className='text-xs font-bold text-gray-400' >Deliver Now!</Text>
          <Text className='text-xl font-bold' >Current Location
            <ChevronDownIcon size={20} color={'#00CCBB'} />
          </Text>
        </View>
        <UserCircleIcon size={35} color={'#00CCBB'} />
      </View>

      <View className='flex-row items-center pb-2 mx-4 space-x-2'>
        <View className='flex-row items-center flex-1 p-3 space-x-2 bg-gray-200 '>
          <MagnifyingGlassIcon color={'gray'} size={20} />
          <TextInput placeholder="Restaurants and cuisines"
            keyboardType="default" />
        </View>
        <View>
          <AdjustmentsVerticalIcon color={'#00CCBB'} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{
        paddingBottom: 100
      }} className='bg-gray-100' >
        <Catergories />

        {featureCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}

          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
