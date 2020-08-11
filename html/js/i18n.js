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
    $(".list.cn").css('display','inline-block')
    $(".drop.cn").css('display','block')
    $(".list.en").css('display','none')
    $(".drop.en").css('display','none')
  }else{
    $(".list.en").css('display','inline-block')
    $(".drop.en").css('display','block')
    $(".list.cn").css('display','none')
    $(".drop.cn").css('display','none')
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