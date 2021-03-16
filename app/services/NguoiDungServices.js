// /*
//  * chứa các hàm
//  * giúp tương tác với BE thông qua API
function NguoiDungService() {
    this.mangND = [];
    this.layDanhSachND = function () {
        // GET request for remote image in node.js
        return axios({
            method: 'get',
            url: 'https://5f9c1b1c856f4c00168c7197.mockapi.io/NGUOIDUNG',
            responseType: 'stream'
        });


        // .then(function (response) {
        //     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        // });
    }
    this.themNd = function (nd) {
        // POST tao mới người dùng
        return axios({
            method: 'post',
            url: 'https://5f9c1b1c856f4c00168c7197.mockapi.io/NGUOIDUNG',
            data: nd
        });
    }
    this.xoaND = function (id) {
        //Delete để xóa một người
        return axios({
            method: 'delete',
            url: `https://5f9c1b1c856f4c00168c7197.mockapi.io/NGUOIDUNG/${id}`
        });

    }

    this.layChiTietND = function (id) {
        //Get để lấy thông tin chi tiết của người dùng
        return axios({
            method: 'get',
            url: `https://5f9c1b1c856f4c00168c7197.mockapi.io/NGUOIDUNG/${id}`
        });

    }
    this.capNhatND = function (nd, id) {
        //PUT để update info mới cho người dùng
        return axios({
            method: 'put',
            url: `https://5f9c1b1c856f4c00168c7197.mockapi.io/NGUOIDUNG/${id}`,
            data: nd
        });
    }
}