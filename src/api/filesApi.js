import baseApi from './baseApi'

export const getFiles = (location) =>{
    return baseApi.get(`/files?location=${path}`)
}

export default {
    getFiles
}