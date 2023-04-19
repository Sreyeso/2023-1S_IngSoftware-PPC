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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Level; }\n/* harmony export */ });\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ \"./src/pages/classes/Tile.tsx\");\n\nconst DEBUG = false;\nclass Level {\n    createLayout() {\n        for(let i = 0; i < this.rows; i++){\n            let row = [];\n            for(let j = 0; j < this.cols; j++){\n                // get the code for the current tile\n                let code = this.rawLayout[i * this.cols + j];\n                let image;\n                // use the appropriate image for the tile based on its code\n                switch(code){\n                    case \"gra\":\n                        image = this.images[0];\n                        break;\n                    case \"dir\":\n                        image = this.images[1];\n                        break;\n                    case \"coi\":\n                        image = this.images[2];\n                        break;\n                    case \"gem\":\n                        image = this.images[3];\n                        break;\n                    case \"cll\":\n                        image = this.images[4];\n                        break;\n                    case \"clr\":\n                        image = this.images[5];\n                        break;\n                    case \"flo\":\n                        image = this.images[6];\n                        break;\n                    case \"psm\":\n                        image = this.images[7];\n                        break;\n                    case \"pbd\":\n                        image = this.images[8];\n                        break;\n                    case \"pbu\":\n                        image = this.images[9];\n                        break;\n                    case \"tsm\":\n                        image = this.images[10];\n                        break;\n                    case \"tbd\":\n                        image = this.images[11];\n                        break;\n                    case \"tbu\":\n                        image = this.images[12];\n                        break;\n                    case \"sto\":\n                        image = this.images[13];\n                        break;\n                    case \"spi\":\n                        image = this.images[14];\n                        break;\n                    case \"000\":\n                        image = this.images[15];\n                        break;\n                    default:\n                        image = this.images[16];\n                        break;\n                }\n                // create a new tile with the code and image\n                let tile = new _Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](code, image, this.p);\n                row.push(tile);\n            }\n            // add the row of tiles to the layout\n            this.layout.push(row);\n        }\n    }\n    draw(xOffset, yOffset, debug) {\n        this.p.push();\n        this.p.noStroke();\n        this.p.fill(\"lightskyblue\");\n        // draw the background of the level\n        this.p.rect(xOffset, yOffset, this.levelWidth, this.levelHeight);\n        this.p.pop();\n        // draw each tile in the layout\n        for(let i = 0; i < this.rows; i++){\n            for(let j = 0; j < this.cols; j++){\n                let x = xOffset + j * this.tile_size;\n                let y = yOffset + i * this.tile_size;\n                let tile = this.layout[i][j];\n                tile.draw(x, y, this.tile_size, debug);\n            }\n        }\n    }\n    constructor(rows, cols, rawlayout, tile_size, images, p){\n        this.handleCollisions = (player, xOffset, yOffset)=>{\n            // calculate the player's bounding box\n            let playerLeft = player.x;\n            let playerRight = player.x + player.width;\n            let playerTop = player.y;\n            let playerBottom = player.y + player.height;\n            // add the player's velocity to their position\n            let newPlayerLeft = playerLeft + player.vx;\n            let newPlayerRight = playerRight + player.vx;\n            let newPlayerTop = playerTop + player.vy;\n            let newPlayerBottom = playerBottom + player.vy;\n            let tileLeft;\n            let tileRight;\n            let tileTop;\n            let tileBottom;\n            // loop through the grid array and check for collisions\n            for(let i = 0; i < this.rows; i++){\n                for(let j = 0; j < this.cols; j++){\n                    switch(this.layout[i][j].code){\n                        case \"gra\":\n                        case \"sto\":\n                            // calculate the bounding box of the tile with a buffer \n                            tileLeft = xOffset + j * this.tile_size;\n                            tileRight = xOffset + (j + 1) * this.tile_size;\n                            tileTop = yOffset + i * this.tile_size;\n                            tileBottom = yOffset + (i + 1) * this.tile_size;\n                            // check if the player's bounding box overlaps with the tile's bounding box\n                            if (newPlayerLeft < tileRight && newPlayerRight > tileLeft && newPlayerTop < tileBottom && newPlayerBottom > tileTop) {\n                                let overlapLeft = Math.max(newPlayerLeft, tileLeft);\n                                let overlapRight = Math.min(newPlayerRight, tileRight);\n                                let overlapTop = Math.max(newPlayerTop, tileTop);\n                                let overlapBottom = Math.min(newPlayerBottom, tileBottom);\n                                let overlapWidth = overlapRight - overlapLeft;\n                                let overlapHeight = overlapBottom - overlapTop;\n                                // determine the direction of the collision\n                                let direction;\n                                if (overlapWidth < overlapHeight) {\n                                    direction = overlapLeft < newPlayerLeft ? \"left\" : \"right\";\n                                } else {\n                                    direction = overlapTop < newPlayerTop ? \"up\" : \"down\";\n                                }\n                                // adjust the player's position based on the overlap and direction of the collision\n                                switch(direction){\n                                    case \"left\":\n                                        if (DEBUG) console.log(\"Nya\");\n                                        player.x += overlapWidth - player.vx;\n                                        break;\n                                    case \"right\":\n                                        player.x -= overlapWidth - player.vx;\n                                        break;\n                                    case \"up\":\n                                        if (DEBUG) console.log(\"Bure\");\n                                        player.y += overlapHeight - player.vy;\n                                        break;\n                                    case \"down\":\n                                        player.y -= overlapHeight - player.vy;\n                                        player.jumps = 2;\n                                        player.vy = 0; // reset the player's vertical velocity\n                                        break;\n                                }\n                            }\n                            break;\n                        case \"spi\":\n                            // calculate the bounding box of the tile\n                            tileLeft = xOffset + j * this.tile_size;\n                            tileRight = xOffset + (j + 1) * this.tile_size;\n                            tileTop = yOffset + i * this.tile_size + 0.28 * this.tile_size;\n                            tileBottom = yOffset + (i + 1) * this.tile_size;\n                            // check if the player's bounding box overlaps with the tile's bounding box\n                            if (newPlayerLeft < tileRight && newPlayerRight > tileLeft && newPlayerTop < tileBottom && newPlayerBottom > tileTop) {\n                                // there is a collision!\n                                // reset the player's position to their previous position\n                                let overlapLeft = Math.max(newPlayerLeft, tileLeft);\n                                let overlapRight = Math.min(newPlayerRight, tileRight);\n                                let overlapTop = Math.max(newPlayerTop, tileTop);\n                                let overlapBottom = Math.min(newPlayerBottom, tileBottom);\n                                let overlapWidth = overlapRight - overlapLeft;\n                                let overlapHeight = overlapBottom - overlapTop;\n                                // determine the direction of the collision\n                                let direction;\n                                if (overlapWidth < overlapHeight) {\n                                    direction = overlapLeft < newPlayerLeft ? \"left\" : \"right\";\n                                } else {\n                                    direction = overlapTop < newPlayerTop ? \"up\" : \"down\";\n                                }\n                                // adjust the player's position based on the overlap and direction of the collision\n                                switch(direction){\n                                    case \"left\":\n                                        player.x += overlapWidth - player.vx;\n                                        break;\n                                    case \"right\":\n                                        player.x -= overlapWidth - player.vx;\n                                        break;\n                                    case \"up\":\n                                        player.y += overlapHeight - player.vy;\n                                        break;\n                                    case \"down\":\n                                        player.y -= overlapHeight - player.vy;\n                                        player.vy = 0; // reset the player's vertical velocity\n                                        break;\n                                }\n                                /* Death triggers */ player.isAlive = false;\n                            }\n                            break;\n                        case \"coi\":\n                        case \"gem\":\n                            // calculate the center and radius of the ellipse\n                            let centerX = xOffset + j * this.tile_size + this.tile_size * 0.5;\n                            let centerY = yOffset + i * this.tile_size + this.tile_size * 0.5;\n                            let radiusX = this.tile_size * 0.35;\n                            let radiusY = this.tile_size * 0.35;\n                            // check if the player's bounding box overlaps with the tile's ellipse\n                            if (playerLeft < centerX + radiusX && playerRight > centerX - radiusX && playerTop < centerY + radiusY && playerBottom > centerY - radiusY) {\n                                this.layout[i][j].code = \"000\";\n                                this.layout[i][j].image = this.images[15];\n                            }\n                            break;\n                        default:\n                            break;\n                    }\n                }\n            }\n        };\n        this.rows = rows;\n        this.cols = cols;\n        this.rawLayout = rawlayout;\n        this.tile_size = tile_size;\n        this.layout = [];\n        this.p = p;\n        this.images = images;\n        this.levelWidth = this.cols * this.tile_size;\n        this.levelHeight = this.rows * this.tile_size;\n        // create the layout\n        this.createLayout();\n    }\n}\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUN0QyxTQUFTLEdBQUc7NEJBQy9CLElBQUl1QyxVQUFVLElBQUksQ0FBQ3ZDLFNBQVMsR0FBRzs0QkFFL0Isc0VBQXNFOzRCQUN0RSxJQUFJTSxhQUFhOEIsVUFBVUUsV0FBVy9CLGNBQWM2QixVQUFVRSxXQUFXN0IsWUFBWTRCLFVBQVVFLFdBQVc3QixlQUFlMkIsVUFBVUUsU0FBUztnQ0FDMUksSUFBSSxDQUFDbkQsTUFBTSxDQUFDWixFQUFFLENBQUNHLEVBQUUsQ0FBQ0UsSUFBSSxHQUFDO2dDQUN2QixJQUFJLENBQUNPLE1BQU0sQ0FBQ1osRUFBRSxDQUFDRyxFQUFFLENBQUNJLEtBQUssR0FBQyxJQUFJLENBQUNDLE1BQU0sQ0FBQyxHQUFHOzRCQUN6QyxDQUFDOzRCQUNILEtBQU07d0JBRU47NEJBQVUsS0FBTTtvQkFDbEI7Z0JBQ0Y7WUFDRjtRQUNGO1FBbE5FLElBQUksQ0FBQ1AsSUFBSSxHQUFHQTtRQUNaLElBQUksQ0FBQ0csSUFBSSxHQUFHQTtRQUNaLElBQUksQ0FBQ0UsU0FBUyxHQUFHcUI7UUFDakIsSUFBSSxDQUFDSCxTQUFTLEdBQUdBO1FBQ2pCLElBQUksQ0FBQ1osTUFBTSxHQUFHLEVBQUU7UUFDaEIsSUFBSSxDQUFDRixDQUFDLEdBQUdBO1FBQ1QsSUFBSSxDQUFDRixNQUFNLEdBQUdBO1FBQ2QsSUFBSSxDQUFDWSxVQUFVLEdBQUcsSUFBSSxDQUFDaEIsSUFBSSxHQUFHLElBQUksQ0FBQ29CLFNBQVM7UUFDNUMsSUFBSSxDQUFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDcEIsSUFBSSxHQUFHLElBQUksQ0FBQ3VCLFNBQVM7UUFFN0Msb0JBQW9CO1FBQ3BCLElBQUksQ0FBQ3pCLFlBQVk7SUFDbkI7QUF3TUY7QUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvY2xhc3Nlcy9MZXZlbC50c3g/MzM5NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcDUgZnJvbSAncDUnO1xuaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuY29uc3QgREVCVUcgPSBmYWxzZTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsIHtcbiAgcm93czogbnVtYmVyO1xuICBjb2xzOiBudW1iZXI7XG4gIHJhd0xheW91dDogc3RyaW5nW107XG4gIHRpbGVfc2l6ZTogbnVtYmVyO1xuICBsYXlvdXQ6IFRpbGVbXVtdO1xuICBwOiBwNTtcbiAgaW1hZ2VzOiBhbnlbXTtcbiAgbGV2ZWxXaWR0aDogbnVtYmVyO1xuICBsZXZlbEhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHJvd3M6IG51bWJlciwgY29sczogbnVtYmVyLCByYXdsYXlvdXQ6IHN0cmluZ1tdLCB0aWxlX3NpemU6IG51bWJlciwgaW1hZ2VzOiBhbnlbXSwgcDogcDUpIHtcbiAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgIHRoaXMuY29scyA9IGNvbHM7XG4gICAgdGhpcy5yYXdMYXlvdXQgPSByYXdsYXlvdXQ7IFxuICAgIHRoaXMudGlsZV9zaXplID0gdGlsZV9zaXplO1xuICAgIHRoaXMubGF5b3V0ID0gW107IFxuICAgIHRoaXMucCA9IHA7XG4gICAgdGhpcy5pbWFnZXMgPSBpbWFnZXM7XG4gICAgdGhpcy5sZXZlbFdpZHRoID0gdGhpcy5jb2xzICogdGhpcy50aWxlX3NpemU7XG4gICAgdGhpcy5sZXZlbEhlaWdodCA9IHRoaXMucm93cyAqIHRoaXMudGlsZV9zaXplO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBsYXlvdXRcbiAgICB0aGlzLmNyZWF0ZUxheW91dCgpO1xuICB9XG5cbiAgY3JlYXRlTGF5b3V0KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGxldCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2xzOyBqKyspIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBjb2RlIGZvciB0aGUgY3VycmVudCB0aWxlXG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5yYXdMYXlvdXRbaSAqIHRoaXMuY29scyArIGpdO1xuICAgICAgICBsZXQgaW1hZ2U7XG5cbiAgICAgICAgLy8gdXNlIHRoZSBhcHByb3ByaWF0ZSBpbWFnZSBmb3IgdGhlIHRpbGUgYmFzZWQgb24gaXRzIGNvZGVcbiAgICAgICAgc3dpdGNoKGNvZGUpe1xuICAgICAgICAgIGNhc2UoXCJncmFcIik6IGltYWdlPXRoaXMuaW1hZ2VzWzBdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwiZGlyXCIpOiBpbWFnZT10aGlzLmltYWdlc1sxXTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcImNvaVwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbMl07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJnZW1cIik6IGltYWdlPXRoaXMuaW1hZ2VzWzNdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwiY2xsXCIpOiBpbWFnZT10aGlzLmltYWdlc1s0XTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcImNsclwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbNV07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJmbG9cIik6IGltYWdlPXRoaXMuaW1hZ2VzWzZdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwicHNtXCIpOiBpbWFnZT10aGlzLmltYWdlc1s3XTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcInBiZFwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbOF07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJwYnVcIik6IGltYWdlPXRoaXMuaW1hZ2VzWzldOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwidHNtXCIpOiBpbWFnZT10aGlzLmltYWdlc1sxMF07IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJ0YmRcIik6IGltYWdlPXRoaXMuaW1hZ2VzWzExXTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcInRidVwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbMTJdOyBicmVhaztcbiAgICAgICAgICBjYXNlKFwic3RvXCIpOiBpbWFnZT10aGlzLmltYWdlc1sxM107IGJyZWFrO1xuICAgICAgICAgIGNhc2UoXCJzcGlcIik6IGltYWdlPXRoaXMuaW1hZ2VzWzE0XTsgYnJlYWs7XG4gICAgICAgICAgY2FzZShcIjAwMFwiKTogaW1hZ2U9dGhpcy5pbWFnZXNbMTVdOyBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBpbWFnZT10aGlzLmltYWdlc1sxNl07IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgdGlsZSB3aXRoIHRoZSBjb2RlIGFuZCBpbWFnZVxuICAgICAgICBsZXQgdGlsZSA9IG5ldyBUaWxlKGNvZGUsIGltYWdlLCB0aGlzLnApO1xuICAgICAgICByb3cucHVzaCh0aWxlKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkZCB0aGUgcm93IG9mIHRpbGVzIHRvIHRoZSBsYXlvdXRcbiAgICAgIHRoaXMubGF5b3V0LnB1c2gocm93KTtcbiAgICB9XG4gIH1cblxuICBkcmF3KHhPZmZzZXQ6IG51bWJlciwgeU9mZnNldDogbnVtYmVyLGRlYnVnOmJvb2xlYW4pIHtcbiAgICB0aGlzLnAucHVzaCgpO1xuICAgICAgdGhpcy5wLm5vU3Ryb2tlKCk7XG4gICAgICB0aGlzLnAuZmlsbChcImxpZ2h0c2t5Ymx1ZVwiKTtcbiAgICAvLyBkcmF3IHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBsZXZlbFxuICAgICAgdGhpcy5wLnJlY3QoeE9mZnNldCwgeU9mZnNldCwgdGhpcy5sZXZlbFdpZHRoLCB0aGlzLmxldmVsSGVpZ2h0KTtcbiAgICB0aGlzLnAucG9wKCk7XG4gICAgLy8gZHJhdyBlYWNoIHRpbGUgaW4gdGhlIGxheW91dFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2xzOyBqKyspIHtcbiAgICAgICAgbGV0IHggPSB4T2Zmc2V0ICsgKGogKiB0aGlzLnRpbGVfc2l6ZSk7XG4gICAgICAgIGxldCB5ID0geU9mZnNldCArIChpICogdGhpcy50aWxlX3NpemUpO1xuICAgICAgICBsZXQgdGlsZSA9IHRoaXMubGF5b3V0W2ldW2pdO1xuICAgICAgICB0aWxlLmRyYXcoeCwgeSwgdGhpcy50aWxlX3NpemUsZGVidWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbGxpc2lvbnM9IChwbGF5ZXI6UGxheWVyLHhPZmZzZXQ6bnVtYmVyLHlPZmZzZXQ6bnVtYmVyKSA9PiB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBwbGF5ZXIncyBib3VuZGluZyBib3hcbiAgICBsZXQgcGxheWVyTGVmdCA9IHBsYXllci54O1xuICAgIGxldCBwbGF5ZXJSaWdodCA9IHBsYXllci54ICsgcGxheWVyLndpZHRoO1xuICAgIGxldCBwbGF5ZXJUb3AgPSBwbGF5ZXIueTtcbiAgICBsZXQgcGxheWVyQm90dG9tID0gcGxheWVyLnkgKyBwbGF5ZXIuaGVpZ2h0O1xuXG4gICAgLy8gYWRkIHRoZSBwbGF5ZXIncyB2ZWxvY2l0eSB0byB0aGVpciBwb3NpdGlvblxuICAgIGxldCBuZXdQbGF5ZXJMZWZ0ID0gcGxheWVyTGVmdCArIHBsYXllci52eDtcbiAgICBsZXQgbmV3UGxheWVyUmlnaHQgPSBwbGF5ZXJSaWdodCArIHBsYXllci52eDtcbiAgICBsZXQgbmV3UGxheWVyVG9wID0gcGxheWVyVG9wICsgcGxheWVyLnZ5O1xuICAgIGxldCBuZXdQbGF5ZXJCb3R0b20gPSBwbGF5ZXJCb3R0b20gKyBwbGF5ZXIudnk7XG5cbiAgICBsZXQgdGlsZUxlZnQgO1xuICAgIGxldCB0aWxlUmlnaHQ7XG4gICAgbGV0IHRpbGVUb3A7XG4gICAgbGV0IHRpbGVCb3R0b207XG4gICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBncmlkIGFycmF5IGFuZCBjaGVjayBmb3IgY29sbGlzaW9uc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jb2xzOyBqKyspIHtcblxuICAgICAgICBzd2l0Y2godGhpcy5sYXlvdXRbaV1bal0uY29kZSl7XG5cbiAgICAgICAgICBjYXNlKFwiZ3JhXCIpOiBcbiAgICAgICAgICBjYXNlKFwic3RvXCIpOlxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIHRpbGUgd2l0aCBhIGJ1ZmZlciBcbiAgICAgICAgICAgIHRpbGVMZWZ0ID0geE9mZnNldCArIChqICogdGhpcy50aWxlX3NpemUpO1xuICAgICAgICAgICAgdGlsZVJpZ2h0ID0geE9mZnNldCArKChqKzEpICogdGhpcy50aWxlX3NpemUpO1xuICAgICAgICAgICAgdGlsZVRvcCA9IHlPZmZzZXQrIChpICogdGhpcy50aWxlX3NpemUpO1xuICAgICAgICAgICAgdGlsZUJvdHRvbSA9IHlPZmZzZXQrKChpKzEpICogdGhpcy50aWxlX3NpemUpO1xuICAgIFxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHBsYXllcidzIGJvdW5kaW5nIGJveCBvdmVybGFwcyB3aXRoIHRoZSB0aWxlJ3MgYm91bmRpbmcgYm94XG4gICAgICAgICAgICBpZiAobmV3UGxheWVyTGVmdCA8IHRpbGVSaWdodCAmJiBuZXdQbGF5ZXJSaWdodCA+IHRpbGVMZWZ0ICYmIG5ld1BsYXllclRvcCA8IHRpbGVCb3R0b20gJiYgbmV3UGxheWVyQm90dG9tID4gdGlsZVRvcCkge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGxldCBvdmVybGFwTGVmdCA9IE1hdGgubWF4KG5ld1BsYXllckxlZnQsIHRpbGVMZWZ0KTtcbiAgICAgICAgICAgICAgICAgIGxldCBvdmVybGFwUmlnaHQgPSBNYXRoLm1pbihuZXdQbGF5ZXJSaWdodCwgdGlsZVJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgIGxldCBvdmVybGFwVG9wID0gTWF0aC5tYXgobmV3UGxheWVyVG9wLCB0aWxlVG9wKTtcbiAgICAgICAgICAgICAgICAgIGxldCBvdmVybGFwQm90dG9tID0gTWF0aC5taW4obmV3UGxheWVyQm90dG9tLCB0aWxlQm90dG9tKTtcbiAgICAgICAgICAgICAgICAgIGxldCBvdmVybGFwV2lkdGggPSBvdmVybGFwUmlnaHQgLSBvdmVybGFwTGVmdDtcbiAgICAgICAgICAgICAgICAgIGxldCBvdmVybGFwSGVpZ2h0ID0gb3ZlcmxhcEJvdHRvbSAtIG92ZXJsYXBUb3A7XG5cbiAgICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGlmIChvdmVybGFwV2lkdGggPCBvdmVybGFwSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IG92ZXJsYXBMZWZ0IDwgbmV3UGxheWVyTGVmdCA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gb3ZlcmxhcFRvcCA8IG5ld1BsYXllclRvcCA/IFwidXBcIiA6IFwiZG93blwiO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRqdXN0IHRoZSBwbGF5ZXIncyBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgb3ZlcmxhcCBhbmQgZGlyZWN0aW9uIG9mIHRoZSBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFQlVHKSBjb25zb2xlLmxvZygnTnlhJyk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci54ICs9IG92ZXJsYXBXaWR0aCAtIHBsYXllci52eDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnggLT0gb3ZlcmxhcFdpZHRoIC0gcGxheWVyLnZ4O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoREVCVUcpIGNvbnNvbGUubG9nKCdCdXJlJyk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci55ICs9IG92ZXJsYXBIZWlnaHQgLSBwbGF5ZXIudnk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnkgLT0gb3ZlcmxhcEhlaWdodCAtIHBsYXllci52eTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmp1bXBzPTI7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci52eSA9IDA7IC8vIHJlc2V0IHRoZSBwbGF5ZXIncyB2ZXJ0aWNhbCB2ZWxvY2l0eVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlKFwic3BpXCIpOlxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIHRpbGVcbiAgICAgICAgICAgIHRpbGVMZWZ0ID0geE9mZnNldCArIChqICogdGhpcy50aWxlX3NpemUpO1xuICAgICAgICAgICAgdGlsZVJpZ2h0ID0gIHhPZmZzZXQgKygoaisxKSAqIHRoaXMudGlsZV9zaXplKTtcbiAgICAgICAgICAgIHRpbGVUb3AgPSB5T2Zmc2V0KyAoaSAqIHRoaXMudGlsZV9zaXplKSsoMC4yOCp0aGlzLnRpbGVfc2l6ZSk7XG4gICAgICAgICAgICB0aWxlQm90dG9tID0geU9mZnNldCsoKGkrMSkgKiB0aGlzLnRpbGVfc2l6ZSk7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBwbGF5ZXIncyBib3VuZGluZyBib3ggb3ZlcmxhcHMgd2l0aCB0aGUgdGlsZSdzIGJvdW5kaW5nIGJveFxuICAgICAgICAgICAgaWYgKG5ld1BsYXllckxlZnQgPCB0aWxlUmlnaHQgJiYgbmV3UGxheWVyUmlnaHQgPiB0aWxlTGVmdCAmJiBuZXdQbGF5ZXJUb3AgPCB0aWxlQm90dG9tICYmIG5ld1BsYXllckJvdHRvbSA+IHRpbGVUb3ApIHtcbiAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYSBjb2xsaXNpb24hXG4gICAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBwbGF5ZXIncyBwb3NpdGlvbiB0byB0aGVpciBwcmV2aW91cyBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGxldCBvdmVybGFwTGVmdCA9IE1hdGgubWF4KG5ld1BsYXllckxlZnQsIHRpbGVMZWZ0KTtcbiAgICAgICAgICAgICAgICBsZXQgb3ZlcmxhcFJpZ2h0ID0gTWF0aC5taW4obmV3UGxheWVyUmlnaHQsIHRpbGVSaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBUb3AgPSBNYXRoLm1heChuZXdQbGF5ZXJUb3AsIHRpbGVUb3ApO1xuICAgICAgICAgICAgICAgIGxldCBvdmVybGFwQm90dG9tID0gTWF0aC5taW4obmV3UGxheWVyQm90dG9tLCB0aWxlQm90dG9tKTtcbiAgICAgICAgICAgICAgICBsZXQgb3ZlcmxhcFdpZHRoID0gb3ZlcmxhcFJpZ2h0IC0gb3ZlcmxhcExlZnQ7XG4gICAgICAgICAgICAgICAgbGV0IG92ZXJsYXBIZWlnaHQgPSBvdmVybGFwQm90dG9tIC0gb3ZlcmxhcFRvcDtcbiAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChvdmVybGFwV2lkdGggPCBvdmVybGFwSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBvdmVybGFwTGVmdCA8IG5ld1BsYXllckxlZnQgPyBcImxlZnRcIiA6IFwicmlnaHRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gb3ZlcmxhcFRvcCA8IG5ld1BsYXllclRvcCA/IFwidXBcIiA6IFwiZG93blwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkanVzdCB0aGUgcGxheWVyJ3MgcG9zaXRpb24gYmFzZWQgb24gdGhlIG92ZXJsYXAgYW5kIGRpcmVjdGlvbiBvZiB0aGUgY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci54ICs9IG92ZXJsYXBXaWR0aCAtIHBsYXllci52eDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnggLT0gb3ZlcmxhcFdpZHRoIC0gcGxheWVyLnZ4O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIueSArPSBvdmVybGFwSGVpZ2h0IC0gcGxheWVyLnZ5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci55IC09IG92ZXJsYXBIZWlnaHQgLSBwbGF5ZXIudnk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci52eSA9IDA7IC8vIHJlc2V0IHRoZSBwbGF5ZXIncyB2ZXJ0aWNhbCB2ZWxvY2l0eVxuICBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvKiBEZWF0aCB0cmlnZ2VycyAqL1xuICAgICAgICAgICAgICBwbGF5ZXIuaXNBbGl2ZT1mYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICBcbiAgICAgICAgICBjYXNlKFwiY29pXCIpOlxuICAgICAgICAgIGNhc2UoXCJnZW1cIik6XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGNlbnRlciBhbmQgcmFkaXVzIG9mIHRoZSBlbGxpcHNlXG4gICAgICAgICAgICBsZXQgY2VudGVyWCA9IHhPZmZzZXQgKyAoaiAqIHRoaXMudGlsZV9zaXplKSArICh0aGlzLnRpbGVfc2l6ZSAqIDAuNSk7XG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHlPZmZzZXQrIChpICogdGhpcy50aWxlX3NpemUpICsgKHRoaXMudGlsZV9zaXplICogMC41KTtcbiAgICAgICAgICAgIGxldCByYWRpdXNYID0gdGhpcy50aWxlX3NpemUgKiAwLjM1O1xuICAgICAgICAgICAgbGV0IHJhZGl1c1kgPSB0aGlzLnRpbGVfc2l6ZSAqIDAuMzU7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBwbGF5ZXIncyBib3VuZGluZyBib3ggb3ZlcmxhcHMgd2l0aCB0aGUgdGlsZSdzIGVsbGlwc2VcbiAgICAgICAgICAgIGlmIChwbGF5ZXJMZWZ0IDwgY2VudGVyWCArIHJhZGl1c1ggJiYgcGxheWVyUmlnaHQgPiBjZW50ZXJYIC0gcmFkaXVzWCAmJiBwbGF5ZXJUb3AgPCBjZW50ZXJZICsgcmFkaXVzWSAmJiBwbGF5ZXJCb3R0b20gPiBjZW50ZXJZIC0gcmFkaXVzWSkge1xuICAgICAgICAgICAgICB0aGlzLmxheW91dFtpXVtqXS5jb2RlPVwiMDAwXCI7XG4gICAgICAgICAgICAgIHRoaXMubGF5b3V0W2ldW2pdLmltYWdlPXRoaXMuaW1hZ2VzWzE1XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICBcbiAgICAgICAgICBkZWZhdWx0OiAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl0sIm5hbWVzIjpbIlRpbGUiLCJERUJVRyIsIkxldmVsIiwiY3JlYXRlTGF5b3V0IiwiaSIsInJvd3MiLCJyb3ciLCJqIiwiY29scyIsImNvZGUiLCJyYXdMYXlvdXQiLCJpbWFnZSIsImltYWdlcyIsInRpbGUiLCJwIiwicHVzaCIsImxheW91dCIsImRyYXciLCJ4T2Zmc2V0IiwieU9mZnNldCIsImRlYnVnIiwibm9TdHJva2UiLCJmaWxsIiwicmVjdCIsImxldmVsV2lkdGgiLCJsZXZlbEhlaWdodCIsInBvcCIsIngiLCJ0aWxlX3NpemUiLCJ5IiwiY29uc3RydWN0b3IiLCJyYXdsYXlvdXQiLCJoYW5kbGVDb2xsaXNpb25zIiwicGxheWVyIiwicGxheWVyTGVmdCIsInBsYXllclJpZ2h0Iiwid2lkdGgiLCJwbGF5ZXJUb3AiLCJwbGF5ZXJCb3R0b20iLCJoZWlnaHQiLCJuZXdQbGF5ZXJMZWZ0IiwidngiLCJuZXdQbGF5ZXJSaWdodCIsIm5ld1BsYXllclRvcCIsInZ5IiwibmV3UGxheWVyQm90dG9tIiwidGlsZUxlZnQiLCJ0aWxlUmlnaHQiLCJ0aWxlVG9wIiwidGlsZUJvdHRvbSIsIm92ZXJsYXBMZWZ0IiwiTWF0aCIsIm1heCIsIm92ZXJsYXBSaWdodCIsIm1pbiIsIm92ZXJsYXBUb3AiLCJvdmVybGFwQm90dG9tIiwib3ZlcmxhcFdpZHRoIiwib3ZlcmxhcEhlaWdodCIsImRpcmVjdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJqdW1wcyIsImlzQWxpdmUiLCJjZW50ZXJYIiwiY2VudGVyWSIsInJhZGl1c1giLCJyYWRpdXNZIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/classes/Level.tsx\n"));

/***/ })

});