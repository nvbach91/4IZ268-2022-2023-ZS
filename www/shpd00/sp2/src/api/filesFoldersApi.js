import dbApi from './dbApi'

export const getFiles = (path) =>{
    return dbApi.get(`/files?path=${path}`)
}

export const getDirectories = (path) =>{
    return dbApi.get(`/directories?path=${path}`)
}

export default {
    getFiles
    ,getDirectories
}