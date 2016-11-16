$(function () {
    $('#fileupload').fileupload({
    	url:'http://localhost:8080/SpringMVC-JQueryFileUpload/rest/controller/uploadCrossDomain',
    	type:'POST',
        dataType: 'json',
        autoUpload : true,
        acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
        forceIframeTransport: true,
        redirect:"http://localhost:3000/cors/result.html?",//重定向的页面，redirect会被添加到后台的form-data中
        done: function (e, data) {
        	$("tr:has(td)").remove();
            $.each(data.result, function (index, file) {
                $("#uploaded-files").append(
            		$('<tr/>')
            		.append($('<td/>').text(file.fileName))
            		.append($('<td/>').text(file.fileSize))
            		.append($('<td/>').text(file.fileType))
            		.append($('<td/>').html("<a href='rest/controller/get/"+index+"'>Click</a>"))
            		);
            }); 
        },
        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progress .bar').css(
	            'width',
	            progress + '%'
	        );
   		},
		dropZone: $('#dropzone'),
		fail:function(e,data){
			console.log(data);
			console.log("上传失败："+data.errorThrown);
		}
    });
});