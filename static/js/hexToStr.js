$(function () {
    // 左侧选单高亮
    $('.toolGroup .hexToStr').addClass('active').siblings().removeClass('active');

    // 激活tooltip
    $('.tip-icon').popover();

    // 转换16进制码为指定字符编码的字符
    function hexToEnc(encoding){
        encoding = encoding.data.e
        var fta = $('.hexFor\%s-ta'.replace('\%s',encoding));
        var tta = $('.hexTo\%s-ta'.replace('\%s',encoding));

        <!-- 重置 popover -->
        fta.popover('destroy');

        <!-- 清空字符框 -->
        tta.val('');

        var s = fta.val().trim();
        var fd = new FormData();
        fd.append('hex',s);

        if(s){
            $.ajax({
                url:"/hexTo\%s".replace("\%s",encoding),
                headers:{"X-CSRFToken":$.cookie('csrftoken')},
                data:fd,
                processData:false,
                contentType:false,
                type:"POST",
                dataType:"json",
                success:function(data,statusText,jqXHR){

                    if(data['status']){
                        tta.val(data['data']);
                    }else{
                        fta.attr("data-content",data["error"]);
                        fta.popover('show');

                    }
                },
                error:function(){
                    console.log("Failed to send data");
                }
            })
        }
    }

    $('.hexToUTF8-btn').click({e:'UTF8'},hexToEnc);
    $('.hexForUTF8-ta').blur({e:'UTF8'},hexToEnc);

    $('.hexToGBK-btn').click({e:'GBK'},hexToEnc);
    $('.hexForGBK-ta').blur({e:'GBK'},hexToEnc);

    // 转换指定字符编码的字符为16进制码
    function encToHex(encoding){
        encoding = encoding.data.e;
        var tta = $(".hexTo\%s-ta".replace('\%s',encoding));
        var fta = $('.hexFor\%s-ta'.replace('\%s',encoding));

        <!-- 重置 popover -->
        tta.popover('destroy');

        // 清空十六进制码
        fta.val('');

        var s = tta.val();
        fd = new FormData();
        fd.append('s',s);

        if(s){
            $.ajax({
                url:'/\%sToHex'.replace('\%s',encoding),
                headers:{'X-CSRFToken':$.cookie('csrftoken')},
                type:'POST',
                data:fd,
                processData:false,
                contentType:false,
                dataType: 'json',
                success:function (data,statusText,jqXHR) {
                    if(data['status']){
                        fta.val(data['data'])
                    }else{
                        tta.attr("data-content",data['error']);
                        tta.popover('show');
                    }
                },
                error:function() {
                    console.log('Failed to send data')
                },
            })

        }

    }

    $('.UTF8ToHex-btn').click({e:'UTF8'},encToHex)
    $('.GBKToHex-btn').click({e:'GBK'},encToHex)



});