"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diagnoses_1 = __importDefault(require("../data/diagnoses"));
var diagnoses = diagnoses_1.default;
var getAllDiagnoses = function () {
    return diagnoses;
};
var addEntry = function () {
    return null;
};
exports.default = {
    getAllDiagnoses: getAllDiagnoses,
    addEntry: addEntry,
};
