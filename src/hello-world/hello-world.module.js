import angular from 'angular';
import helloWorldComponent from './hello-world.component';

export default angular
    .module('app.helloWorld', [])
    .component(helloWorldComponent.name, helloWorldComponent.options)
    .name;
