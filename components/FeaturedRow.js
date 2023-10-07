import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../lib/sanity'

const FeaturedRow = ({ id, title, description }) => {
    const [restaurant, setRestaurant] = useState([])
    const query = ` *[_type == "featured" && _id == $id]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]`

    useEffect(() => {
        sanityClient.fetch(query, { id }).then((data) => setRestaurant(data?.restaurants))
    }, [])

    return (
        <View>
            <View className='flex-row items-center justify-between px-4 mt-4'>
                <Text className='text-lg font-bold'>{title}</Text>
                <ArrowRightIcon color={'#00CCBb'} />
            </View>
            <Text className='px-4 text-xs text-gray-500'>{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,

                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >

                {restaurant?.map((item) => (
                    <RestaurantCard
                        address={item.address}
                        dishes={item.dishes}
                        genre={item.type?.name}
                        id={item._id}
                        imgUrl={item.image}
                        short_description={item.short_decription}
                        lat={item.lat}
                        long={item.long}
                        rating={item.rating}
                        title={item.name}
                        key={item._id}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow