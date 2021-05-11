import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";

export class Replicator<T>{
    sample: T | null = null;
    uniqueKeys?: string[];

    constructor(sampleObject: T, uniqueKeys?: string[]){
        this.sample = sampleObject;
        this.uniqueKeys = uniqueKeys;
    }

    getCopy(fraction : Partial<T>){
        return {...this.sample, ...fraction};
    }

    getBunch(amount: number, fraction : Partial<T>){
        let values =  Array.from(Array(amount).keys()).map(i => {
            let value = this.getCopy({...fraction})
            if(this.uniqueKeys){
                this.uniqueKeys.forEach(k => {
                    var isNumber = typeof (value as any)[k] === "number"
                    value = {...value, [k]: isNumber ? (value as any)[k]+i : (value as any)[k]}
                })
            }
            return value;
        })
        return values;
    }
}

export type fetchType = (input: RequestInfo, init?: RequestInit | undefined) => Promise<any>

interface TestingAction{
    actionLabel: string;
    elementQuery: (element: Element) => Element;
}

export interface Case{
    comp: JSX.Element, 
    checkTitle: string, 
    expectMatch?: string, 
    childNumber?: number, 
    shouldDisplay?: boolean,
    noDisplay?: boolean, 
    checkStyling?: {[key: string]: string}, 
    elementQuery?: (element: Element) => Element
    actions?: TestingAction[]
}

export function testWrapper(title: string, cases: Case[], callMock?: fetchType){

    describe(title, () => {

        let div : HTMLDivElement;

        beforeAll(() => {
            if(callMock) jest.spyOn(global, "fetch").mockImplementation(callMock);
        });
          
        afterAll(() => {
            (global?.fetch as any).mockClear();
        });

        beforeEach(() => {
            div = document.createElement("div");
        })
    
        cases.forEach(c => {
            test(c.checkTitle, async () => {
    
                ReactDOM.render(c.comp, div);
                let compDom = div.children[0];

                if(c.actions){
                    c.actions.forEach(async a => {
                        let action = (ReactTestUtils.Simulate  as any)[a.actionLabel]
                        if(action) await action(a.elementQuery(compDom));
                    })
                }


                if(c.shouldDisplay) expect(compDom).toBeTruthy();
                if(c.noDisplay) expect(compDom).not.toBeTruthy();
                if(c.expectMatch) expect(compDom.textContent).toMatch(c.expectMatch);
                if(c.childNumber) expect((c.elementQuery ? c.elementQuery(compDom) : compDom)?.childElementCount).toBe(c.childNumber);
                if(c.checkStyling){
                    const style = window.getComputedStyle(compDom);
                    Object.keys(c.checkStyling).forEach(k => {
                        expect(style.getPropertyValue(k)).toBe(c.checkStyling![k]);
                    })
                }
            })
        })
        
    })
}





// function fetchMock(url, suffix = "") {
//     return new Promise((resolve) =>
//       setTimeout(() => {
//         resolve({
//           json: () =>
//             Promise.resolve({
//               data: url + suffix,
//             }),
//         });
//       }, 200 + Math.random() * 300)
//     );
//   }



// type KeysMatching<T, V> = NonNullable<
//   { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
// >;


// interface IApplicationQuote {
//     readonly downloadedDocs: number;
//     readonly downloadedKb: number;
//     readonly uploadedKb: number;
//     readonly uploadedRefs: number;
// }

// type NumericProps = KeysMatching<IApplicationQuote, number>;

// function toDbObject<T> (value: T): U<T> {
//     return Object.fromEntries(
//       Object.entries(value).map(
//         ([key, value]) => [key, typeof value === 'boolean' ? +value : value]
//       )
//     ) as U<T>
//   }
