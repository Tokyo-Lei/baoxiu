//Demo
layui.use(['layer', 'jquery', 'element', 'form'], function() {
    var layer = layui.layer,
        $ = layui.$,
        form = layui.form,
        element = layui.element;
    var requestUrl = "http://localhost/dbs-big/bin/";

    //切换标题
    element.on('tab(loginTab)', function() {
        if (this.getAttribute('lay-id') == "student") {
            $(".login-title").eq(0).html("学生登录端");
            console.log("学生端");
        } else if (this.getAttribute('lay-id') == "manager") {
            $(".login-title").eq(0).html("管理员端");
            console.log("管理员端");
        }

    });
    //学生检验表单数据，检验通过就进入回调函数
    form.on('submit(slogin)', function(formData) {
        $.ajax({
                type: 'GET',
                url: requestUrl + "slogin.php",
                data: { 'sid': formData.field.sid, 'scod': formData.field.scod },
                dataType: "json",
                success: function(data) {
                    if (data.info == "登录成功") {
                        layer.msg(data.info, { icon: 6 });
                        sessionStorage.setItem('sid', formData.field.sid);
                        // sessionStorage.setItem(scod, data.field.scod);
                        setTimeout(() => {
                            window.location.href = "main.html";
                        }, 1200);

                    } else {
                        layer.msg(data.info, { icon: 5 });
                    }
                },
                error: function(error) {
                    console.log(error);
                    layer.msg(error.info);
                }
            }) //ajax结束
        return false;
    });
    //管理员检验表单数据，检验通过就进入回调函数
    form.on('submit(mlogin)', function(formData) {
        $.ajax({
                type: 'GET',
                url: requestUrl + "mlogin.php",
                data: { 'mid': formData.field.mid, 'mcod': formData.field.mcod },
                dataType: "json",
                success: function(data) {
                    if (data.info == "登录成功") {
                        layer.msg(data.info, { icon: 6 });
                        sessionStorage.setItem('mid', formData.field.mid);
                        // sessionStorage.setItem(scod, data.field.scod);
                        setTimeout(() => {
                            window.location.href = "manager.html";
                        }, 1200);

                    } else {
                        layer.msg(data.info, { icon: 5 });
                    }
                },
                error: function(error) {
                    console.log(error);
                    layer.msg(error.info);
                }
            }) //ajax结束
        return false;
    });
});