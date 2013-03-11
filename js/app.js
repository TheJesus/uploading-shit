$(function() {
    var $form = $('#form'),
        $input = $('#filez'),
        $upload = $('#upload'),
        $results = $('#results'),
        $fileList = $('#file-list'),
        $progress = $('#progress'),
        $percentage = $('#percentage');

    function setProgress( percent )
    {
        $progress.val(percent);
        $percentage.text(percent === 100 ? 'DONE!' : percent + '% complete.');
    }

    $input.fileupload({
        dataType: 'json',

        add: function( e, data ) {
            $.each(data.files, function( i, file) {
                $fileList.append($('<p/>').html('<b>File:</b> ' + file.name));
            });

            data.context = $upload.on('click', function(e) {
                e.preventDefault();
                data.submit();
            });
        },

        done: function( e, data ) {
            $.each(data.result.files, function( i, file ) {
                $results.append($('<p/>').html('<b>Uploaded:</b> ' + file.name));
            });
        },

        send: function( e, data) {
            setProgress( 0 );
        },

        progressall: function( e, data ) {
            var progress = parseInt(data.loaded / data.total * 100, 10);

            setProgress(progress);
        }
    });
});