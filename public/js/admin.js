$(function() {
  $('.del').click((e) => {
    var target = $(e.target),
        id = target.data('id'),
        tr = $('.item-id-' + id)
    console.log(target,id);
    $('#myModal').modal('show')


    $('.yes').click(() => {
      $('#myModal').modal('hide')
      $.ajax({
        type: 'DELETE',
        url: '/admin?id=' + id
      })
      .done((res) => {
        if (res.success === 1) {
          if (tr.length > 0) {
            tr.remove()
          }
        }
      })
    })
  })
  $('.userdel').click(function(e) {
    var target = $(e.target),
    id = target.data('id'),
    tr = $('.item-id-' + id)

    $('#userModal').modal('show')

    $('#userModal .yes').click(function() {
      $('#userModal').modal('hide')

      $.ajax({
        type: 'DELETE',
        url: '/user/del?id=' + id
      }).done((res) => {
        if (res.errno === 0 && tr.length > 0) {
          tr.remove()
        }
        console.log(res);
      })
    })
  })
})