$(function () {
    $('#fileupload').fileupload({
    	url:'rest/controller/upload',
    	type:'POST',
        dataType: 'json',
        autoUpload : true,
        acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
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
			console.log("ÉÏ´«Ê§°Ü£º"+data.errorThrown);
		}
    });
});