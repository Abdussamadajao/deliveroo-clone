import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'


const PlaceOrderScreen = () => {
    return (
        <SafeAreaView className='bg-[#00ccbb] flex-1 justify-center items-center'>
            <Animatable.Image source={require('../assets/order.gif')} animation={'slideInUp'} iterationCount={1} className='h-96 w-96' />

            <Animatable.Text
                animation={'slideInUp'}
                iterationCount={1}
                className='text-lg font-bold text-center text-white my10'
            >
                Waiting for restaurant to accept your order!
            </Animatable.Text>
        </SafeAreaView>
    )
}

export default PlaceOrderScreen