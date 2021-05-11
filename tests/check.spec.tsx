import React from 'react';
import { Counter } from "../comps/Counter"
import { testWrapper } from '../helpers/helpers';


(function furtherWrapping(){

    let initialCount = 27;

    testWrapper(
        "checking counter component", 
        [
            {checkTitle: "shouldn't brake", comp: <Counter {...{initialCount}}/>},
            {checkTitle: "should mount on 0", comp: <Counter {...{initialCount}}/>, shouldDisplay: true},
            {checkTitle: "should be blue and borderless", comp: <Counter {...{initialCount}}/>, checkStyling: {border: "", "background-color": "blue", "border-radius": "10px"}}, 
            {checkTitle: "with 27", comp: <Counter {...{initialCount}}/>, expectMatch: "27"}, 
            {checkTitle: "no children", comp: <Counter {...{initialCount}}/>, checkChildren: {childAmount: 1}},
            {checkTitle: "3 lis elements", comp: <Counter {...{initialCount}}/>, checkChildren: {childAmount: 3, elementQuery: (element: Element) => element.querySelector("ul")!}},
            {checkTitle: "display 29 after clicking 2 times", comp: <Counter {...{initialCount}}/>, 
                actions: [
                    {actionLabel: "click", elementQuery: (el: Element) => el}, 
                    {actionLabel: "click", elementQuery: (el: Element) => el}
                ], 
                expectMatch: "29"
            },
        ]
    )  

    initialCount = 5000;

    testWrapper(
        "checking counter component", 
        [
            {checkTitle: "shouldn't display on 5000", comp: <Counter {...{initialCount}}/>, shouldDisplay: false},
        ]
    )  
})()

// describe("checking click", () => {

//     let div : HTMLDivElement;
//     div = document.createElement("div");
//     test("clicking and changing", async () => {
    
//     ReactDOM.render(<Counter initialCount={0}/>, div);
//     await ReactTestUtils.Simulate.click(div.children[0]);
//     await ReactTestUtils.Simulate.click(div.children[0]);
//     await ReactTestUtils.Simulate.click(div.children[0]);
//     await ReactTestUtils.Simulate.click(div.children[0]);

//     expect(div.textContent).toMatch("4");

//     })
// })
