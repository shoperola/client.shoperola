$(document).ready(function () {
  $("#summernote-editor").summernote({
    height: 150,
    minHeight: null,
    maxHeight: null,
    focus: !0,
  }),
    $("#summernote-airmode-editor").summernote({ airMode: !0 });
  $("#summernote-editor2").summernote({
    height: 100,
    minHeight: null,
    maxHeight: null,
    focus: !0,
  }),
    $("#summernote-airmode-editor2").summernote({ airMode: !0 });
});

$(document).ready(function () {
  $("#summernote-editor").summernote();
});
