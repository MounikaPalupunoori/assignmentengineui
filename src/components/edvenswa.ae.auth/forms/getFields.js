import { authFields } from "./authFields";

export const getFormFields = (keys = []) => {
    let fields = [];    
    keys.forEach((key) => {
        const field = authFields[key];
        // avoid adding duplicate fields.
        if(!fields.includes(field)) {
            fields.push(field);
        }        
    });
    return fields;
}