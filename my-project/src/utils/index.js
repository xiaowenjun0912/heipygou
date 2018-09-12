function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
// 抽取自己的ajax 使用promise
function thenAjax(opt){
  // 返回一个promise对象即可
  return new Promise((resolve,reject)=>{
      // 进行异步的操作
      wx.request({
        url:'https://autumnfish.cn/wx/'+opt.url,
        method:opt.method|| 'GET',
        data:opt.data|| {},
        header:opt.header|| 'application/x-www-form-urlencoded',
        success: resolve,
        fail: reject,
        complete:()=>{}
      });
  })
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  thenAjax
}
