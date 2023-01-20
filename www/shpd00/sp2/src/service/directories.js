const dirs = new Map()

export const getDir = (dirId) =>{
    return dirs.get(dirId)
}

export const setDir = (dir) =>{
    dirs.set(dir.id,dir)
}

export default(
    getDir,
    setDir
)