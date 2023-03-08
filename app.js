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

        //Gestion des événements des boutons de téléchargement
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

    //Téléchargement du fichier markdown
    downloadMarkdown() {
        //Récupération de l'URL spécifiée dans l'attribut data-src de l'élément
        const url = this.getAttribute('data-src');
        //Récupération du contenu du fichier en utilisant fetch
        fetch(url)
            .then(response => response.text())
            .then(data => {
                //Définition du nom de fichier
                const filename = 'markdown.md';
                //Création d'un élément d'ancrage
                const element = document.createElement('a');
                //Configuration des attributs href, download et style de l'élément d'ancrage
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                //Ajout de l'élément d'ancrage à l'élément body du DOM
                document.body.appendChild(element);
                //Simulation d'un clic sur l'élément d'ancrage
                element.click();
                //Suppression de l'élément d'ancrage de l'élément body du DOM
                document.body.removeChild(element);
            });
    }
    
    // Fonction pour télécharger le contenu HTML
    downloadHTML() {
        //Récupération du contenu HTML généré par la librairie marked.js
        const html = this.shadowRoot.querySelector('#content').innerHTML;
        //Définition du nom de fichier
        const filename = 'markdown.html';
        //Création d'un élément d'ancrage
        const element = document.createElement('a');
        //Définition de l'attribut href de l'élément avec le contenu HTML encodé en UTF-8
        element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
        //Définition de l'attribut download de l'élément avec le nom de fichier
        element.setAttribute('download', filename);
        //Ajout de l'élément au DOM, en tant qu'enfant du corps du document HTML
        element.style.display = 'none'; // Pour éviter que l'élément soit visible
        document.body.appendChild(element);
        //Simulation du clic sur l'élément pour déclencher le téléchargement
        element.click();
        //Suppression de l'élément du DOM
        document.body.removeChild(element);
    }
}

customElements.define('il-markdown', IlMarkdown)