$("html").niceScroll({
  zindex: 3,
  mousescrollstep: 20 * 3
});
$(window).resize(function () {
  $("html").getNiceScroll().resize();
});
