var t = {
    alipay: /^(([a-zA-Z0-9])+([a-zA-Z0-9_\.\-])*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4}))|(0{0,1}1[3456789]{1}[0-9]{9})$/gi,
    bankaccount: /^([a-zA-Z0-9]|-)+$/gi,
    blank: /^\s*$/,
    cellphone: /^0{0,1}1[3456789]{1}[0-9]{9}$/gi,
    email: /^([a-zA-Z0-9])+([a-zA-Z0-9_\.\-])*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/gi,
    icard: /^(\d{18}|\d{15}|\d{17}x)$/gi,
    ihkcard: /^[a-z0-9]{1}\d{6,7}[a-z0-9]{1}$/gi,
    itwcard: /^[a-z]{1}\d{8,}$/gi,
    uname: /^[\u4e00-\u9fa5a-zA-Z\s]+$/gi,
    url: /^(?:(http(s)?\:)?\/\/)?[A-Za-z0-9-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/gi,
    vercode: /^\d{6}$/
};

module.exports = {
    isBlank: function(a) {
        return t.blank.lastIndex = 0, t.blank.test(a);
    },
    isNumber: function(t) {
        return "[object Number]" === Object.prototype.toString.call(t);
    },
    isVercode: function(a) {
        return t.vercode.lastIndex = 0, t.vercode.test(a);
    },
    isEmail: function(a) {
        return t.email.lastIndex = 0, t.email.test(a);
    },
    isName: function(a) {
        return t.uname.lastIndex = 0, t.uname.test(a);
    },
    isUrl: function(a) {
        return t.url.lastIndex = 0, t.url.test(a);
    },
    isPhone: function(a) {
        return t.cellphone.lastIndex = 0, t.cellphone.test(a);
    },
    isIcard: function(a) {
        return t.icard.lastIndex = 0, t.icard.test(a);
    },
    isAlipay: function(a) {
        return t.alipay.lastIndex = 0, t.alipay.test(a);
    },
    isBankaccount: function(a) {
        return t.bankaccount.lastIndex = 0, t.bankaccount.test(a);
    }
};