import {goTo} from '../router'

class FileTile extends HTMLElement{
    constructor(){
        super();
        this.selected = false;
        const shadow = this.attachShadow({mode: 'open'});
        const container = document.createElement('div');
        container.setAttribute('class','container')
        container.innerHTML =`\
            <img class='file_icon' src='./../src/images/file_icon.svg'/>
        `
        const fileNameWrapper = document.createElement('div')
        fileNameWrapper.setAttribute('class','file_name_wrapper')
        fileNameWrapper.innerText='tsadasdsadasdassadsae'
        container.appendChild(fileNameWrapper)

        const style = document.createElement('style')
        style.textContent = `
            .container{
                padding: 20px;
                max-width: 100px;
            }
            .file_icon{
                height : 100px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .file_name_wrapper{
                word-wrap: break-word;
                text-align : center
            }
        `
        shadow.appendChild(style)
        shadow.appendChild(container)
    }
    static get observedAttributes(){
        return["file_name"];
    }
    connectedCallback(){
        const shadow = this.shadowRoot;
        shadow.querySelector('.file_name_wrapper').innerText = this.getAttribute('file_name');
    }


    // onClick = (e) => {
    //     e.preventDefault()
    //     if(!this.selected){
    //         const { pathname: path} = new URL(e.target.fileLocation)
    //         goTo(path)
    //     }
    // }
}
customElements.define('file-tile', FileTile)