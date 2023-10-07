import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const sanityClient = createClient({
    projectId: 'eqsxm0b4',
    dataset: 'production',
    apiVersion: '2023-07-31', // use a UTC date string
    useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source) => builder.image(source)

export default sanityClient