
class FilesGrid extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'})
        const container = document.createElement('div')
        container.setAttribute('class','file-grid') 
        // var fs = require('fs');
        // var files = readdirSync('./../../cloud_files/');
        // container.textContent(files)
        container.textContent='test'
        shadow.appendChild(container)
        const style = document.createElement('style')
        style.textContent = `
            .file-grid{
                display: flex;
                flex-direction: row;
                width = 80vw;
                height = 80vh;
            }
        `
    }
}
customElements.define('files-grid', FilesGrid)