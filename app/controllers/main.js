//Khai báo thể hiện của NguoiDungServices
var ndservices = new NguoiDungService();
layDanhSachNguoiDung();
// hienThiDanhSach();

function getEle(id) {
    return document.getElementById(id);
}
//Hàm lấy danh sách người dùng
function layDanhSachNguoiDung() {
    var axiosObj = ndservices.layDanhSachND();
    axiosObj.then(function (result) {
        //giúp lấy data từ APi
        //Nếu lấy data thành công thì chạy các hàm xử lý trong then
        //result.data: Danh sách người dùng cần lấy
        // return result.data;
        console.log(result.data);
        hienThiDanhSach(result.data);
    }).catch(function (error) {
        //Nếu lấy dữ liệu k thành công thì xử lý trong catch
        console.log(error);
    });
}



//Hàm hiển thị danh sách lên table
function hienThiDanhSach(mangND) {
    var tbody = getEle("tblDanhSachNguoiDung");
    var content = "";
    var counter = 0;
    mangND.map(function (item, index) {
        // counter = counter + 1;
        // counter +=1;
        counter++;
        content += `
            <tr>
               <td>${counter}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaND('${item.id}')">Xóa</button>
                <button class="btn btn-info" onclick="suaND('${item.id}')" data-toggle="modal"
                data-target="#myModal" >Sửa</button>
                </td>

            </tr>
        `;
    })
    tbody.innerHTML = content;
}



// .then(function (result) {
//     //giúp lấy data từ APi
//     //Nếu lấy data thành công thì chạy các hàm xử lý trong then
//     //result.data: Danh sách người dùng cần lấy
//     return result.data;
// })
//     .catch(function (error) {
//         //Nếu lấy dữ liệu k thành công thì xử lý trong catch
//         console.log(error);
//     });

//Xử lý form thêm người dùng
getEle("btnThemNguoiDung").addEventListener("click", function () {
    var modalFooter = document.querySelector('.modal-footer');
    console.log(modalFooter);
    modalFooter.innerHTML = '<button id="btnThem" class="btn btn-success">Thêm</button>';
    getEle("btnThem").addEventListener("click", function () {
        //Lấy thông tin từ form và trả về đối tượng nd
        // layThongTinND();
        var ndObj = layThongTinND();
        var ndThem = ndservices.themNd(ndObj);
        ndThem.then(function () {
            //Nếu thêm thành công
            layDanhSachNguoiDung();
            //Gọi sự kiện click có sẵn của button
            //Mục đích: Tắt popup modal sau khi thêm thành công
            document.querySelector("#myModal .close").click();

        }).catch(function (error) {
            //Nếu thêm thất bại
            console.log(error);
        });
    })
})

//Hàm lấy thông tin người dùng từ form
function layThongTinND() {
    var tk = getEle("TaiKhoan").value;
    var ht = getEle("HoTen").value;
    var mk = getEle("MatKhau").value;
    var email = getEle("Email").value
    var sdt = getEle("SoDienThoai").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    //Lưu thông tin xuống đối tượng người dùng

    var nd = new NguoiDung(tk, ht, mk, email, sdt, loaiNguoiDung);
    console.log(nd);
    return nd;
}
function xoaND(id) {
    //Gọi phương thức xóa trong người dùng services
    var axiosObj = ndservices.xoaND(id);
    axiosObj.then(function (result) {
        //Nếu xóa thành công
        console.log(result);
        layDanhSachNguoiDung();

    }).catch(function (error) {
        //Nếu xóa thất bại
        console.log(error);
    })
}
//Hàm sửa người dùng
function suaND(id) {
    //Xử lý form => thêm button cập nhật
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = '<button id="btnCapNhat" class="btn btn-success" >Cập nhật</button>';
    //Hiện thông tin chi tiết của 1 người dùng
    var axiosObj = ndservices.layChiTietND(id);
    axiosObj.then(function (result) {
        //Lấy chi tiết người dùng thành công
        var chiTietND = result.data;
        console.log(chiTietND);
        hienThiChiTiet(chiTietND);

    }).catch(function (error) {
        //Lấy chi tiết người dùng thất bại
        console.log(error);
    })

    getEle("btnCapNhat").addEventListener("click", function () {
        var thongTinND = layThongTinND();
        var axiosCapNhat = ndservices.capNhatND(thongTinND, id);
        axiosCapNhat.then(function (result) {
            //Cập nhật thành công
            layDanhSachNguoiDung();
            document.querySelector("#myModal .close").click();

        }).catch(function (error) {
            //Cập nhật thất bại
            console.log(error);
        })
    })
}


// Hiển thị chi tiết của người dùng lên trên form (popup)
function hienThiChiTiet(chiTietND) {
    getEle("TaiKhoan").value = chiTietND.taiKhoan;
    getEle("HoTen").value = chiTietND.hoTen;
    getEle("MatKhau").value = chiTietND.matKhau;
    getEle("Email").value = chiTietND.email;
    getEle("SoDienThoai").value = chiTietND.soDT;
    getEle("loaiNguoiDung").value = chiTietND.maLoaiNguoiDung;
}

function capNhatND(nd, id) {
    //Thông tin mới của đối tượng ng dùng
    var thongTinMoi = layThongTinND();


}

