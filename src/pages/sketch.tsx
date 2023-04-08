import React, { Component } from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; //Import this for typechecking and intellisense
//import Sketch from "react-p5";
// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => {

    // importing sound lib only after react-p5 is loaded
    require('p5/lib/addons/p5.sound');

    // returning react-p5 default export
    return mod.default
}), {
    ssr: false
});
//import Sketch from "react-p5";


export default class App extends Component {
    setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(
            canvasParentRef
        );
        p5.frameRate(this.fr);
        // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    };
    draw = p5 => {
        p5.background('tomato');
    };

    render() {
        return <Sketch setup={ this.setup } draw = { this.draw } />;
    }
}