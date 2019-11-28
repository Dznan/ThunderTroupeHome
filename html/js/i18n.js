$(document).ready(function(){
  var lan = window.localStorage.getItem('thunderLan')
  if(lan===undefined||lan===''||lan=== null){
    lan = 'en'
  }
  choseLan(lan)
});

// window.onload = function() {
//   var sel = document.getElementById("lanSelect");
//   if(sel&&sel.addEventListener){
//     sel.addEventListener('change',function(e){
//       var ev = e||window.event;
//       var target = ev.target||ev.srcElement;
//       choseLan(target.value);
//     },false)
//   }
// }

function choseLan(lan) {
  console.log(lan)
  window.localStorage.setItem('thunderLan',lan)
  if(lan === 'en'){
    $(".cn").css('display','inline-block')
    $(".en").css('display','none')
  }else{
    $(".en").css('display','inline-block')
    $(".cn").css('display','none')
  }
  i18nCtrl(lan)
}

function i18nCtrl(lan) {
  jQuery.i18n.properties({
    name:'strings',// 资源文件名称
    path:'/i18n/',// 资源文件所在目录路径
    mode:'map',// 模式：变量或 Map
    language:lan,// 对应的语言
    cache:false,
    encoding: 'UTF-8',
    callback: function() {// 回调方法
      $('[data-i18n-text]').each(function () {
        //如果text里面还有html需要过滤掉
        var html = $(this).html();
        var reg = /<(.*)>/;
        if (reg.test(html)) {
          var htmlValue = reg.exec(html)[0];
          $(this).html(htmlValue + $.i18n.prop($(this).data('i18n-text')));
        }
        else {
          $(this).text($.i18n.prop($(this).data('i18n-text')));
        }
      });
    }
  });
}