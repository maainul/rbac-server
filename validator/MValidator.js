
import findOne from './../utils/findOne.js';


const MValidator = async (req, validationRules, model) => {
    const data = req
    const errors = [];
    for (const field in validationRules) {
        const value = data[field]
        const rules = validationRules[field]

        // Check if the field is required
        if (rules.required && (value === undefined || value === null || value === "")) {
            errors.push({ field, error: `${field} is required` })
        } else if (value !== undefined && value !== null) {

            // Check if the type of the field matches the specified type in the rules
            if (rules.type && typeof value !== rules.type) {
                errors.push({ field, error: `${field} must be of type ${rules.type}` })
            }

            // /Check if the field has min value
            if (rules.min && value.length < rules.min) {
                errors.push({ field, error: `${field} must be at least ${rules.min} characters` });
            }

            // Check if the field has max value
            if (rules.max && value.length > rules.max) {
                errors.push({ field, error: `${field} must be at most ${rules.max} characters` });
            }


            // Check if it is email and email logic
            if (rules.isEmail && !isValidEmail(data[field])) {
                errors.push({ field, error: `${field} must be a valid email address.` });
            }


            // Check if it is email and email logic
            if (rules.isPassword && !isValidPassword(data[field])) {
                errors.push({
                    field,
                    error: `${field} must be a valid password (custom password validation).`,
                });
            }


            // Check existstance using findOne
            const existsRule = rules.exists
            const len = existsRule && existsRule.length;
            if (len > 0 && existsRule[0]) {
                const val = await findOne(model, field, value)
                if (val.exists) {
                    errors.push({ field, error: val.message || `${field} already exists` })
                }
            }
        }
    }

    // Return the result object
    return {
        isValid: errors.length === 0,
        errors: errors,
    };
}


function isValidEmail(email) {
    // Your email validation logic here
    return true;
}
function isValidPassword(password) {
    // Your password validation logic here
    return true;
}

export default MValidator;