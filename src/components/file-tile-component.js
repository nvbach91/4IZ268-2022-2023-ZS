import {goTo} from '../router'

class FileTile extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'})
        const container = document.createElement('div')
        container.setAttribute('class','file-tile-container')
        const image = document.createElement('img')
        const alias = document.createElement('h3')
        alias.textContent=this.getAttribute('file-name')
        container.appendChild(image)
        container.appendChild(alias)
        const style = document.createElement('style')
        this.selected = false;
        style.textContent = `
            .file-tile-container{
                width = 100px;
                height = 100px;
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(container)
    }
    connectedCallback(){
        const shadow = this.shadowRoot;
        const fileName = this.getAttribute('file-name')
        const fileLocation = this.getAttribute('file-location')
        const container = shadow.querySelector('div')
        container.addEventListener('click',this.onClick)
    }

    onClick = (e) => {
        e.preventDefault()
        if(!this.selected){
            const { pathname: path} = new URL(e.target.fileLocation)
            goTo(path)
        }
    }
}
customElements.define('file-tile', FileTile)