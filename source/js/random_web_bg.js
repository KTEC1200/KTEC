document.addEventListener('DOMContentLoaded', function() {
  var apiUrl = 'https://t.alcy.cc/ycy?t=' + new Date().getTime();
  
  // 直接设置 body 背景（优先级较高，会覆盖主题默认背景）
  document.body.style.backgroundImage = 'url(' + apiUrl + ')';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundPosition = 'center';
  
  // 如果确实想用 #web_bg，加上容错
  var bgElement = document.getElementById('web_bg');
  if (bgElement) {
    bgElement.style.backgroundImage = 'url(' + apiUrl + ')';
    bgElement.style.backgroundSize = 'cover';
    bgElement.style.backgroundAttachment = 'fixed';
    bgElement.style.backgroundPosition = 'center';
  }
});