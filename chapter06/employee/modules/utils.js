
function toDatetimeFormat(date) {
    // 9時間を足す
    date.setTime(date.getTime() + 1000*60*60*9);
    
    let datetimeFormat = "";
    datetimeFormat += date.getFullYear() + "年";
    datetimeFormat += date.getMonth() + 1 + "月";
    datetimeFormat += date.getDate() + "日";
    datetimeFormat += date.getHours() + "時";
    datetimeFormat += date.getMinutes() + "分";
    datetimeFormat += date.getSeconds() + "秒";
    return datetimeFormat;
}

module.exports = {
    toDatetimeFormat
};
