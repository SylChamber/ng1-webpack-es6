import angular from 'angular';
import helloWorldModule from './hello-world/hello-world.module';

export default angular
    .module('app', [
        helloWorldModule
    ])
    .name;