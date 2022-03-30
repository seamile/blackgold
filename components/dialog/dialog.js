var e = require("../../utils/login"), o = require("../../configApi");

Component({
    properties: {
        showDialog: {
            type: Boolean,
            value: !1
        },
        closeInfo: {
            type: String,
            value: ""
        }
    },
    externalClasses: [ "dialog-wrap", "close-dialog" ],
    data: {},
    methods: {
        formSubmit: function(t) {
            var a = t.detail.formId;
            this.setData({
                showDialog: !1
            }), (0, e.flLoginRequest)({
                url: o.saveFormId,
                data: {
                    form_id: a,
                    pos: ""
                }
            }).then(function(e) {});
        }
    }
});