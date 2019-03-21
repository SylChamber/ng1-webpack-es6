/**
 * Déclaration d'un module pour tous les fichiers HTML
 * évite l'erreur TS2307 module introuvable lorsqu'on fait un 
 * require('./chemin/vers/fichier.html') pour importer un template dans
 * un component AngularJS.
 * 
 */
declare module '*.html';