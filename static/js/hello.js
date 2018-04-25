import $ from '../plugins/jquery'

$(document).ready(function () {
  let progress = 0
  let timer = setInterval(function () {
    progress += 1
    $('.progress div').css('width', progress + '%')
    $('.progress span').text(progress + '%')
    if (progress === 100) {
      clearInterval(timer)
    }
  }, 1000 / 60)
})
