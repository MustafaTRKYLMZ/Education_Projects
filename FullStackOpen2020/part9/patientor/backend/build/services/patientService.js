"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var patients_1 = __importDefault(require("../data/patients"));
var patients = patients_1.default;
var getEntries = function () {
    return patients;
};
var getNonSensitivePatientes = function () {
    return patients.map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation,
        });
    });
};
var addEntry = function () {
    return null;
};
exports.default = {
    getNonSensitivePatientes: getNonSensitivePatientes,
    addEntry: addEntry,
    getEntries: getEntries,
};
