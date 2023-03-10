# Documentation utilisateur pour le web component Markdown to HTML

### Introduction

Le web component Markdown to HTML est un outil simple et facile à utiliser pour convertir des fichiers Markdown en HTML. Il est conçu pour être utilisé sur des pages web et nécessite uniquement un navigateur web moderne pour fonctionner. Avec cet outil, vous pouvez facilement convertir des fichiers Markdown en HTML et les afficher sur votre page web.

### Fonctionnalités

Le web component Markdown to HTML dispose des fonctionnalités suivantes :

- Conversion de fichiers Markdown en HTML : ce composant web permet de convertir des fichiers Markdown en HTML en utilisant la ressource REST webcomps. L'attribut data="/webcomps" est utilisé pour définir l'emplacement du fichier Markdown à convertir.

- Bouton de changement de thème : ce bouton permet de basculer entre un thème clair et un thème sombre pour personnaliser l'apparence de la page web.

- Bouton de téléchargement HTML : ce bouton permet de télécharger le contenu HTML généré à partir du fichier Markdown. Il est pratique pour sauvegarder ou partager le contenu converti.

- Bouton de téléchargement Markdown : ce bouton permet de télécharger le contenu Markdown d'origine. Il est utile si vous souhaitez effectuer des modifications ou des mises à jour sur le fichier Markdown.

### Utilisation

Pour utiliser le web component Markdown to HTML, vous devez inclure le code HTML suivant dans la page web où vous souhaitez l'utiliser :

``<markdown-to-html data="/webcomps"></markdown-to-html>``

Vous devez remplacer l'attribut data avec l'emplacement du fichier Markdown à convertir. Si le fichier se trouve dans le même répertoire que la page web, vous pouvez simplement utiliser le nom de fichier, par exemple :

``<markdown-to-html data="my-file.md"></markdown-to-html>``

Une fois que vous avez ajouté le composant web à votre page, vous pouvez utiliser les boutons pour personnaliser l'apparence et télécharger le contenu HTML et Markdown.

## Remarques importantes

Le web component Markdown to HTML nécessite une connexion Internet pour fonctionner correctement car il utilise la ressource REST webcomps pour récupérer le contenu Markdown.

La conversion de fichiers Markdown en HTML peut prendre un certain temps en fonction de la taille du fichier et de la complexité de son contenu.

Le composant web ne fonctionne que dans les navigateurs modernes qui prennent en charge les web components.

### Conclusion

Le web component Markdown to HTML est un outil utile pour convertir des fichiers Markdown en HTML. Avec ses fonctionnalités de personnalisation et de téléchargement, il est facile à utiliser et offre une expérience utilisateur agréable. N'hésitez pas à l'utiliser pour afficher vos fichiers Markdown sur votre page web.
