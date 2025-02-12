import { consoleFileds } from "./Fields";

export const getConsoleFields = (keys = []) => {
    let fields = [];    
    keys.forEach((key) => {
        const field = consoleFileds[key];
        // avoid adding duplicate fields.
        if(!fields.includes(field)) {
            fields.push(field);
        }        
    });
    return fields;
}