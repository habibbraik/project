import axios from 'axios'
// import { products_url } from './constants'

const customFetch=axios.create({baseURL:'/api/v1'})



export default customFetch