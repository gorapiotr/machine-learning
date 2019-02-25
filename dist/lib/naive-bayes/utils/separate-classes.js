"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ml_matrix_1 = __importDefault(require("ml-matrix"));
exports.separateClasses = function (X, y) {
    var features = X.columns;
    var classes = 0;
    var totalPerClasses = new Array(10000); // max upperbound of classes
    for (var i = 0; i < y.length; i++) {
        if (totalPerClasses[y[i]] === undefined) {
            totalPerClasses[y[i]] = 0;
            classes++;
        }
        totalPerClasses[y[i]]++;
    }
    var separatedClasses = new Array(classes);
    var currentIndex = new Array(classes);
    for (i = 0; i < classes; ++i) {
        separatedClasses[i] = new ml_matrix_1.default(totalPerClasses[i], features);
        currentIndex[i] = 0;
    }
    for (i = 0; i < X.rows; ++i) {
        separatedClasses[y[i]].setRow(currentIndex[y[i]], X.getRow(i));
        currentIndex[y[i]]++;
    }
    return separatedClasses;
};
