import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../lib/sanity'

const Catergories = () => {
  const [catergories, setCatergories] = useState([])

  useEffect(() => {
    sanityClient.fetch(`*[_type == "category"]`).then((data) => { setCatergories(data) })
  }, [])
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }} horizontal showsHorizontalScrollIndicator={false}>
      {catergories?.map((catergory) => (
        <CategoryCard imgUrl={urlFor(catergory.image).width(200).url()} title={catergory.name} key={catergory._id} />
      ))}
    </ScrollView>
  )
}

export default Catergories