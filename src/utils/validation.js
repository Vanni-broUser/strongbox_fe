import i18n from '@/plugins/i18n';


const requiredRules = [
    (value) => {
        if (value) return true;
        return i18n.global.t('validation.error1');
    },
];


const emailRules = requiredRules.concat([
    (value) => {
        if (/.+@.+\..+/.test(value)) return true;
        return i18n.global.t('validation.error2');
    }
]);


const validateInput = (value, rules) => {
    const errors = [];
    for (const rule of rules) {
        const result = rule(value);
        if (result !== true) errors.push(result);
    }
    return errors.length === 0 ? null : errors;
}


export default {
  emailRules,
  requiredRules,
  validateInput
};
