import {getDirectories} from '../api/filesFoldersApi'
import {getFiles} from '../api/filesFoldersApi'
import {getFile, setFile, deleteAllFiles} from '../service/files.js'
import {setDir} from '../service/directories.js'

let path
let container
let pathHeader

class FilesGrid extends HTMLElement{
    constructor(){
        super();
        // deleteAllFiles()
        const shadow = this.attachShadow({mode: 'open'})
        if (this.getAttribute('path')===null){
            path = '/'
            this.setAttribute('path',path)
        }else{
            path = this.getAttribute('path')
        }

        pathHeader = document.createElement('h1')
        pathHeader.setAttribute('id','path_header')
        pathHeader.innerText=path

        //main container
        container = document.createElement('div')
        container.setAttribute('class','file-grid')

        //create folder dialog - hidden for default
        const createDirDialog = document.createElement('create-dir-dialog')
        createDirDialog.shadowRoot.getElementById('cancel_btn').addEventListener("click",(e)=>this.hideElement(createDirDialog))


        //style
        const style = document.createElement('style')
        style.textContent = `
            .file-grid{
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
            }
            .folder_up{
                width:70px;
                padding:20px;
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(pathHeader)
        shadow.appendChild(container)
        shadow.appendChild(createDirDialog)
        this.render()
        // const createDirButton = documnent.createElement('button')
        // createDirButton.innerText = 'create directory'
        // createDirButton.addEventListener(this.click)
    }

    static get observedAttributes(){
        return["path"];
    }
    
    attributeChangedCallback(name,oldValue,newValue){
        const shadow = this.shadowRoot
        if(name== 'path'){
            path = this.getAttribute("path")
            this.render()
        }

    }

    render(){
        container.innerHTML=''
        pathHeader.innerText=path

        //pokud slozka neni korenova, pridame tlacitko 'o slozku vys'
        if(path.substring(0,path.length-1).indexOf('/')>-1){
            const folderUp = document.createElement('div')
            folderUp.setAttribute('class','folder_up')
            folderUp.innerHTML =`
            <img class='folder_up_icon' src='./../src/images/arrow_back.svg'/>
            `
            folderUp.addEventListener("click",(e)=>{this.changePath(path.substring(0,path.substring(0,path.length-1).lastIndexOf('/')+1))})
            container.appendChild(folderUp)
        }
        //getting folders from REST API
        const folders = getDirectories(path)
        //adding tiles to the root
        folders.then(folders => {
            folders.forEach(folder => {
                        setDir(folder)
                        const dirElement = document.createElement('dir-tile')
                        dirElement.setAttribute('dir_name',folder.name)
                        dirElement.addEventListener("click",(e)=>{this.changePath(path+folder.name+'/')})
                        container.appendChild(dirElement)
                    })
                })

        
        //getting files from REST API
        const files = getFiles(path)
        //adding tiles to the root
        files.then(files => {
                    files.forEach(file => {
                        // setFile(file)
                        const fileElement = document.createElement('file-tile')
                        fileElement.setAttribute('file_name',file.name)
                        container.appendChild(fileElement)
                    })
                })
    }
    changePath(path){
        this.setAttribute('path',path)
    }
    hideElement(element){
        element.style.display='none'
    }
}
customElements.define('files-grid', FilesGrid)