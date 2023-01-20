const files = new Map()

export const getFile = (fileId) =>{
    return files.get(fileId)
}

export const setFile = (file) =>{
    files.set(file.id,file)
}

export const deleteAllFiles={
    files : new Map()
}

export default(
    getFile,
    setFile,
    deleteAllFiles
)