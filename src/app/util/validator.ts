import validate from "validate.js";


const validator = (constraints) => (field, value) => {
    let object = {};
    object[field] = value;

    let constraint = {};
    constraint[field] = constraints[field]

    let result = validate({}, constraint, { fullMessages: false });
    if (value !== '' && value !== null) 
        result = validate(object, constraint, { fullMessages: false });
    
    if (result) 
        return result[field][0]

    return null
}

export default validator;
