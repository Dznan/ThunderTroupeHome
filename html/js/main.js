$(document).ready(function(){
  initData()
});
//默认场次选择
var submitShow = 1

function submit() {
  var url = "/BackServer/users/add"
  var reqData={}
  reqData.username= document.getElementById('name').value
  reqData.email = document.getElementById('email').value
  reqData.work = document.getElementById('work').value
  reqData.phone = document.getElementById('phone').value
  axios.post(url, reqData).then(function (res) {
    if(res.data.code === 'ok'){
      alert($.i18n.prop('signSuccess'))
    }else{
      alert($.i18n.prop('signFail'))
    }
  })
}

function sign() {
  var url =  "/BackServer/users/sign"
  var reqData={}
  reqData.username= document.getElementById('signName').value
  reqData.email = document.getElementById('signMail').value
  reqData.phone = document.getElementById('signPhone').value
  reqData.reservation = submitShow
  if(reqData.username.trim()=== ''||reqData.email.trim()=== ''||reqData.phone.trim()=== ''){
    alert($.i18n.prop('inputNull'))
  }else{
    axios.post(url, reqData).then(function (res) {
      if(res.data.code){
        alert($.i18n.prop('signSuccess'))
        setLocal(reqData)
        closeBox()
      }else{
        alert($.i18n.prop('signFail'))
      }
    })
  }

}

//初始本地存储
function setLocal(reqData) {
  window.localStorage.setItem('username', reqData.username)
  window.localStorage.setItem('email', reqData.email)
  window.localStorage.setItem('phone', reqData.phone)
  switch (submitShow){
    case 1:
      window.localStorage.setItem('play1', 1);
      break;
    case 2:
      window.localStorage.setItem('play2', 1);
      break;
    case 3:
      window.localStorage.setItem('play3', 1);
      break;
    default:
      break;
  }
  initData()
}

//初始化报名状态
function initData() {
  window.localStorage.setItem('play1', 1);
  window.localStorage.setItem('play2', 1);
  // window.localStorage.setItem('play3', 0);
  var play1 = window.localStorage.getItem('play1')
  var play2 = window.localStorage.getItem('play2')
  // var play3 = window.localStorage.getItem('play3')
  if(play1==='1'){
    $('.plays1').children('.active').css('display', 'none')
    $('.plays1').children('.unActive').css('display', 'block')
  }
  if(play2==='1'){
    $('.plays2').children('.active').css('display', 'none')
    $('.plays2').children('.unActive').css('display', 'block')
  }
  // if(play3==='1'){
  //   $('.plays3').children('.active').css('display', 'none')
  //   $('.plays3').children('.unActive').css('display', 'block')
  // }
}

function jump(id) {
  if(id===1){
    window.location= '/html/plays1.html'
  }else if(id===2){
    window.location= '/html/plays2.html'
  }else if(id===3){
    window.location= '/html/plays3.html'
  }
}

function chose(id) {
  submitShow = id
  $('.coverBox').css('display', 'flex')
  var username =  window.localStorage.getItem('username')
  var email = window.localStorage.getItem('email')
  var phone = window.localStorage.getItem('phone')
  if(username!==undefined){
    $('#signName').val(username)
  }
  if(email!==undefined){
    $('#signMail').val(email)
  }
  if(phone!==undefined){
    $('#signPhone').val(phone)
  }
  if(id===1){
    $('.titleContent').text($.i18n.prop('show1'))
  }else if(id===2){
    $('.titleContent').text($.i18n.prop('show2'))
  }else if(id===3){
    $('.titleContent').text($.i18n.prop('show3'))
  }
}

function closeBox() {
  $('.coverBox').css('display', 'none')
}