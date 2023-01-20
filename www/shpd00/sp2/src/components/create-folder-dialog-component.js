class createDirDialog extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const container = document.createElement('div');
        container.setAttribute('class','create_dir_container')
        container.innerHTML =`\
            folder name : <input id='folder_name'/>
            <button>create</button> 
            <button id= 'cancel_btn'>cancel</button>
        `
        //  const style = document.createElement('style')
        // style.textContent = `
        //     .container{
        //         padding: 20px;
        //         max-width: 100px;
        //     }
        //     .dir_icon{
        //         width: 100px;
        //         display: block;
        //     }
        //     .dir_name_wrapper{
        //         word-wrap: break-word;
        //         text-align : center
        //     }
        // `
        // shadow.appendChild(style)
        shadow.appendChild(container)
    }
    // static get observedAttributes(){
    //     return["dir_name"];
    // }
    // connectedCallback(){
        // const shadow = this.shadowRoot;
        // shadow.querySelector('.dir_name_wrapper').innerText = this.getAttribute('dir_name');
    // }
    }
customElements.define('create-dir-dialog', createDirDialog)