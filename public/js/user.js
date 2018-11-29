$(function() {
  $('#register').ajaxForm({
    clearForm: true,
    dataType: 'json',
    success: function(res) {
      if (res.errno === 0) {
        location.href = '/user/list'
      }else if (res.errno === 1) {
        $('.ruser').addClass('is-invalid').next().text(res.msg)
      }
      
    }
  })

  $('#login').ajaxForm({
    clearForm: true,
    dataType: 'json',
    success: function(res) {
      if (res.errno === 1) {
        $('.ruser').addClass('is-invalid').next().text(res.msg)
      }else if(res.errno === 0) {
        $('.modal').modal('hide')
      }
      console.log(res);
    }
  })

  $('.form-control').focus(function() {
    $('.is-invalid').removeClass('is-invalid')
  })

  // 模态框消失事件
  $('.modal').on('hide.bs.modal', function() {
    $('.is-invalid').removeClass('is-invalid')
  })

})