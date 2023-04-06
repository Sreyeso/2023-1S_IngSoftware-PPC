import React from "react";
import dynamic from 'next/dynamic';
import p5Types from "p5"; //Import this for typechecking and intellisense
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


interface ComponentProps {
    // Your component props
}

let x = 50;
const y = 50;

const YourComponent: React.FC<ComponentProps> = (props: ComponentProps) => {

    // See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.ellipse(x, y, 70, 70);
        x++;
    };

    return <Sketch setup={ setup } draw = { draw } />;
};