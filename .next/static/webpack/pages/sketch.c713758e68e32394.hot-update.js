"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/sketch",{

/***/ "./src/pages/classes/Level.tsx":
/*!*************************************!*\
  !*** ./src/pages/classes/Level.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Level; }\n/* harmony export */ });\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ \"./src/pages/classes/Tile.tsx\");\n\nclass Level {\n    createLayout() {\n        for(let i = 0; i < this.rows; i++){\n            let row = [];\n            for(let j = 0; j < this.cols; j++){\n                // get the code for the current tile\n                let code = this.rawLayout[i * this.cols + j];\n                let image;\n                // use the appropriate image for the tile based on its code\n                switch(code){\n                    case \"gra\":\n                        image = this.images[0];\n                        break;\n                    case \"dir\":\n                        image = this.images[1];\n                        break;\n                    case \"coi\":\n                        image = this.images[2];\n                        break;\n                    case \"gem\":\n                        image = this.images[3];\n                        break;\n                    case \"cll\":\n                        image = this.images[4];\n                        break;\n                    case \"clr\":\n                        image = this.images[5];\n                        break;\n                    case \"flo\":\n                        image = this.images[6];\n                        break;\n                    case \"psm\":\n                        image = this.images[7];\n                        break;\n                    case \"pbd\":\n                        image = this.images[8];\n                        break;\n                    case \"pbu\":\n                        image = this.images[9];\n                        break;\n                    case \"tsm\":\n                        image = this.images[10];\n                        break;\n                    case \"tbd\":\n                        image = this.images[11];\n                        break;\n                    case \"tbu\":\n                        image = this.images[12];\n                        break;\n                    case \"sto\":\n                        image = this.images[13];\n                        break;\n                    case \"spi\":\n                        image = this.images[14];\n                        break;\n                    case \"000\":\n                        image = this.images[15];\n                        break;\n                    default:\n                        image = this.images[16];\n                        break;\n                }\n                // create a new tile with the code and image\n                let tile = new _Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](code, image, this.p);\n                row.push(tile);\n            }\n            // add the row of tiles to the layout\n            this.layout.push(row);\n        }\n    }\n    draw(xOffset, yOffset, debug) {\n        this.p.push();\n        this.p.noStroke();\n        this.p.fill(\"lightskyblue\");\n        // draw the background of the level\n        this.p.rect(xOffset, yOffset, this.levelWidth, this.levelHeight);\n        this.p.pop();\n        // draw each tile in the layout\n        for(let i = 0; i < this.rows; i++){\n            for(let j = 0; j < this.cols; j++){\n                let x = xOffset + j * this.tile_size;\n                let y = yOffset + i * this.tile_size;\n                let tile = this.layout[i][j];\n                tile.draw(x, y, this.tile_size, debug);\n            }\n        }\n    }\n    constructor(rows, cols, rawlayout, tile_size, images, p){\n        this.handleCollisions = (player, xOffset, yOffset)=>{\n            // calculate the player's bounding box\n            let playerLeft = player.x + player.width * 0.01;\n            let playerRight = player.x + player.width;\n            let playerTop = player.y + player.height * 0.01;\n            let playerBottom = player.y + player.height;\n            // add the player's velocity to their position\n            let newPlayerLeft = playerLeft + player.vx;\n            let newPlayerRight = playerRight + player.vx;\n            let newPlayerTop = playerTop + player.vy;\n            let newPlayerBottom = playerBottom + player.vy;\n            let tileLeft;\n            let tileRight;\n            let tileTop;\n            let tileBottom;\n            // loop through the grid array and check for collisions\n            for(let i = 0; i < this.rows; i++){\n                for(let j = 0; j < this.cols; j++){\n                    switch(this.layout[i][j].code){\n                        case \"gra\":\n                        case \"sto\":\n                            // calculate the bounding box of the tile with a buffer \n                            tileLeft = xOffset + j * this.tile_size;\n                            tileRight = xOffset + (j + 1) * this.tile_size;\n                            tileTop = yOffset + i * this.tile_size;\n                            tileBottom = yOffset + (i + 1) * this.tile_size;\n                            // check if the player's bounding box overlaps with the tile's bounding box\n                            if (newPlayerLeft < tileRight && newPlayerRight > tileLeft && newPlayerTop < tileBottom && newPlayerBottom > tileTop) {\n                                let overlapLeft = Math.max(newPlayerLeft, tileLeft);\n                                let overlapRight = Math.min(newPlayerRight, tileRight);\n                                let overlapTop = Math.max(newPlayerTop, tileTop);\n                                let overlapBottom = Math.min(newPlayerBottom, tileBottom);\n                                let overlapWidth = overlapRight - overlapLeft;\n                                let overlapHeight = overlapBottom - overlapTop;\n                                // determine the direction of the collision\n                                let direction;\n                                if (overlapWidth < overlapHeight) {\n                                    direction = overlapLeft < newPlayerLeft ? \"left\" : \"right\";\n                                } else {\n                                    direction = overlapTop < newPlayerTop ? \"up\" : \"down\";\n                                }\n                                // adjust the player's position based on the overlap and direction of the collision\n                                switch(direction){\n                                    case \"left\":\n                                        player.x += overlapWidth - player.vx;\n                                        break;\n                                    case \"right\":\n                                        player.x -= overlapWidth - player.vx;\n                                        break;\n                                    case \"up\":\n                                        player.y += overlapHeight - player.vy;\n                                        break;\n                                    case \"down\":\n                                        player.y -= overlapHeight - player.vy;\n                                        player.jumps = 2;\n                                        player.vy = 0; // reset the player's vertical velocity\n                                        break;\n                                }\n                            }\n                            break;\n                        case \"spi\":\n                            // calculate the bounding box of the tile\n                            tileLeft = xOffset + j * this.tile_size;\n                            tileRight = xOffset + (j + 1) * this.tile_size;\n                            tileTop = yOffset + i * this.tile_size + 0.28 * this.tile_size;\n                            tileBottom = yOffset + (i + 1) * this.tile_size;\n                            // check if the player's bounding box overlaps with the tile's bounding box\n                            if (newPlayerLeft < tileRight && newPlayerRight > tileLeft && newPlayerTop < tileBottom && newPlayerBottom > tileTop) {\n                                // there is a collision!\n                                // reset the player's position to their previous position\n                                let overlapLeft = Math.max(newPlayerLeft, tileLeft);\n                                let overlapRight = Math.min(newPlayerRight, tileRight);\n                                let overlapTop = Math.max(newPlayerTop, tileTop);\n                                let overlapBottom = Math.min(newPlayerBottom, tileBottom);\n                                let overlapWidth = overlapRight - overlapLeft;\n                                let overlapHeight = overlapBottom - overlapTop;\n                                // determine the direction of the collision\n                                let direction;\n                                if (overlapWidth < overlapHeight) {\n                                    direction = overlapLeft < newPlayerLeft ? \"left\" : \"right\";\n                                } else {\n                                    direction = overlapTop < newPlayerTop ? \"up\" : \"down\";\n                                }\n                                // adjust the player's position based on the overlap and direction of the collision\n                                switch(direction){\n                                    case \"left\":\n                                        player.x += overlapWidth - player.vx;\n                                        break;\n                                    case \"right\":\n                                        player.x -= overlapWidth - player.vx;\n                                        break;\n                                    case \"up\":\n                                        player.y += overlapHeight - player.vy;\n                                        break;\n                                    case \"down\":\n                                        player.y -= overlapHeight - player.vy;\n                                        player.vy = 0; // reset the player's vertical velocity\n                                        break;\n                                }\n                                /* Death triggers */ player.isAlive = false;\n                            }\n                            break;\n                        case \"coi\":\n                        case \"gem\":\n                            // calculate the center and radius of the ellipse\n                            let centerX = xOffset + j * this.tile_size + this.tile_size * 0.5;\n                            let centerY = yOffset + i * this.tile_size + this.tile_size * 0.5;\n                            let radiusX = this.tile_size * 0.35;\n                            let radiusY = this.tile_size * 0.35;\n                            // check if the player's bounding box overlaps with the tile's ellipse\n                            if (playerLeft < centerX + radiusX && playerRight > centerX - radiusX && playerTop < centerY + radiusY && playerBottom > centerY - radiusY) {\n                                this.layout[i][j].code = \"000\";\n                                this.layout[i][j].image = this.images[15];\n                            }\n                            break;\n                        default:\n                            break;\n                    }\n                }\n            }\n        };\n        this.rows = rows;\n        this.cols = cols;\n        this.rawLayout = rawlayout;\n        this.tile_size = tile_size;\n        this.layout = [];\n        this.p = p;\n        this.images = images;\n        this.levelWidth = this.cols * this.tile_size;\n        this.levelHeight = this.rows * this.tile_size;\n        // create the layout\n        this.createLayout();\n    }\n}\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvY2xhc3Nlcy9MZXZlbC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDMEI7QUFHWCxNQUFNQztJQTBCbkJDLGVBQWU7UUFDYixJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNDLElBQUksRUFBRUQsSUFBSztZQUNsQyxJQUFJRSxNQUFNLEVBQUU7WUFDWixJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNDLElBQUksRUFBRUQsSUFBSztnQkFDbEMsb0NBQW9DO2dCQUNwQyxJQUFJRSxPQUFPLElBQUksQ0FBQ0MsU0FBUyxDQUFDTixJQUFJLElBQUksQ0FBQ0ksSUFBSSxHQUFHRCxFQUFFO2dCQUM1QyxJQUFJSTtnQkFFSiwyREFBMkQ7Z0JBQzNELE9BQU9GO29CQUNMLEtBQUs7d0JBQVFFLFFBQU0sSUFBSSxDQUFDQyxNQUFNLENBQUMsRUFBRTt3QkFBRSxLQUFNO29CQUN6QyxLQUFLO3dCQUFRRCxRQUFNLElBQUksQ0FBQ0MsTUFBTSxDQUFDLEVBQUU7d0JBQUUsS0FBTTtvQkFDekMsS0FBSzt3QkFBUUQsUUFBTSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxFQUFFO3dCQUFFLEtBQU07b0JBQ3pDLEtBQUs7d0JBQVFELFFBQU0sSUFBSSxDQUFDQyxNQUFNLENBQUMsRUFBRTt3QkFBRSxLQUFNO29CQUN6QyxLQUFLO3dCQUFRRCxRQUFNLElBQUksQ0FBQ0MsTUFBTSxDQUFDLEVBQUU7d0JBQUUsS0FBTTtvQkFDekMsS0FBSzt3QkFBUUQsUUFBTSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxFQUFFO3dCQUFFLEtBQU07b0JBQ3pDLEtBQUs7d0JBQVFELFFBQU0sSUFBSSxDQUFDQyxNQUFNLENBQUMsRUFBRTt3QkFBRSxLQUFNO29CQUN6QyxLQUFLO3dCQUFRRCxRQUFNLElBQUksQ0FBQ0MsTUFBTSxDQUFDLEVBQUU7d0JBQUUsS0FBTTtvQkFDekMsS0FBSzt3QkFBUUQsUUFBTSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxFQUFFO3dCQUFFLEtBQU07b0JBQ3pDLEtBQUs7d0JBQVFELFFBQU0sSUFBSSxDQUFDQyxNQUFNLENBQUMsRUFBRTt3QkFBRSxLQUFNO29CQUN6QyxLQUFLO3dCQUFRRCxRQUFNLElBQUksQ0FBQ0MsTUFBTSxDQUFDLEdBQUc7d0JBQUUsS0FBTTtvQkFDMUMsS0FBSzt3QkFBUUQsUUFBTSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxHQUFHO3dCQUFFLEtBQU07b0JBQzFDLEtBQUs7d0JBQVFELFFBQU0sSUFBSSxDQUFDQyxNQUFNLENBQUMsR0FBRzt3QkFBRSxLQUFNO29CQUMxQyxLQUFLO3dCQUFRRCxRQUFNLElBQUksQ0FBQ0MsTUFBTSxDQUFDLEdBQUc7d0JBQUUsS0FBTTtvQkFDMUMsS0FBSzt3QkFBUUQsUUFBTSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxHQUFHO3dCQUFFLEtBQU07b0JBQzFDLEtBQUs7d0JBQVFELFFBQU0sSUFBSSxDQUFDQyxNQUFNLENBQUMsR0FBRzt3QkFBRSxLQUFNO29CQUMxQzt3QkFBU0QsUUFBTSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxHQUFHO3dCQUFFLEtBQU07Z0JBQ3hDO2dCQUVBLDRDQUE0QztnQkFDNUMsSUFBSUMsT0FBTyxJQUFJWiw2Q0FBSUEsQ0FBQ1EsTUFBTUUsT0FBTyxJQUFJLENBQUNHLENBQUM7Z0JBQ3ZDUixJQUFJUyxJQUFJLENBQUNGO1lBQ1g7WUFDQSxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDRyxNQUFNLENBQUNELElBQUksQ0FBQ1Q7UUFDbkI7SUFDRjtJQUVBVyxLQUFLQyxPQUFlLEVBQUVDLE9BQWUsRUFBQ0MsS0FBYSxFQUFFO1FBQ25ELElBQUksQ0FBQ04sQ0FBQyxDQUFDQyxJQUFJO1FBQ1QsSUFBSSxDQUFDRCxDQUFDLENBQUNPLFFBQVE7UUFDZixJQUFJLENBQUNQLENBQUMsQ0FBQ1EsSUFBSSxDQUFDO1FBQ2QsbUNBQW1DO1FBQ2pDLElBQUksQ0FBQ1IsQ0FBQyxDQUFDUyxJQUFJLENBQUNMLFNBQVNDLFNBQVMsSUFBSSxDQUFDSyxVQUFVLEVBQUUsSUFBSSxDQUFDQyxXQUFXO1FBQ2pFLElBQUksQ0FBQ1gsQ0FBQyxDQUFDWSxHQUFHO1FBQ1YsK0JBQStCO1FBQy9CLElBQUssSUFBSXRCLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNDLElBQUksRUFBRUQsSUFBSztZQUNsQyxJQUFLLElBQUlHLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNDLElBQUksRUFBRUQsSUFBSztnQkFDbEMsSUFBSW9CLElBQUlULFVBQVdYLElBQUksSUFBSSxDQUFDcUIsU0FBUztnQkFDckMsSUFBSUMsSUFBSVYsVUFBV2YsSUFBSSxJQUFJLENBQUN3QixTQUFTO2dCQUNyQyxJQUFJZixPQUFPLElBQUksQ0FBQ0csTUFBTSxDQUFDWixFQUFFLENBQUNHLEVBQUU7Z0JBQzVCTSxLQUFLSSxJQUFJLENBQUNVLEdBQUdFLEdBQUcsSUFBSSxDQUFDRCxTQUFTLEVBQUNSO1lBQ2pDO1FBQ0Y7SUFDRjtJQXJFQVUsWUFBWXpCLElBQVksRUFBRUcsSUFBWSxFQUFFdUIsU0FBbUIsRUFBRUgsU0FBaUIsRUFBRWhCLE1BQWEsRUFBRUUsQ0FBSyxDQUFFO2FBdUV0R2tCLG1CQUFrQixDQUFDQyxRQUFjZixTQUFlQyxVQUFtQjtZQUNqRSxzQ0FBc0M7WUFDdEMsSUFBSWUsYUFBYUQsT0FBT04sQ0FBQyxHQUFHTSxPQUFPRSxLQUFLLEdBQUc7WUFDM0MsSUFBSUMsY0FBY0gsT0FBT04sQ0FBQyxHQUFHTSxPQUFPRSxLQUFLO1lBQ3pDLElBQUlFLFlBQVlKLE9BQU9KLENBQUMsR0FBR0ksT0FBT0ssTUFBTSxHQUFHO1lBQzNDLElBQUlDLGVBQWVOLE9BQU9KLENBQUMsR0FBR0ksT0FBT0ssTUFBTTtZQUUzQyw4Q0FBOEM7WUFDOUMsSUFBSUUsZ0JBQWdCTixhQUFhRCxPQUFPUSxFQUFFO1lBQzFDLElBQUlDLGlCQUFpQk4sY0FBY0gsT0FBT1EsRUFBRTtZQUM1QyxJQUFJRSxlQUFlTixZQUFZSixPQUFPVyxFQUFFO1lBQ3hDLElBQUlDLGtCQUFrQk4sZUFBZU4sT0FBT1csRUFBRTtZQUU5QyxJQUFJRTtZQUNKLElBQUlDO1lBQ0osSUFBSUM7WUFDSixJQUFJQztZQUNKLHVEQUF1RDtZQUN2RCxJQUFLLElBQUk3QyxJQUFJLEdBQUdBLElBQUksSUFBSSxDQUFDQyxJQUFJLEVBQUVELElBQUs7Z0JBQ2xDLElBQUssSUFBSUcsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ0MsSUFBSSxFQUFFRCxJQUFLO29CQUVsQyxPQUFPLElBQUksQ0FBQ1MsTUFBTSxDQUFDWixFQUFFLENBQUNHLEVBQUUsQ0FBQ0UsSUFBSTt3QkFFM0IsS0FBSzt3QkFDTCxLQUFLOzRCQUNILHdEQUF3RDs0QkFDeERxQyxXQUFXNUIsVUFBV1gsSUFBSSxJQUFJLENBQUNxQixTQUFTOzRCQUN4Q21CLFlBQVk3QixVQUFVLENBQUNYLElBQUUsS0FBSyxJQUFJLENBQUNxQixTQUFTOzRCQUM1Q29CLFVBQVU3QixVQUFVZixJQUFJLElBQUksQ0FBQ3dCLFNBQVM7NEJBQ3RDcUIsYUFBYTlCLFVBQVMsQ0FBQ2YsSUFBRSxLQUFLLElBQUksQ0FBQ3dCLFNBQVM7NEJBRTVDLDJFQUEyRTs0QkFDM0UsSUFBSVksZ0JBQWdCTyxhQUFhTCxpQkFBaUJJLFlBQVlILGVBQWVNLGNBQWNKLGtCQUFrQkcsU0FBUztnQ0FFaEgsSUFBSUUsY0FBY0MsS0FBS0MsR0FBRyxDQUFDWixlQUFlTTtnQ0FDMUMsSUFBSU8sZUFBZUYsS0FBS0csR0FBRyxDQUFDWixnQkFBZ0JLO2dDQUM1QyxJQUFJUSxhQUFhSixLQUFLQyxHQUFHLENBQUNULGNBQWNLO2dDQUN4QyxJQUFJUSxnQkFBZ0JMLEtBQUtHLEdBQUcsQ0FBQ1QsaUJBQWlCSTtnQ0FDOUMsSUFBSVEsZUFBZUosZUFBZUg7Z0NBQ2xDLElBQUlRLGdCQUFnQkYsZ0JBQWdCRDtnQ0FFcEMsMkNBQTJDO2dDQUMzQyxJQUFJSTtnQ0FFSixJQUFJRixlQUFlQyxlQUFlO29DQUNoQ0MsWUFBWVQsY0FBY1YsZ0JBQWdCLFNBQVMsT0FBTztnQ0FDNUQsT0FBTztvQ0FDTG1CLFlBQVlKLGFBQWFaLGVBQWUsT0FBTyxNQUFNO2dDQUN2RCxDQUFDO2dDQUVILG1GQUFtRjtnQ0FDbkYsT0FBUWdCO29DQUNOLEtBQUs7d0NBQ0gxQixPQUFPTixDQUFDLElBQUk4QixlQUFleEIsT0FBT1EsRUFBRTt3Q0FDcEMsS0FBTTtvQ0FDUixLQUFLO3dDQUNIUixPQUFPTixDQUFDLElBQUk4QixlQUFleEIsT0FBT1EsRUFBRTt3Q0FDcEMsS0FBTTtvQ0FDUixLQUFLO3dDQUNIUixPQUFPSixDQUFDLElBQUk2QixnQkFBZ0J6QixPQUFPVyxFQUFFO3dDQUNyQyxLQUFNO29DQUNSLEtBQUs7d0NBQ0hYLE9BQU9KLENBQUMsSUFBSTZCLGdCQUFnQnpCLE9BQU9XLEVBQUU7d0NBQ3JDWCxPQUFPMkIsS0FBSyxHQUFDO3dDQUNiM0IsT0FBT1csRUFBRSxHQUFHLEdBQUcsdUNBQXVDO3dDQUN0RCxLQUFNO2dDQUNWOzRCQUNKLENBQUM7NEJBQ0gsS0FBTTt3QkFFTixLQUFLOzRCQUNILHlDQUF5Qzs0QkFDekNFLFdBQVc1QixVQUFXWCxJQUFJLElBQUksQ0FBQ3FCLFNBQVM7NEJBQ3hDbUIsWUFBYTdCLFVBQVUsQ0FBQ1gsSUFBRSxLQUFLLElBQUksQ0FBQ3FCLFNBQVM7NEJBQzdDb0IsVUFBVTdCLFVBQVVmLElBQUksSUFBSSxDQUFDd0IsU0FBUyxHQUFHLE9BQUssSUFBSSxDQUFDQSxTQUFTOzRCQUM1RHFCLGFBQWE5QixVQUFTLENBQUNmLElBQUUsS0FBSyxJQUFJLENBQUN3QixTQUFTOzRCQUU1QywyRUFBMkU7NEJBQzNFLElBQUlZLGdCQUFnQk8sYUFBYUwsaUJBQWlCSSxZQUFZSCxlQUFlTSxjQUFjSixrQkFBa0JHLFNBQVM7Z0NBQ3BILHdCQUF3QjtnQ0FDeEIseURBQXlEO2dDQUN2RCxJQUFJRSxjQUFjQyxLQUFLQyxHQUFHLENBQUNaLGVBQWVNO2dDQUMxQyxJQUFJTyxlQUFlRixLQUFLRyxHQUFHLENBQUNaLGdCQUFnQks7Z0NBQzVDLElBQUlRLGFBQWFKLEtBQUtDLEdBQUcsQ0FBQ1QsY0FBY0s7Z0NBQ3hDLElBQUlRLGdCQUFnQkwsS0FBS0csR0FBRyxDQUFDVCxpQkFBaUJJO2dDQUM5QyxJQUFJUSxlQUFlSixlQUFlSDtnQ0FDbEMsSUFBSVEsZ0JBQWdCRixnQkFBZ0JEO2dDQUVwQywyQ0FBMkM7Z0NBQzNDLElBQUlJO2dDQUVKLElBQUlGLGVBQWVDLGVBQWU7b0NBQ2hDQyxZQUFZVCxjQUFjVixnQkFBZ0IsU0FBUyxPQUFPO2dDQUM1RCxPQUFPO29DQUNMbUIsWUFBWUosYUFBYVosZUFBZSxPQUFPLE1BQU07Z0NBQ3ZELENBQUM7Z0NBRUQsbUZBQW1GO2dDQUNuRixPQUFRZ0I7b0NBQ04sS0FBSzt3Q0FDSDFCLE9BQU9OLENBQUMsSUFBSThCLGVBQWV4QixPQUFPUSxFQUFFO3dDQUNwQyxLQUFNO29DQUNSLEtBQUs7d0NBQ0hSLE9BQU9OLENBQUMsSUFBSThCLGVBQWV4QixPQUFPUSxFQUFFO3dDQUNwQyxLQUFNO29DQUNSLEtBQUs7d0NBQ0hSLE9BQU9KLENBQUMsSUFBSTZCLGdCQUFnQnpCLE9BQU9XLEVBQUU7d0NBQ3JDLEtBQU07b0NBQ1IsS0FBSzt3Q0FDSFgsT0FBT0osQ0FBQyxJQUFJNkIsZ0JBQWdCekIsT0FBT1csRUFBRTt3Q0FDckNYLE9BQU9XLEVBQUUsR0FBRyxHQUFHLHVDQUF1Qzt3Q0FFdEQsS0FBTTtnQ0FDVjtnQ0FDRixrQkFBa0IsR0FDbEJYLE9BQU80QixPQUFPLEdBQUMsS0FBSzs0QkFDdEIsQ0FBQzs0QkFDSCxLQUFNO3dCQUVOLEtBQUs7d0JBQ0wsS0FBSzs0QkFDSCxpREFBaUQ7NEJBQ2pELElBQUlDLFVBQVU1QyxVQUFXWCxJQUFJLElBQUksQ0FBQ3FCLFNBQVMsR0FBSyxJQUFJLENBQUNBLFNBQVMsR0FBRzs0QkFDakUsSUFBSW1DLFVBQVU1QyxVQUFVZixJQUFJLElBQUksQ0FBQ3dCLFNBQVMsR0FBSyxJQUFJLENBQUNBLFNBQVMsR0FBRzs0QkFDaEUsSUFBSW9DLFVBQVUsSUFBSSxDQUFDcEMsU0FBUyxHQUFHOzRCQUMvQixJQUFJcUMsVUFBVSxJQUFJLENBQUNyQyxTQUFTLEdBQUc7NEJBRS9CLHNFQUFzRTs0QkFDdEUsSUFBSU0sYUFBYTRCLFVBQVVFLFdBQVc1QixjQUFjMEIsVUFBVUUsV0FBVzNCLFlBQVkwQixVQUFVRSxXQUFXMUIsZUFBZXdCLFVBQVVFLFNBQVM7Z0NBQzFJLElBQUksQ0FBQ2pELE1BQU0sQ0FBQ1osRUFBRSxDQUFDRyxFQUFFLENBQUNFLElBQUksR0FBQztnQ0FDdkIsSUFBSSxDQUFDTyxNQUFNLENBQUNaLEVBQUUsQ0FBQ0csRUFBRSxDQUFDSSxLQUFLLEdBQUMsSUFBSSxDQUFDQyxNQUFNLENBQUMsR0FBRzs0QkFDekMsQ0FBQzs0QkFDSCxLQUFNO3dCQUVOOzRCQUFVLEtBQU07b0JBQ2xCO2dCQUNGO1lBQ0Y7UUFDRjtRQWhORSxJQUFJLENBQUNQLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNHLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNFLFNBQVMsR0FBR3FCO1FBQ2pCLElBQUksQ0FBQ0gsU0FBUyxHQUFHQTtRQUNqQixJQUFJLENBQUNaLE1BQU0sR0FBRyxFQUFFO1FBQ2hCLElBQUksQ0FBQ0YsQ0FBQyxHQUFHQTtRQUNULElBQUksQ0FBQ0YsTUFBTSxHQUFHQTtRQUNkLElBQUksQ0FBQ1ksVUFBVSxHQUFHLElBQUksQ0FBQ2hCLElBQUksR0FBRyxJQUFJLENBQUNvQixTQUFTO1FBQzVDLElBQUksQ0FBQ0gsV0FBVyxHQUFHLElBQUksQ0FBQ3BCLElBQUksR0FBRyxJQUFJLENBQUN1QixTQUFTO1FBRTdDLG9CQUFvQjtRQUNwQixJQUFJLENBQUN6QixZQUFZO0lBQ25CO0FBc01GO0FBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2NsYXNzZXMvTGV2ZWwudHN4PzMzOTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHA1IGZyb20gJ3A1JztcbmltcG9ydCBUaWxlIGZyb20gJy4vVGlsZSc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWwge1xuICByb3dzOiBudW1iZXI7XG4gIGNvbHM6IG51bWJlcjtcbiAgcmF3TGF5b3V0OiBzdHJpbmdbXTtcbiAgdGlsZV9zaXplOiBudW1iZXI7XG4gIGxheW91dDogVGlsZVtdW107XG4gIHA6IHA1O1xuICBpbWFnZXM6IGFueVtdO1xuICBsZXZlbFdpZHRoOiBudW1iZXI7XG4gIGxldmVsSGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3Iocm93czogbnVtYmVyLCBjb2xzOiBudW1iZXIsIHJhd2xheW91dDogc3RyaW5nW10sIHRpbGVfc2l6ZTogbnVtYmVyLCBpbWFnZXM6IGFueVtdLCBwOiBwNSkge1xuICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgdGhpcy5jb2xzID0gY29scztcbiAgICB0aGlzLnJhd0xheW91dCA9IHJhd2xheW91dDsgXG4gICAgdGhpcy50aWxlX3NpemUgPSB0aWxlX3NpemU7XG4gICAgdGhpcy5sYXlvdXQgPSBbXTsgXG4gICAgdGhpcy5wID0gcDtcbiAgICB0aGlzLmltYWdlcyA9IGltYWdlcztcbiAgICB0aGlzLmxldmVsV2lkdGggPSB0aGlzLmNvbHMgKiB0aGlzLnRpbGVfc2l6ZTtcbiAgICB0aGlzLmxldmVsSGVpZ2h0ID0gdGhpcy5yb3dzICogdGhpcy50aWxlX3NpemU7XG5cbiAgICAvLyBjcmVhdGUgdGhlIGxheW91dFxuICAgIHRoaXMuY3JlYXRlTGF5b3V0KCk7XG4gIH1cblxuICBjcmVhdGVMYXlvdXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgbGV0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHM7IGorKykge1xuICAgICAgICAvLyBnZXQgdGhlIGNvZGUgZm9yIHRoZSBjdXJyZW50IHRpbGVcbiAgICAgICAgbGV0IGNvZGUgPSB0aGlzLnJhd0xheW91dFtpICogdGhpcy5jb2xzICsgal07XG4gICAgICAgIGxldCBpbWFnZTtcblxuICAgICAgICAvLyB1c2UgdGhlIGFwcHJvcHJpYXRlIGltYWdlIGZvciB0aGUgdGlsZSBiYXNlZCBvbiBpdHMgY29kZVxuICAgICAgICBzd2l0Y2goY29kZSl7XG4gICAgICAgICAgY2FzZShcImdyYVwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbMF07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJkaXJcIik6IGltYWdlPXRoaXMuaW1hZ2VzWzFdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwiY29pXCIpOiBpbWFnZT10aGlzLmltYWdlc1syXTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcImdlbVwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbM107IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJjbGxcIik6IGltYWdlPXRoaXMuaW1hZ2VzWzRdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwiY2xyXCIpOiBpbWFnZT10aGlzLmltYWdlc1s1XTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcImZsb1wiKTogaW1hZ2U9dGhpcy5pbWFnZXNbNl07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJwc21cIik6IGltYWdlPXRoaXMuaW1hZ2VzWzddOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwicGJkXCIpOiBpbWFnZT10aGlzLmltYWdlc1s4XTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcInBidVwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbOV07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJ0c21cIik6IGltYWdlPXRoaXMuaW1hZ2VzWzEwXTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcInRiZFwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbMTFdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwidGJ1XCIpOiBpbWFnZT10aGlzLmltYWdlc1sxMl07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJzdG9cIik6IGltYWdlPXRoaXMuaW1hZ2VzWzEzXTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcInNwaVwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbMTRdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwiMDAwXCIpOiBpbWFnZT10aGlzLmltYWdlc1sxNV07IGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6IGltYWdlPXRoaXMuaW1hZ2VzWzE2XTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyB0aWxlIHdpdGggdGhlIGNvZGUgYW5kIGltYWdlXG4gICAgICAgIGxldCB0aWxlID0gbmV3IFRpbGUoY29kZSwgaW1hZ2UsIHRoaXMucCk7XG4gICAgICAgIHJvdy5wdXNoKHRpbGUpO1xuICAgICAgfVxuICAgICAgLy8gYWRkIHRoZSByb3cgb2YgdGlsZXMgdG8gdGhlIGxheW91dFxuICAgICAgdGhpcy5sYXlvdXQucHVzaChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXcoeE9mZnNldDogbnVtYmVyLCB5T2Zmc2V0OiBudW1iZXIsZGVidWc6Ym9vbGVhbikge1xuICAgIHRoaXMucC5wdXNoKCk7XG4gICAgICB0aGlzLnAubm9TdHJva2UoKTtcbiAgICAgIHRoaXMucC5maWxsKFwibGlnaHRza3libHVlXCIpO1xuICAgIC8vIGRyYXcgdGhlIGJhY2tncm91bmQgb2YgdGhlIGxldmVsXG4gICAgICB0aGlzLnAucmVjdCh4T2Zmc2V0LCB5T2Zmc2V0LCB0aGlzLmxldmVsV2lkdGgsIHRoaXMubGV2ZWxIZWlnaHQpO1xuICAgIHRoaXMucC5wb3AoKTtcbiAgICAvLyBkcmF3IGVhY2ggdGlsZSBpbiB0aGUgbGF5b3V0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHM7IGorKykge1xuICAgICAgICBsZXQgeCA9IHhPZmZzZXQgKyAoaiAqIHRoaXMudGlsZV9zaXplKTtcbiAgICAgICAgbGV0IHkgPSB5T2Zmc2V0ICsgKGkgKiB0aGlzLnRpbGVfc2l6ZSk7XG4gICAgICAgIGxldCB0aWxlID0gdGhpcy5sYXlvdXRbaV1bal07XG4gICAgICAgIHRpbGUuZHJhdyh4LCB5LCB0aGlzLnRpbGVfc2l6ZSxkZWJ1Zyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ29sbGlzaW9ucz0gKHBsYXllcjpQbGF5ZXIseE9mZnNldDpudW1iZXIseU9mZnNldDpudW1iZXIpID0+IHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIHBsYXllcidzIGJvdW5kaW5nIGJveFxuICAgIGxldCBwbGF5ZXJMZWZ0ID0gcGxheWVyLnggKyBwbGF5ZXIud2lkdGggKiAwLjAxO1xuICAgIGxldCBwbGF5ZXJSaWdodCA9IHBsYXllci54ICsgcGxheWVyLndpZHRoO1xuICAgIGxldCBwbGF5ZXJUb3AgPSBwbGF5ZXIueSArIHBsYXllci5oZWlnaHQgKiAwLjAxO1xuICAgIGxldCBwbGF5ZXJCb3R0b20gPSBwbGF5ZXIueSArIHBsYXllci5oZWlnaHQ7XG5cbiAgICAvLyBhZGQgdGhlIHBsYXllcidzIHZlbG9jaXR5IHRvIHRoZWlyIHBvc2l0aW9uXG4gICAgbGV0IG5ld1BsYXllckxlZnQgPSBwbGF5ZXJMZWZ0ICsgcGxheWVyLnZ4O1xuICAgIGxldCBuZXdQbGF5ZXJSaWdodCA9IHBsYXllclJpZ2h0ICsgcGxheWVyLnZ4O1xuICAgIGxldCBuZXdQbGF5ZXJUb3AgPSBwbGF5ZXJUb3AgKyBwbGF5ZXIudnk7XG4gICAgbGV0IG5ld1BsYXllckJvdHRvbSA9IHBsYXllckJvdHRvbSArIHBsYXllci52eTtcblxuICAgIGxldCB0aWxlTGVmdCA7XG4gICAgbGV0IHRpbGVSaWdodDtcbiAgICBsZXQgdGlsZVRvcDtcbiAgICBsZXQgdGlsZUJvdHRvbTtcbiAgICAvLyBsb29wIHRocm91Z2ggdGhlIGdyaWQgYXJyYXkgYW5kIGNoZWNrIGZvciBjb2xsaXNpb25zXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHM7IGorKykge1xuXG4gICAgICAgIHN3aXRjaCh0aGlzLmxheW91dFtpXVtqXS5jb2RlKXtcblxuICAgICAgICAgIGNhc2UoXCJncmFcIik6IFxuICAgICAgICAgIGNhc2UoXCJzdG9cIik6XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgdGlsZSB3aXRoIGEgYnVmZmVyIFxuICAgICAgICAgICAgdGlsZUxlZnQgPSB4T2Zmc2V0ICsgKGogKiB0aGlzLnRpbGVfc2l6ZSk7XG4gICAgICAgICAgICB0aWxlUmlnaHQgPSB4T2Zmc2V0ICsoKGorMSkgKiB0aGlzLnRpbGVfc2l6ZSk7XG4gICAgICAgICAgICB0aWxlVG9wID0geU9mZnNldCsgKGkgKiB0aGlzLnRpbGVfc2l6ZSk7XG4gICAgICAgICAgICB0aWxlQm90dG9tID0geU9mZnNldCsoKGkrMSkgKiB0aGlzLnRpbGVfc2l6ZSk7XG4gICAgXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgcGxheWVyJ3MgYm91bmRpbmcgYm94IG92ZXJsYXBzIHdpdGggdGhlIHRpbGUncyBib3VuZGluZyBib3hcbiAgICAgICAgICAgIGlmIChuZXdQbGF5ZXJMZWZ0IDwgdGlsZVJpZ2h0ICYmIG5ld1BsYXllclJpZ2h0ID4gdGlsZUxlZnQgJiYgbmV3UGxheWVyVG9wIDwgdGlsZUJvdHRvbSAmJiBuZXdQbGF5ZXJCb3R0b20gPiB0aWxlVG9wKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBMZWZ0ID0gTWF0aC5tYXgobmV3UGxheWVyTGVmdCwgdGlsZUxlZnQpO1xuICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBSaWdodCA9IE1hdGgubWluKG5ld1BsYXllclJpZ2h0LCB0aWxlUmlnaHQpO1xuICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBUb3AgPSBNYXRoLm1heChuZXdQbGF5ZXJUb3AsIHRpbGVUb3ApO1xuICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBCb3R0b20gPSBNYXRoLm1pbihuZXdQbGF5ZXJCb3R0b20sIHRpbGVCb3R0b20pO1xuICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBXaWR0aCA9IG92ZXJsYXBSaWdodCAtIG92ZXJsYXBMZWZ0O1xuICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBIZWlnaHQgPSBvdmVybGFwQm90dG9tIC0gb3ZlcmxhcFRvcDtcblxuICAgICAgICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgaWYgKG92ZXJsYXBXaWR0aCA8IG92ZXJsYXBIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gb3ZlcmxhcExlZnQgPCBuZXdQbGF5ZXJMZWZ0ID8gXCJsZWZ0XCIgOiBcInJpZ2h0XCI7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBvdmVybGFwVG9wIDwgbmV3UGxheWVyVG9wID8gXCJ1cFwiIDogXCJkb3duXCI7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGp1c3QgdGhlIHBsYXllcidzIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSBvdmVybGFwIGFuZCBkaXJlY3Rpb24gb2YgdGhlIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIueCArPSBvdmVybGFwV2lkdGggLSBwbGF5ZXIudng7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci54IC09IG92ZXJsYXBXaWR0aCAtIHBsYXllci52eDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnkgKz0gb3ZlcmxhcEhlaWdodCAtIHBsYXllci52eTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIueSAtPSBvdmVybGFwSGVpZ2h0IC0gcGxheWVyLnZ5O1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuanVtcHM9MjtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnZ5ID0gMDsgLy8gcmVzZXQgdGhlIHBsYXllcidzIHZlcnRpY2FsIHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UoXCJzcGlcIik6XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgdGlsZVxuICAgICAgICAgICAgdGlsZUxlZnQgPSB4T2Zmc2V0ICsgKGogKiB0aGlzLnRpbGVfc2l6ZSk7XG4gICAgICAgICAgICB0aWxlUmlnaHQgPSAgeE9mZnNldCArKChqKzEpICogdGhpcy50aWxlX3NpemUpO1xuICAgICAgICAgICAgdGlsZVRvcCA9IHlPZmZzZXQrIChpICogdGhpcy50aWxlX3NpemUpKygwLjI4KnRoaXMudGlsZV9zaXplKTtcbiAgICAgICAgICAgIHRpbGVCb3R0b20gPSB5T2Zmc2V0KygoaSsxKSAqIHRoaXMudGlsZV9zaXplKTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHBsYXllcidzIGJvdW5kaW5nIGJveCBvdmVybGFwcyB3aXRoIHRoZSB0aWxlJ3MgYm91bmRpbmcgYm94XG4gICAgICAgICAgICBpZiAobmV3UGxheWVyTGVmdCA8IHRpbGVSaWdodCAmJiBuZXdQbGF5ZXJSaWdodCA+IHRpbGVMZWZ0ICYmIG5ld1BsYXllclRvcCA8IHRpbGVCb3R0b20gJiYgbmV3UGxheWVyQm90dG9tID4gdGlsZVRvcCkge1xuICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBhIGNvbGxpc2lvbiFcbiAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHBsYXllcidzIHBvc2l0aW9uIHRvIHRoZWlyIHByZXZpb3VzIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBMZWZ0ID0gTWF0aC5tYXgobmV3UGxheWVyTGVmdCwgdGlsZUxlZnQpO1xuICAgICAgICAgICAgICAgIGxldCBvdmVybGFwUmlnaHQgPSBNYXRoLm1pbihuZXdQbGF5ZXJSaWdodCwgdGlsZVJpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgb3ZlcmxhcFRvcCA9IE1hdGgubWF4KG5ld1BsYXllclRvcCwgdGlsZVRvcCk7XG4gICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBCb3R0b20gPSBNYXRoLm1pbihuZXdQbGF5ZXJCb3R0b20sIHRpbGVCb3R0b20pO1xuICAgICAgICAgICAgICAgIGxldCBvdmVybGFwV2lkdGggPSBvdmVybGFwUmlnaHQgLSBvdmVybGFwTGVmdDtcbiAgICAgICAgICAgICAgICBsZXQgb3ZlcmxhcEhlaWdodCA9IG92ZXJsYXBCb3R0b20gLSBvdmVybGFwVG9wO1xuICAgICAgXG4gICAgICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGNvbGxpc2lvblxuICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG92ZXJsYXBXaWR0aCA8IG92ZXJsYXBIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IG92ZXJsYXBMZWZ0IDwgbmV3UGxheWVyTGVmdCA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBvdmVybGFwVG9wIDwgbmV3UGxheWVyVG9wID8gXCJ1cFwiIDogXCJkb3duXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRqdXN0IHRoZSBwbGF5ZXIncyBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgb3ZlcmxhcCBhbmQgZGlyZWN0aW9uIG9mIHRoZSBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnggKz0gb3ZlcmxhcFdpZHRoIC0gcGxheWVyLnZ4O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIueCAtPSBvdmVybGFwV2lkdGggLSBwbGF5ZXIudng7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci55ICs9IG92ZXJsYXBIZWlnaHQgLSBwbGF5ZXIudnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnkgLT0gb3ZlcmxhcEhlaWdodCAtIHBsYXllci52eTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnZ5ID0gMDsgLy8gcmVzZXQgdGhlIHBsYXllcidzIHZlcnRpY2FsIHZlbG9jaXR5XG4gIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8qIERlYXRoIHRyaWdnZXJzICovXG4gICAgICAgICAgICAgIHBsYXllci5pc0FsaXZlPWZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgIFxuICAgICAgICAgIGNhc2UoXCJjb2lcIik6XG4gICAgICAgICAgY2FzZShcImdlbVwiKTpcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgY2VudGVyIGFuZCByYWRpdXMgb2YgdGhlIGVsbGlwc2VcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0geE9mZnNldCArIChqICogdGhpcy50aWxlX3NpemUpICsgKHRoaXMudGlsZV9zaXplICogMC41KTtcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0geU9mZnNldCsgKGkgKiB0aGlzLnRpbGVfc2l6ZSkgKyAodGhpcy50aWxlX3NpemUgKiAwLjUpO1xuICAgICAgICAgICAgbGV0IHJhZGl1c1ggPSB0aGlzLnRpbGVfc2l6ZSAqIDAuMzU7XG4gICAgICAgICAgICBsZXQgcmFkaXVzWSA9IHRoaXMudGlsZV9zaXplICogMC4zNTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHBsYXllcidzIGJvdW5kaW5nIGJveCBvdmVybGFwcyB3aXRoIHRoZSB0aWxlJ3MgZWxsaXBzZVxuICAgICAgICAgICAgaWYgKHBsYXllckxlZnQgPCBjZW50ZXJYICsgcmFkaXVzWCAmJiBwbGF5ZXJSaWdodCA+IGNlbnRlclggLSByYWRpdXNYICYmIHBsYXllclRvcCA8IGNlbnRlclkgKyByYWRpdXNZICYmIHBsYXllckJvdHRvbSA+IGNlbnRlclkgLSByYWRpdXNZKSB7XG4gICAgICAgICAgICAgIHRoaXMubGF5b3V0W2ldW2pdLmNvZGU9XCIwMDBcIjtcbiAgICAgICAgICAgICAgdGhpcy5sYXlvdXRbaV1bal0uaW1hZ2U9dGhpcy5pbWFnZXNbMTVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgIFxuICAgICAgICAgIGRlZmF1bHQ6ICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXSwibmFtZXMiOlsiVGlsZSIsIkxldmVsIiwiY3JlYXRlTGF5b3V0IiwiaSIsInJvd3MiLCJyb3ciLCJqIiwiY29scyIsImNvZGUiLCJyYXdMYXlvdXQiLCJpbWFnZSIsImltYWdlcyIsInRpbGUiLCJwIiwicHVzaCIsImxheW91dCIsImRyYXciLCJ4T2Zmc2V0IiwieU9mZnNldCIsImRlYnVnIiwibm9TdHJva2UiLCJmaWxsIiwicmVjdCIsImxldmVsV2lkdGgiLCJsZXZlbEhlaWdodCIsInBvcCIsIngiLCJ0aWxlX3NpemUiLCJ5IiwiY29uc3RydWN0b3IiLCJyYXdsYXlvdXQiLCJoYW5kbGVDb2xsaXNpb25zIiwicGxheWVyIiwicGxheWVyTGVmdCIsIndpZHRoIiwicGxheWVyUmlnaHQiLCJwbGF5ZXJUb3AiLCJoZWlnaHQiLCJwbGF5ZXJCb3R0b20iLCJuZXdQbGF5ZXJMZWZ0IiwidngiLCJuZXdQbGF5ZXJSaWdodCIsIm5ld1BsYXllclRvcCIsInZ5IiwibmV3UGxheWVyQm90dG9tIiwidGlsZUxlZnQiLCJ0aWxlUmlnaHQiLCJ0aWxlVG9wIiwidGlsZUJvdHRvbSIsIm92ZXJsYXBMZWZ0IiwiTWF0aCIsIm1heCIsIm92ZXJsYXBSaWdodCIsIm1pbiIsIm92ZXJsYXBUb3AiLCJvdmVybGFwQm90dG9tIiwib3ZlcmxhcFdpZHRoIiwib3ZlcmxhcEhlaWdodCIsImRpcmVjdGlvbiIsImp1bXBzIiwiaXNBbGl2ZSIsImNlbnRlclgiLCJjZW50ZXJZIiwicmFkaXVzWCIsInJhZGl1c1kiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/classes/Level.tsx\n"));

/***/ })

});