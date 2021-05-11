import React from 'react';
import { Counter } from "../comps/Counter"
import { testWrapper } from '../helpers/helpers';


(function furtherWrapping(){

    let initialCount = 27;

    testWrapper(
        "checking counter component", 
        [
            {
                checkTitle: "should display, show 27, blue and borderless, with 1 child", 
                comp: <Counter {...{initialCount}}/>, 
                shouldDisplay: true, 
                expectMatch: "27", 
                checkStyling: {border: "", "background-color": "blue", "border-radius": "10px"}, 
                checkChildren: {childAmount: 1}
            },

            {
                checkTitle: "3 lis elements", 
                comp: <Counter {...{initialCount}}/>, 
                checkChildren: {childAmount: 3, elementQuery: (el: Element) => el.querySelector("ul")!}
            },

            {
                checkTitle: "display 29 after clicking 2 times", 
                comp: <Counter {...{initialCount}}/>, 
                actions: [
                    {actionLabel: "click"}, 
                    {actionLabel: "click"}
                ], 
                expectMatch: "29"
            },

            {
                checkTitle: "shouldn't display on initialCount=5000", 
                comp: <Counter initialCount={5000}/>, 
                shouldDisplay: false
            },
        ]
    )  
})()
