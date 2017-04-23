$('.slider').each(function () {
  $(this).css({
    'background-image': 'url("'+'/dist/images/'+'red'+$(this).attr('links')+'.jpg")'
  });
});


$('#slider').slick({
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnFocus: false,
  pauseOnHover:false,
  pauseOnDotsHover: true,
  // slidesToShow:5,
  esing:'swing',
  fade: true,
  cssEase: 'linear',
  zIndex: 10
});

KindEditor.ready(function(K) {
    window.editor = K.create('#textarea', {
        resizeType : 0,
        items : [
          'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '|',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
          'italic', 'underline', 'strikethrough', 'removeformat', '|',
          'table', 'emoticons', 'baidumap',
          'link', 'unlink', '|', 'fullscreen'
        ]

    });
});
