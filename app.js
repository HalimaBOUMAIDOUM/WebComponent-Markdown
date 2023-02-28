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
            background-color: #eeeeee;
            margin-left: auto;
            margin-right: auto;
            border: 1px dotted black;
          }</style>
        <div id="content"></div>`;
        // the div above will be used to display the Markdown content
        console.log("test constructor")
        
    }

    //connectedCallback() est appelée automatiquement lorsque l'élément est ajouté au DOM
    async connectedCallback(){
        
        const url = this.getAttribute('data-src');
        const markdown = await this.getMarkdown(url);
        const html = marked(markdown);
      
        console.log(html)
        this.shadowRoot.querySelector('#content').innerHTML = html
        
        
    }

    async getMarkdown(url){
        const response = await fetch(url);
        const data = await response.text();
        return data;
    }

}

customElements.define('il-markdown', IlMarkdown)