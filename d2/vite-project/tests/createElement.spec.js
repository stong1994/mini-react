import { it, expect, describe } from 'vitest';
import React from '../core/React'
/*
pnpm i vitest -D
pnpm test
*/
describe('createElement', () => {
    it('should return vdom for element', () => {
        const el = React.createElement("div", null, "hi");
        expect(el).toEqual({
            type: "div",
            props: {
                children: [
                    {
                        type: "TEXT_ELEMENT",
                        props: {
                            nodeValue: "hi",
                            children: [],
                        }
                    }
                ]
            }
        })
    })

    it('should return element vdom', ()=>{
        const el = React.createElement("div", {id:"id"}, "hi");
        expect(el).toMatchInlineSnapshot(`
          {
            "props": {
              "children": [
                {
                  "props": {
                    "children": [],
                    "nodeValue": "hi",
                  },
                  "type": "TEXT_ELEMENT",
                },
              ],
              "id": "id",
            },
            "type": "div",
          }
        `)
        
    })
})