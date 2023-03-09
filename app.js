import {marked} from '/node_modules/marked/lib/marked.esm.js';

class IlMarkdown extends HTMLElement {
    constructor () {
        super();
        //Utilisation de la méthode attachShadow pour attacher un arbre DOM de type shadow à notre élément. Mode : ouvert pour rendre le shadowroot accessible (en termes d'encapsulation)
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
        <button id="buttonDownload" > Download </button>
        `;
        
        this.theme = 'light';
        this.contentEl = this.shadowRoot.querySelector('#content');
  
    }

    //connectedCallback() est appelée automatiquement lorsque l'élément est ajouté au DOM
    async connectedCallback(){
       
        const html = marked( this.getAttribute('data-src'));
        console.log(html)
        this.shadowRoot.querySelector('#content').innerHTML = html;
        this.shadowRoot.querySelector('#buttonTheme').addEventListener('click', () => {this.changerTheme()});

        //test
        this.shadowRoot.querySelector('#buttonDownload').addEventListener('click', () => {
            const filename = 'file.txt';
            const text = this.getAttribute('data-src');
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          });
      
        
     
    }

     changerTheme(){
        if (this.theme == 'light') {
            this.contentEl.style.background = 'black';
            this.contentEl.style.color = 'white';
            this.theme = 'dark';
          }
          else{
            this.contentEl.style.background = 'white';
            this.contentEl.style.color = 'black';
            this.theme = 'light';
          }
    }

    
}

customElements.define('il-markdown', IlMarkdown)
