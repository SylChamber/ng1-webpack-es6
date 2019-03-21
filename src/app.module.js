import angular from 'angular';
import helloWorldComponent from './hello-world.component';

angular
    .module('app', [])
    .component(helloWorldComponent.name, helloWorldComponent.options);