layui.use(['layer', 'jquery', 'element', 'form'], function() {
    var layer = layui.layer,
        $ = layui.$,
        form = layui.form,
        element = layui.element;
    var requestUrl = "http://localhost/dbs-big/bin/",
    tableName;
    //验证是否登录
    $("#show-user").text(sessionStorage.getItem("sid"));
    if (!sessionStorage.getItem("sid") && !sessionStorage.getItem("mid")) {
        window.location.href = "login.html";
    }
    //reajax请求数据
        var reAjax = function() {
            $.ajax({
                type: 'GET',
                url: requestUrl + "checkStu.php",
                data: { 'tableName': tableName,'sid':sessionStorage.getItem("sid")},
                dataType: "json",
                success: function(data) {
                    var $tableShow = $("#" + tableName),
                        html;
                    $tableShow.html('');
                    console.log(data);
                    // 遍历得到的data，然后动态添加表格节点
                    $.each(data, function(index, value) {
                        html = '';
                        $.each(value, function(num, val) {
                                html += "<td class='" + num + "'>" + val + "</td>";
                            })
                            //添加按钮
                        if (tableName == "repair" || tableName == "supplement"||tableName == "logs") {
                            $tableShow.html($tableShow.html() + "<tr>" + html);
                        } else if (tableName == "logs" || tableName == "bueq" || tableName == "stock") {
                            $tableShow.html($tableShow.html() + "<tr>" + html);
                        }
                    });
                },
                error: function(error) {
                    console.log(error);
                },
            }); //ajax结束
        };

    element.on('tab(managerTab)', function() {
        if (this.getAttribute('lay-id') == "repair") {
            tableName = "repair";
            reAjax();

        } else if (this.getAttribute('lay-id') == "supplement") {
            tableName = "supplement";
            reAjax();

        } else if (this.getAttribute('lay-id') == "logs") {
            tableName = "logs";
            reAjax();
        }
    });
    // 检验补充表单数据，检验通过就进入回调函数
    form.on('submit(supplement)', function(formData) {
        console.log(formData);
        $.ajax({
            type: 'GET',
            url: requestUrl + "add.php",
            data: {
                'tableName': 'supplement',
                'sid': sessionStorage.getItem("sid"),
                'bname': formData.field.bname,
                'floor': formData.field.floor,
                'room': formData.field.room,
                'teachaid': formData.field.teachaid,
                'qty': formData.field.qty
            },
            dataType: "json",
            success: function(data) {
                layer.msg(data.info, { icon: 6 });
            },
            error: function(error) {
                console.log(error);
                layer.msg(error.info);
            }
        }); //ajax结束
        return false;
    });
    //检验报修表单信息，通过进入回调函数
    form.on('submit(repair)', function(formData) {
        console.log(formData.field);
        $.ajax({
                type: 'GET',
                url: requestUrl + "add.php",
                data: {
                    'tableName': 'repair',
                    'sid': sessionStorage.getItem("sid"),
                    'bname': formData.field.bname,
                    'floor': formData.field.floor,
                    'room': formData.field.room,
                    'equip': formData.field.equip,
                    'detail': formData.field.detail
                },
                dataType: "json",
                success: function(data) {
                    layer.msg(data.info, { icon: 6 });
                },
                error: function(error) {
                    console.log(error);
                    layer.msg(error.info);
                }
            }) //ajax结束
        return false;
    });
});