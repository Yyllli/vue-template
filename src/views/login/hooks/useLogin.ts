import { reactive } from 'vue';

const validatePhone = () => {
    return (rule: any, value, callback: Function) => {
        if (!value) {
            callback(new Error('手机号不能为空'));
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
            callback(new Error('手机号格式不正确'));
        } else {
            callback();
        }
    };
};

const validatePassword = () => {
    return (rule: any, value, callback: Function) => {
        if (!value) {
            return callback(new Error('密码不能为空'));
        }

        // 密码长度至少8个字符
        if (value.length < 8) {
            return callback(new Error('密码长度至少为8个字符'));
        }

        // 必须包含至少一个大写字母
        if (!/[A-Z]/.test(value) && !/[a-z]/.test(value)) {
            return callback(new Error('密码必须包含至少一个字母'));
        }

        // 必须包含至少一个数字
        if (!/[0-9]/.test(value)) {
            return callback(new Error('密码必须包含至少一个数字'));
        }

        // 必须包含至少一个特殊字符
        // if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        //     return callback(new Error('密码必须包含至少一个特殊字符'));
        // }

        // 不能包含空格
        if (/\s/.test(value)) {
            return callback(new Error('密码不能包含空格'));
        }

        // 如果所有规则都通过，调用callback()表示校验通过
        callback();
    };
};

export const phoneCodeRules = reactive({
    phone: [{ required: true, validator: validatePhone(), trigger: 'change' }]
});

export const phonePasswordRules = reactive({
    phone: [{ required: true, validator: validatePhone(), trigger: 'change' }],
    password: [{ required: true, validator: validatePassword(), trigger: 'change' }]
});
