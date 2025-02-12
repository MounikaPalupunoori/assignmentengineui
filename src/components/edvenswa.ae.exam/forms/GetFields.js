import { examFields } from "./Fields";

 export const getExamFields = (keys = []) => {
    let fields = [];    
    keys.forEach((key) => {
        const field = examFields[key];
        // avoid adding duplicate fields.
        if(!fields.includes(field)) {
            fields.push(field);
        }        
    });
    return fields;
}