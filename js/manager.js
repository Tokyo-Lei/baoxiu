//Demo
layui.use(['layer', 'jquery', 'element', 'form'], function() {
    var layer = layui.layer,
        $ = layui.$,
        form = layui.form,
        element = layui.element;
    var requestUrl = "http://localhost/dbs-big/bin/";
    var tableName = "repair";
    var layoutHtml;
    var tableKey=[];
    $("#show-user").text(sessionStorage.getItem("mid"));
    //验证是否登录
    if (!sessionStorage.getItem("sid") && !sessionStorage.getItem("mid")) {
        window.location.href = "login.html";
    }

    var choseHtml=function(){
            //重置layoutHtml
                layoutHtml="<form class='layui-form' id='formTable'>";
                $.each(tableKey,function(index,value){
                    layoutHtml+="<div class='layui-form-item' style='margin:10px'><label class='layui-form-label'>"+value+"</label><div class='layui-input-block'><input type='text' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input' style='width:200px'></div></div>";
                });
                layoutHtml+="</form>";
        };
    //reajax请求数据
    var reAjax = function() {
            $.ajax({
                type: 'GET',
                url: requestUrl + "check.php",
                data: { 'tableName': tableName },
                dataType: "json",
                success: function(data) {
                    var $tableShow = $("#" + tableName),
                        html;
                    $tableShow.html('');
                    console.log(data);
                    //弹出修改框的属性
                    if (tableName=="stock") {
                    tableKey=[];
                    tableKey=tableKey.concat(['库存量','阈值']);
                    choseHtml();
                    }
                    // 遍历得到的data，然后动态添加表格节点
                    $.each(data, function(index, value) {
                        html = '';
                        $.each(value, function(num, val) {
                                html += "<td class='" + num + "'>" + val + "</td>";
                            })
                            //添加按钮
                        if (tableName == "repair" || tableName == "supplement") {
                            $tableShow.html($tableShow.html() + "<tr>" + html + "<td><i class='layui-icon del'>&#xe631;</i></td>");
                        } else if (tableName == "logs" || tableName == "bueq") {
                            $tableShow.html($tableShow.html() + "<tr>" + html);
                        }else if(tableName=="stock"){
                            $tableShow.html($tableShow.html() + "<tr>" + html + "<td><i class='layui-icon edit'>&#xe6b2;</i></td>");  
                        }
                    });
                },
                error: function(error) {
                    console.log(error);
                },
            }); //ajax结束
        }
        //率先调用一次reajax
    reAjax();
    // addClick();
    //切换tableName
    element.on('tab(managerTab)', function() {
        if (this.getAttribute('lay-id') == "repair") {
            tableName = "repair";
            reAjax();
            addClick();
        } else if (this.getAttribute('lay-id') == "logs") {
            tableName = "logs";
            reAjax();
        } else if (this.getAttribute('lay-id') == "supplement") {
            tableName = "supplement";
            reAjax();
            addClick();
        } else if (this.getAttribute('lay-id') == "bueq") {
            tableName = "bueq";
            reAjax();
        } else if (this.getAttribute('lay-id') == "stock") {
            tableName = "stock";
            reAjax();
        }
    });
    //处理记录
    function addClick(){
        $("#" + tableName).on('click', 'i.del', function() {
        var id = $(this).parents("tr").find("td").eq(0).text();
        console.log(id);
        layer.open({
            type: 1,
            content: "<h1 style='margin:20px'>是否处理订单？</h1>", //这里content是一个普通的String
            btn: ['确定', '取消'],
            area: ['400px', 'auto'],
            yes: function(index) {
                    $.ajax({
                            type: 'GET',
                            url: requestUrl + "del.php",
                            data: { 'tableName': tableName, 'id': id, 'mid': sessionStorage.getItem("mid") },
                            dataType: "json",
                            success: function(data) {
                                console.log(data);
                                layer.msg(data.info, { icon: 6 });
                                reAjax();
                            },
                            error: function(error) {
                                console.log(error);
                                layer.msg(error.info);
                            }
                        }) //ajax结束
                    layer.close(index);

                } //yes
        }); //open
    });} //click function

        // 绑定点击修改事件
        $("#stock").on('click','i.edit',function(){
           var id=$(this).parents("tr").find("td").eq(0).text();
           var that=this;
           console.log(id);
           layer.open({
            type: 1, 
            content: layoutHtml, //这里content是一个普通的String
            btn:['确定','取消'],
            area: ['500px', 'auto'],
            yes:function(index){
                var $formTable=$("#formTable");
                $inputs=$formTable.find("input");
                var teachaid=$(that).parents("tr").find("td").eq(0).text();
                var qoh=$inputs.eq(0).val();
                var threshold=$inputs.eq(1).val();
                var suppliers=$(that).parents("tr").find("td").eq(3).text();
                $.ajax({
                type:'GET',
                url:requestUrl + "edit.php",
                data:{'teachaid':teachaid,'qoh':qoh,'threshold':threshold},
                dataType:"json",
                success:function(data){
                    console.log(data);
                     layer.msg(data.info);
                },
                error:function(error){
                     layer.msg(error.info);
                     console.log(error.info);
                }
               })//ajax结束
                layer.close(index);
                reAjax();
            }//yes
            });
        });

        //绑定查询
        $("#searchTeachId").click(function(){
            var reportVal=$(this).prev().val();
            var $tableShow=$("#searchVal"),html;
            $tableShow.prev().html('<tr><th>学号</th><th>楼名</th><th>教具</th><th>总需求数量</th></tr>')
            $tableShow.html('');
            $.ajax({
                type:'GET',
                url:requestUrl + "search.php",
                data:{'teachaid':reportVal,'searchType':1},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    // layer.msg(data.info);
                    $.each(data, function(index, value) {
                        html = '';
                        $.each(value, function(num, val) {
                                html += "<td class='" + num + "'>" + val + "</td>";
                            })
                            //添加按钮
                            $tableShow.html($tableShow.html() + "<tr>" + html);
                    });
                },
                error:function(error){
                    console.log(error);
                    // layer.msg(error.info);
                }
               })//ajax结束
        });

         $("#searchBname").click(function(){
            var reportVal=$(this).prev().val();
            var $tableShow=$("#searchVal"),html;
           $tableShow.prev().html('<tr><th>学号</th><th>楼名</th><th>楼层</th><th>房号</th><th>教具</th><th>需求数量</th></tr>')
            $tableShow.html('');
            $.ajax({
                type:'GET',
                url:requestUrl + "search.php",
                data:{'bname':reportVal,'searchType':2},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    $.each(data, function(index, value) {
                        html = '';
                        $.each(value, function(num, val) {
                                html += "<td class='" + num + "'>" + val + "</td>";
                            })
                            //添加按钮
                            $tableShow.html($tableShow.html() + "<tr>" + html);
                    });
                },
                error:function(error){
                    console.log(error);
                    // layer.msg(error.info);
                }
               })//ajax结束
        });

});