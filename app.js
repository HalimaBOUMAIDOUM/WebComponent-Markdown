import {marked} from '/node_modules/marked/lib/marked.esm.js';

class IlMarkdown extends HTMLElement {
    constructor () {
        super();
        //using the method attachShadow to attach a shadow dom tree to our element , mode : open to make the shadowroot accesible (in terms of encapsulation)
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML=`
        <style>
        #content {
            border: red  solid;
            background-color: white;
            color : black;
            margin-left: auto;
            margin-right: auto;
            border: 1px dotted black;
          }
         
          }</style>
        <div id="content"></div>
        <button id="buttonTheme" > Changer le Theme </button>
        `;
        
        this.theme = 'light';
  
    }

    //connectedCallback() est appelée automatiquement lorsque l'élément est ajouté au DOM
    async connectedCallback(){
        const url = this.getAttribute('data-src');
        const markdown = await this.getMarkdown(url);
        const html = marked(markdown);

        console.log(html)
        this.shadowRoot.querySelector('#content').innerHTML = html

        this.shadowRoot.querySelector('#buttonTheme').addEventListener('click', () => {this.changerTheme()});

        const downloadBtn = `
        <button id="download-html">Download HTML</button>
        <button id="download-md">Download Markdown</button>
    `;
    this.shadowRoot.querySelector('#content').insertAdjacentHTML('beforebegin', downloadBtn);

    const downloadHtmlBtn = this.shadowRoot.querySelector('#download-html');
    const downloadMdBtn = this.shadowRoot.querySelector('#download-md');

    downloadHtmlBtn.addEventListener('click', () => {
        const html = marked(markdown);
        const blob = new Blob([html], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'content.html';
        link.click();
    });

    downloadMdBtn.addEventListener('click', () => {
        const blob = new Blob([markdown], {type: 'text/markdown'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'content.md';
        link.click();
    });
    }

    async getMarkdown(url){
        const response = await fetch(url);
        const data = await response.text();
        return data;
    }
     changerTheme(){
        const content = this.shadowRoot.querySelector('#content');
        if (this.theme == 'light') {
            content.style.background = 'black';
            content.style.color = 'white';
            
            this.theme = 'dark';
        }
        else{
            content.style.background = 'white';
            content.style.color = 'black';
            this.theme = 'light';
        }
        

    }
}

customElements.define('il-markdown', IlMarkdown)