/**
 * Déclaration d'un module pour tous les fichiers HTML
 * évite l'erreur TS2307 module introuvable lorsqu'on fait un 
 * require('./chemin/vers/fichier.html') pour importer un template dans
 * un component AngularJS.
 * voir https://github.com/Microsoft/TypeScript/issues/2709#issuecomment-230183652
 */
declare module '*.html';