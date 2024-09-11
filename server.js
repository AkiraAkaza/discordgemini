const moment = require('moment-timezone');
const express = require('express');
const server = express();
let port = 3000

const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
const ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYYY');
const thuMap = {
  'Sunday': 'Chủ Nhật',
  'Monday': 'Thứ Hai',
  'Tuesday': 'Thứ Ba',
  'Wednesday': 'Thứ Tư',
  'Thursday': 'Thứ Năm',
  'Friday': 'Thứ Sáu',
  'Saturday': 'Thứ Bảy'
};

const thu = thuMap[moment.tz('Asia/Ho_Chi_Minh').format('dddd')];

server.all('/', (req, res) => {
  res.send(`Server được khởi động lúc ${gio} ${thu} Ngày ${ngay}`)
})

function keepAlive() {
  server.listen(3000, () => { console.log(`Server up! \n Your server is running at: https://localhost:${port}`) });
}

module.exports = keepAlive;
