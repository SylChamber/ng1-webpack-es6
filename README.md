# Démo AngularJS 1.7 avec components, ECMAScript 2015 and webpack

Ce projet est un démo d'une application AngularJS 1.7 moderne avec les components, ECMAScript 2015 (6) et son concept de modules, et webpack.

Il s'inspire des conventions et techniques détaillées dans [Using AngularJS with ES6 and Webpack](http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/).

* [Démo AngularJS 1.7 avec components, ECMAScript 2015 and webpack](#démo-angularjs-17-avec-components-ecmascript-2015-and-webpack)
  * [Utilisation de modules ECMAScript 2015](#utilisation-de-modules-ecmascript-2015)
    * [Déclaration d'un module](#déclaration-dun-module)
    * [Enregistrement des composantes dans la déclaration du module](#enregistrement-des-composantes-dans-la-déclaration-du-module)
    * [Déclaration d'un component](#déclaration-dun-component)
      * [`import` ou `require`](#import-ou-require)

## Utilisation de modules ECMAScript 2015

Plutôt que d'utiliser des [IIFE](https://developer.mozilla.org/fr/docs/Glossaire/IIFE) pour isoler les fichiers JavaScript, avec ECMAScript 2015, chaque fichier devient un module qui ne pollue pas le namespace global.

> Références:
>
> * [ES6 en détails: les modules](https://tech.mozfr.org/post/2015/08/21/ES6-en-details-%3A-les-modules)
> * [Instruction import](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import)
> * [Instruction export](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/export)

### Déclaration d'un module

Avec un *IIFE*, on définissait un module comme suit:

```javascript
(function () {
    'use strict';

    angular
        .module('app', [
            'app.helloWord'
        ]);
}())
```

Avec les modules ES2015, on peut le définir ainsi:

```javascript
import angular from 'angular';
import helloWorldModule from './hello-world/hello-world.module';

export default angular
    .module('app', [
        helloWorldModule
    ])
    .name;
```

En JavaScript moderne, généralement on n'utilise pas de variables globales: on importe des modules et on les assigne à des variables, comme l'instruction suivante:

```javascript
import angular from 'angular';
```

### Enregistrement des composantes dans la déclaration du module

Un module AngularJS sert à enregistrer les dépendances pour permettre ensuite de les récupérer ailleurs dans le code.

Selon les pratiques AngularJS classiques, l'enregistrement des différences composantes d'un module (component, service, directive, etc.) se faisait dans le fichier définissant la composante.

Dorénavant, avec ES2015, **on enregistre les composantes dans le module AngularJS**. Le fichier qui définit la composante ne fait que la définir, et l'exporte comme module ES2015.

> Pour ceux qui connaissent .NET et l'outil d'injection de dépendances [Autofac](https://autofac.org/), un module AngularJS en ES2015 est équivalent à un [module Autofac](https://autofac.readthedocs.io/en/latest/configuration/modules.html).

On déclarait d'abord un module:

```javascript
// hello-world.module.js
(function () {
    'use strict';

    angular
        .module('app.helloWorld', []);
}())
```

et on définissait la composante et on l'enregistrait dans le système de modules AngularJS dans un même fichier:

```javascript
// hello-world.component.js
(function () {
    'use strict';

    angular
        .module('app.helloWorld')
        .component('helloWorld', {
            templateUrl: 'hello-world.html'
        });
}())
```

Avec les modules ES2015, on définit un module et on enregistre ses composantes dans le même fichier:

```javascript
// hello-world.module.js
import angular from 'angular';
import helloWorldComponent from './hello-world.component.js';

export default angular
    .module('app.helloWord', [])
    .component(helloWorldComponent.name, helloWorldComponent.options)
    .name;
```

Par convention, un module AngularJS sous forme de module ES2015 exporte uniquement son nom. Dans un autre module qui en dépend, quand on l'importe, toutes ses composantes sont enregistrées dans le système d'injection de dépendances d'AngularJS, et son nom est assigné à une variable:

```javascript
import helloWorldModule from './hello-world/hello-world.module';
```

La valeur de `helloWorldModule` sera `app.helloWorld`, soit le nom assigné dans la déclaration du module. On peut donc utiliser cette valeur pour déclarer une dépendance vers ce module:

```javascript
angular
    .module('app', [
        helloWorldModule
    ])
```

Voir la prochaine section pour la déclaration du component `helloWorldComponent`.

### Déclaration d'un component

Selon les pratiques classiques, on définissait un component et on l'enregistrait dans un module dans le même fichier:

```javascript
// hello-world.component.js
(function () {
    'use strict';

    angular
        .module('app.helloWorld')
        .component('helloWorld', {
            templateUrl: 'hello-world.html'
        });
}())
```

Avec les modules ES2015, on enregistre un component dans la définition du module (voir la section précédente). La déclaration devient:

```javascript
// hello-world.component.js
export default {
    name: 'helloWorld',
    options: {
        template: require('./hello-world.html')
    }
};
```

Un component AngularJS est défini par un objet qui représente ses options. Un module ES2015 pour un component exportera donc cet objet ainsi que le nom sous lequel il doit être enregistré. Ses propriétés `name` et `options` correspondent aux arguments de la fonction `component` d'AngularJS.

**À noter**: le template HTML est importé avec la fonction Node.js `require` et **insérée dans le code JavaScript**. Aucun appel HTTP ne sera requis pour récupérer le template, il n'est donc pas nécessaire de l'empaqueter dans le bundle final.

Ce component pourra ensuite être importé comme suit:

```javascript
import helloWorldComponent from './hello-world.component';
```

et enregistré de la façon suivante dans le module AngularJS:

```javascript
angular
    .module('app.helloWorld')
    .component(helloWorldComponent.name, helloWorld.options)
```

#### `import` ou `require`

`import` est une instruction ECMAScript 2015; `require` est une instruction Node.js. (**webpack** est un outil programmé en Node.js, et peut donc interpréter les instructions Node.js.)

* `import` peut être utilisé dans le navigateur pour importer un module. C'est `import` que nous devrions toujours utiliser dans notre logique JavaScript.
* `require` est utilisé pour récupérer le contenu d'un template HTML pour l'insérer dans le code JavaScript. webpack va transpiler le code JavaScript pour inclure le contenu dans le component. C'est fonctionnellement équivalent à `template: '<h2>Hello, World!</h2>'` mais c'est plus pratique de coder du HTML dans un fichier à part. On aurait pu utiliser une fonction de lecture de fichier du module `fs` de Node.js, mais `require` est beaucoup plus concis.

**Attention**: Visual Studio Code affiche une erreur TypeScript 2307 (module introuvable) avec une instruction `require('./chemin/ver/fichier.html')`. C'est que `require` est conçu pour importer des modules JavaScript, pas d'autres types de contenu. Pourtant, le code fonctionne.

On peut éviter ces erreurs en créant un [fichier de déclarations TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) qui déclare un module pour les fichiers HTML:

```typescript
// html.d.ts
declare module '*.html';
```

Pour référence, voir [Importing files other than TS modules](https://github.com/Microsoft/TypeScript/issues/2709#issuecomment-230183652).