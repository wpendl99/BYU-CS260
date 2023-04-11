import { Renderer } from '../systems/Renderer.js';

import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js'; 
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js'; 

const controllerModelFactory = new XRControllerModelFactory();
const handModelFactory = new XRHandModelFactory();
let renderer;

const controllers = [0,1].map(function (index) {
    renderer = Renderer.getRenderer();
    const controller = renderer.xr.getController(index);

    const controllerGrip = renderer.xr.getControllerGrip(index);
    const model = controllerModelFactory.createControllerModel( controllerGrip );
    controllerGrip.add( model );

    const hand = renderer.xr.getHand( index );
    hand.add( handModelFactory.createHandModel( hand, "mesh" ) );

    return {
        hand, grip: controllerGrip, controller
    }
});

const controller1 = controllers[0].controller;
const controller2 = controllers[1].controller;
const hand1 = controllers[0].hand;
const hand2 = controllers[1].hand;
const controllerGrip1 = controllers[0].grip;
const controllerGrip2 = controllers[1].grip;

export {
    controller1,
    controller2,
    controllerGrip1,
    controllerGrip2,
    hand1,
    hand2
};