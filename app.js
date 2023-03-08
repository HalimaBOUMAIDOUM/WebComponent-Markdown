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
        <button id="downloadMarkdown">Télécharger Markdown</button>
        <button id="downloadHTML">Télécharger HTML</button>
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

        ////////////////
        this.shadowRoot.querySelector('#downloadMarkdown').addEventListener('click', () => {
            this.downloadMarkdown();
        });
    
        this.shadowRoot.querySelector('#downloadHTML').addEventListener('click', () => {
            this.downloadHTML();
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

    //
    downloadMarkdown() {
        const url = this.getAttribute('data-src');
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const filename = 'markdown.md';
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            });
    }
    
    downloadHTML() {
        const html = this.shadowRoot.querySelector('#content').innerHTML;
        const filename = 'markdown.html';
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

customElements.define('il-markdown', IlMarkdown)