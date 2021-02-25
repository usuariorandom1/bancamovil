(function ($) {
    $(document).ready(function () {

        $('.stm_submit_ico__field_radio').on('click', function () {
            var value = $(this).attr('data-value');
            var $input = $(this).closest('.stm_submit_ico__field_value').find('input');
            $input.val(value);
            $(this).closest('.stm_submit_ico__field_value').find('.stm_submit_ico__field_radio').removeClass('active');
            $(this).addClass('active');
        });

        $(".stm_submit_ico form").submit(function (e) {

            var $this = $(this);
            var $btn = $this.find('button[type="submit"]');

            e.preventDefault();

            var fd = new FormData;

            var form_data = $this.serializeArray();

            form_data.forEach(function(element) {
                fd.append(element['name'], element['value']);
            });

            fd.append('action', 'stm_submit_ico');

            $('input[type="file"]').each(function(){
                if($(this)[0].files.length) fd.append($(this).attr('name'), $(this)[0].files[0]);
            });


            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: fd,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $this.find('.submit_ico_validation').removeClass('danger success').html('');
                    $this.find('.stm_submit_ico__field').removeClass('error');
                    $btn.find('.stm-stm14_right_arrow').removeClass('.stm-stm14_right_arrow').addClass('fa fa-refresh fa-spin');
                },
                success: function (data) {
                    $btn.find('.fa.fa-refresh.fa-spin').removeClass('fa fa-refresh fa-spin').addClass('stm-stm14_right_arrow');
                    if(typeof data.errors !== 'undefined' && data.errors.length > 0) {
                        data.errors.forEach(function(name){
                           $('.field_' + name).addClass('error');
                        });
                    }

                    var status = (data.has_error) ? 'danger' : 'success';

                    if(data.message.length > 0) {
                        $this.find('.submit_ico_validation').addClass(status).html('<div class="inner">' + data.message + '</div>');
                    }

                    if(typeof grecaptcha !== 'undefined' && status === 'danger') {
                        grecaptcha.reset();
                    }

                    if(status === 'success'){
                        $this.closest('.stm_submit_ico').find('.stm_submit_ico__inner').slideUp();
                    }

                }
            });
        });

        $('.stm_ico_submit__file input').on('change', function () {
            var filename = $(this).val().replace(/C:\\fakepath\\/i, '');
            var cssClass = 'has-file';
            if (filename === '') {
                filename = $(this).attr('data-placeholder');
                $(this).closest('.stm_ico_submit__file').find('span').removeClass(cssClass);
            } else {
                $(this).closest('.stm_ico_submit__file').find('span').addClass(cssClass);
            }

            $(this).closest('.stm_ico_submit__file').find('span').text(filename);
        });

    });
})(jQuery);