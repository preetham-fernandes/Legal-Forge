"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/client/page",{

/***/ "(app-pages-browser)/./src/components/ui/create_contract.jsx":
/*!***********************************************!*\
  !*** ./src/components/ui/create_contract.jsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CreateContract; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./src/components/ui/button.jsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./src/components/ui/input.jsx\");\n/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jspdf */ \"(app-pages-browser)/./node_modules/jspdf/dist/jspdf.es.min.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction CreateContract() {\n    _s();\n    const [details, setDetails] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [generatedContract, setGeneratedContract] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const handleDetailsChange = (event)=>{\n        setDetails(event.target.value);\n    };\n    const handleCreateContract = async ()=>{\n        if (!details) {\n            alert(\"Please provide contract details.\");\n            return;\n        }\n        setLoading(true);\n        try {\n            // Send the details to the backend to generate the contract\n            const response = await fetch(\"http://localhost:5000/create_contract\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    details\n                })\n            });\n            if (!response.ok) {\n                throw new Error(\"Failed to generate contract\");\n            }\n            const data = await response.json();\n            // Check if contract data exists in the response\n            if (!data.contract) {\n                throw new Error(\"No contract data received\");\n            }\n            const cleanContract = data.contract.replace(/\\*/g, \"\"); // Remove asterisks from the contract if necessary\n            setGeneratedContract(cleanContract); // Set the cleaned generated contract in state\n            // Generate and download the PDF\n            const doc = new jspdf__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n            const lines = doc.splitTextToSize(cleanContract, 190); // Adjust width accordingly\n            doc.text(lines, 10, 10);\n            doc.save(\"contract.pdf\");\n        } catch (error) {\n            alert(error.message); // Handle errors gracefully\n        } finally{\n            setLoading(false); // Stop loading\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"space-y-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"text-2xl font-bold\",\n                children: \"Create Contract\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        htmlFor: \"details\",\n                        className: \"block font-medium\",\n                        children: \"Contract Details\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                        type: \"text\",\n                        id: \"details\",\n                        value: details,\n                        onChange: handleDetailsChange,\n                        placeholder: \"Enter contract details here\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                        lineNumber: 67,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                onClick: handleCreateContract,\n                disabled: loading,\n                children: loading ? \"Generating Contract...\" : \"Create Contract\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, this),\n            generatedContract && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        className: \"font-bold\",\n                        children: \"Generated Contract:\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                        lineNumber: 81,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n                        className: \"whitespace-pre-wrap\",\n                        children: generatedContract\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                        lineNumber: 82,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n                lineNumber: 80,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Mark Lopes\\\\Desktop\\\\Hackathon\\\\Hackathon1\\\\Legal-Forge\\\\frontend\\\\src\\\\components\\\\ui\\\\create_contract.jsx\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, this);\n}\n_s(CreateContract, \"8aUFKqICtCrl+DFjwWCLc/8nsNo=\");\n_c = CreateContract;\nvar _c;\n$RefreshReg$(_c, \"CreateContract\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3VpL2NyZWF0ZV9jb250cmFjdC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRWlDO0FBQ2U7QUFDRjtBQUNwQjtBQUVYLFNBQVNJOztJQUN0QixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR04sK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDTyxTQUFTQyxXQUFXLEdBQUdSLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1MsbUJBQW1CQyxxQkFBcUIsR0FBR1YsK0NBQVFBLENBQUM7SUFFM0QsTUFBTVcsc0JBQXNCLENBQUNDO1FBQzNCTixXQUFXTSxNQUFNQyxNQUFNLENBQUNDLEtBQUs7SUFDL0I7SUFFQSxNQUFNQyx1QkFBdUI7UUFDM0IsSUFBSSxDQUFDVixTQUFTO1lBQ1pXLE1BQU07WUFDTjtRQUNGO1FBRUFSLFdBQVc7UUFFWCxJQUFJO1lBQ0YsMkRBQTJEO1lBQzNELE1BQU1TLFdBQVcsTUFBTUMsTUFBTSx5Q0FBeUM7Z0JBQ3BFQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtnQkFDbEI7Z0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQkFBRWxCO2dCQUFRO1lBQ2pDO1lBRUEsSUFBSSxDQUFDWSxTQUFTTyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUVBLE1BQU1DLE9BQU8sTUFBTVQsU0FBU1UsSUFBSTtZQUVoQyxnREFBZ0Q7WUFDaEQsSUFBSSxDQUFDRCxLQUFLRSxRQUFRLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSUgsTUFBTTtZQUNsQjtZQUVBLE1BQU1JLGdCQUFnQkgsS0FBS0UsUUFBUSxDQUFDRSxPQUFPLENBQUMsT0FBTyxLQUFLLGtEQUFrRDtZQUMxR3BCLHFCQUFxQm1CLGdCQUFnQiw4Q0FBOEM7WUFFbkYsZ0NBQWdDO1lBQ2hDLE1BQU1FLE1BQU0sSUFBSTVCLDZDQUFLQTtZQUNyQixNQUFNNkIsUUFBUUQsSUFBSUUsZUFBZSxDQUFDSixlQUFlLE1BQU0sMkJBQTJCO1lBQ2xGRSxJQUFJRyxJQUFJLENBQUNGLE9BQU8sSUFBSTtZQUNwQkQsSUFBSUksSUFBSSxDQUFDO1FBRVgsRUFBRSxPQUFPQyxPQUFPO1lBQ2RwQixNQUFNb0IsTUFBTUMsT0FBTyxHQUFHLDJCQUEyQjtRQUNuRCxTQUFVO1lBQ1I3QixXQUFXLFFBQVEsZUFBZTtRQUNwQztJQUNGO0lBRUEscUJBQ0UsOERBQUM4QjtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQXFCOzs7Ozs7MEJBQ25DLDhEQUFDRDs7a0NBQ0MsOERBQUNHO3dCQUFNQyxTQUFRO3dCQUFVSCxXQUFVO2tDQUFvQjs7Ozs7O2tDQUN2RCw4REFBQ3JDLHVEQUFLQTt3QkFDSnlDLE1BQUs7d0JBQ0xDLElBQUc7d0JBQ0g5QixPQUFPVDt3QkFDUHdDLFVBQVVsQzt3QkFDVm1DLGFBQVk7Ozs7Ozs7Ozs7OzswQkFHaEIsOERBQUM3Qyx5REFBTUE7Z0JBQUM4QyxTQUFTaEM7Z0JBQXNCaUMsVUFBVXpDOzBCQUM5Q0EsVUFBVSwyQkFBMkI7Ozs7OztZQUd2Q0UsbUNBQ0MsOERBQUM2QjtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNVO3dCQUFHVixXQUFVO2tDQUFZOzs7Ozs7a0NBQzFCLDhEQUFDVzt3QkFBSVgsV0FBVTtrQ0FBdUI5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2hEO0dBL0V3Qkw7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvdWkvY3JlYXRlX2NvbnRyYWN0LmpzeD9jMGY1Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5cclxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2lucHV0XCI7XHJcbmltcG9ydCBqc1BERiBmcm9tIFwianNwZGZcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENyZWF0ZUNvbnRyYWN0KCkge1xyXG4gIGNvbnN0IFtkZXRhaWxzLCBzZXREZXRhaWxzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZ2VuZXJhdGVkQ29udHJhY3QsIHNldEdlbmVyYXRlZENvbnRyYWN0XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZXRhaWxzQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICBzZXREZXRhaWxzKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ3JlYXRlQ29udHJhY3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWRldGFpbHMpIHtcclxuICAgICAgYWxlcnQoXCJQbGVhc2UgcHJvdmlkZSBjb250cmFjdCBkZXRhaWxzLlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gU2VuZCB0aGUgZGV0YWlscyB0byB0aGUgYmFja2VuZCB0byBnZW5lcmF0ZSB0aGUgY29udHJhY3RcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9jcmVhdGVfY29udHJhY3RcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGRldGFpbHMgfSksIC8vIEVuc3VyZSB0aGlzIG1hdGNoZXMgdGhlIGJhY2tlbmQncyBleHBlY3RlZCBpbnB1dFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgY29udHJhY3RcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBjb250cmFjdCBkYXRhIGV4aXN0cyBpbiB0aGUgcmVzcG9uc2VcclxuICAgICAgaWYgKCFkYXRhLmNvbnRyYWN0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29udHJhY3QgZGF0YSByZWNlaXZlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2xlYW5Db250cmFjdCA9IGRhdGEuY29udHJhY3QucmVwbGFjZSgvXFwqL2csIFwiXCIpOyAvLyBSZW1vdmUgYXN0ZXJpc2tzIGZyb20gdGhlIGNvbnRyYWN0IGlmIG5lY2Vzc2FyeVxyXG4gICAgICBzZXRHZW5lcmF0ZWRDb250cmFjdChjbGVhbkNvbnRyYWN0KTsgLy8gU2V0IHRoZSBjbGVhbmVkIGdlbmVyYXRlZCBjb250cmFjdCBpbiBzdGF0ZVxyXG5cclxuICAgICAgLy8gR2VuZXJhdGUgYW5kIGRvd25sb2FkIHRoZSBQREZcclxuICAgICAgY29uc3QgZG9jID0gbmV3IGpzUERGKCk7XHJcbiAgICAgIGNvbnN0IGxpbmVzID0gZG9jLnNwbGl0VGV4dFRvU2l6ZShjbGVhbkNvbnRyYWN0LCAxOTApOyAvLyBBZGp1c3Qgd2lkdGggYWNjb3JkaW5nbHlcclxuICAgICAgZG9jLnRleHQobGluZXMsIDEwLCAxMCk7XHJcbiAgICAgIGRvYy5zYXZlKFwiY29udHJhY3QucGRmXCIpO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpOyAvLyBIYW5kbGUgZXJyb3JzIGdyYWNlZnVsbHlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpOyAvLyBTdG9wIGxvYWRpbmdcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cclxuICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZFwiPkNyZWF0ZSBDb250cmFjdDwvaDI+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJkZXRhaWxzXCIgY2xhc3NOYW1lPVwiYmxvY2sgZm9udC1tZWRpdW1cIj5Db250cmFjdCBEZXRhaWxzPC9sYWJlbD5cclxuICAgICAgICA8SW5wdXQgXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgaWQ9XCJkZXRhaWxzXCIgXHJcbiAgICAgICAgICB2YWx1ZT17ZGV0YWlsc30gXHJcbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRGV0YWlsc0NoYW5nZX0gXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGNvbnRyYWN0IGRldGFpbHMgaGVyZVwiIFxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNyZWF0ZUNvbnRyYWN0fSBkaXNhYmxlZD17bG9hZGluZ30+XHJcbiAgICAgICAge2xvYWRpbmcgPyBcIkdlbmVyYXRpbmcgQ29udHJhY3QuLi5cIiA6IFwiQ3JlYXRlIENvbnRyYWN0XCJ9XHJcbiAgICAgIDwvQnV0dG9uPlxyXG5cclxuICAgICAge2dlbmVyYXRlZENvbnRyYWN0ICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTRcIj5cclxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5HZW5lcmF0ZWQgQ29udHJhY3Q6PC9oMz5cclxuICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwid2hpdGVzcGFjZS1wcmUtd3JhcFwiPntnZW5lcmF0ZWRDb250cmFjdH08L3ByZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiQnV0dG9uIiwiSW5wdXQiLCJqc1BERiIsIkNyZWF0ZUNvbnRyYWN0IiwiZGV0YWlscyIsInNldERldGFpbHMiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImdlbmVyYXRlZENvbnRyYWN0Iiwic2V0R2VuZXJhdGVkQ29udHJhY3QiLCJoYW5kbGVEZXRhaWxzQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZUNyZWF0ZUNvbnRyYWN0IiwiYWxlcnQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiY29udHJhY3QiLCJjbGVhbkNvbnRyYWN0IiwicmVwbGFjZSIsImRvYyIsImxpbmVzIiwic3BsaXRUZXh0VG9TaXplIiwidGV4dCIsInNhdmUiLCJlcnJvciIsIm1lc3NhZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsImxhYmVsIiwiaHRtbEZvciIsInR5cGUiLCJpZCIsIm9uQ2hhbmdlIiwicGxhY2Vob2xkZXIiLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJoMyIsInByZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/ui/create_contract.jsx\n"));

/***/ })

});