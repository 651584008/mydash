//关于时间格式转换的函数
function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth()
	var date = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinites()
	var second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + '' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function formatDate(date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return [year, month, day].map(formatNumber).join('-')
}

//时间戳转换成日期时间
function js_date_time(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}{m}{d}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    if (formatObj.a == 0) formatObj.a = 7;
    let value = formatObj[key];
    if (key === 'a') return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1];
    if (result.length > 0 && value < 10) value = '0' + value;
    return value || 0;
  });
  return time_str;
}



module.exports = {
	formatTime, //时间转日期时间
	formatDate,//时间转日期
	js_date_time: js_date_time, //时间戳转日期时间
}
