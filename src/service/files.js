const files = new Map()

export const getFile = (fileId) =>{
    return files.get(fileId)
}

export const setFile = (file) =>{
    files.set(file.id,file)
}

export default(
    getPost,
    setPost
)