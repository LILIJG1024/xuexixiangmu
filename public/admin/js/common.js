    function serializeToJson(form) {
        var result = {};
        //serializeArray()获取到表单的输入内容 [{name:"email",value:""}]
        var f = form.serializeArray();
        f.forEach(function(item) {
            result[item.name] = item.value;
        });
        return result;
    }