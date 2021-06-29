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

module.exports = {
	formatTime,
	formatDate
}
