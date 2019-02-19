"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var lib_1 = require("../lib");
describe('Init tests', function () {
    it('version test', function () {
        chai_1.expect(lib_1.machineLearningVersion()).to.equal('0.0.1');
    });
});
