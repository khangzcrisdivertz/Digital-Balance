/**
 * ===============================
 * 1. KHỞI TẠO GIAO DIỆN
 * ===============================
 */

document.addEventListener("DOMContentLoaded", () => {
    updateDynamicGreeting();
    initTheme();
});


/* ===============================
   CÂU CHÀO THEO GIỜ
================================ */

function updateDynamicGreeting(){

    const hour = new Date().getHours();
    const slogan = document.querySelector(".header-slogan");

    if(!slogan) return;

    if(hour >= 5 && hour < 12){
        slogan.innerText = "Chào buổi sáng! Hãy bắt đầu ngày mới thật tỉnh táo. ☀️";
    }

    else if(hour >= 12 && hour < 18){
        slogan.innerText = "Chào buổi chiều! Đừng quên nghỉ mắt khỏi màn hình nhé. ☕";
    }

    else{
        slogan.innerText = "Buổi tối rồi! Hãy chuẩn bị rời xa màn hình để ngủ ngon. 🌙";
    }
}


/* ===============================
   DARK MODE
================================ */
function initTheme() {

    const themeBtn = document.querySelector(".theme-btn");
    if (!themeBtn) return;

    themeBtn.onclick = () => {

        const currentTheme = document.documentElement.getAttribute("data-theme");

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);

        if (newTheme === "dark") {
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }

    };

}

initTheme();

/**
 * ===============================
 * 2. PHÂN TÍCH DỮ LIỆU
 * ===============================
 */

function analyze(){

    const phone = parseFloat(document.getElementById("phone").value) || 0;
    const social = parseFloat(document.getElementById("social").value) || 0;

    const resultBox = document.getElementById("result-box");

    const tablePhone = document.getElementById("table-phone");
    const tableSocial = document.getElementById("table-social");
    const tableStatus = document.getElementById("table-status");

    const hoursDisplay = document.getElementById("hours-display");

    const fill = document.getElementById("progress-fill");
    const percentLabel = document.getElementById("percent-label");

    const tag = document.getElementById("status-tag");

    const advice = document.getElementById("advice-content");


    /* ===============================
       VALIDATE DỮ LIỆU
    =============================== */

    if(phone > 24 || phone < 0){

        resultBox.classList.add("show");
        tableStatus.innerText = "❌ Số giờ không hợp lệ";

        return;
    }

    if(social > phone){

        resultBox.classList.add("show");
        tableStatus.innerText = "❌ Mạng xã hội không thể lớn hơn tổng giờ";

        return;
    }


    /* ===============================
       HIỆN BẢNG KẾT QUẢ
    =============================== */

    resultBox.classList.add("show");


    /* ===============================
       CẬP NHẬT BẢNG
    =============================== */

    tablePhone.innerText = phone + " giờ";
    tableSocial.innerText = social + " giờ";


    /* ===============================
       ĐÁNH GIÁ
    =============================== */

    let status = "";
    let color = "";
    let adviceText = "";

    if(phone <= 2){

        status = "🌱 Lành mạnh";
        color = "#2ecc71";

        adviceText =
        "Bạn đang kiểm soát thời gian rất tốt. Hãy tiếp tục duy trì thói quen này.";

    }

    else if(phone <= 5){

        status = "⚖️ Trung bình";
        color = "#f1c40f";

        adviceText =
        "Thời gian dùng máy hơi nhiều. Thử dành thêm thời gian đọc sách hoặc vận động.";

    }

    else{

        status = "🚨 Báo động";
        color = "#e74c3c";

        adviceText =
        "Bạn đang dùng màn hình quá nhiều. Hãy thử Digital Detox trong vài giờ.";

    }

    tableStatus.innerText = status;


    /* ===============================
       PROGRESS BAR
    =============================== */

    const percent = Math.min((phone / 8) * 100, 100);

    fill.style.width = percent + "%";
    fill.style.background = color;

    percentLabel.innerText = Math.round(percent) + "%";


    /* ===============================
       TAG
    =============================== */

    tag.innerText = status;
    tag.style.background = color;


    /* ===============================
       HIỂN THỊ GIỜ
    =============================== */

    hoursDisplay.innerText = phone;


    /* ===============================
       QUY ĐỔI THỜI GIAN
    =============================== */

    document.getElementById("read-pages").innerText =
        Math.round(phone * 30);

    document.getElementById("walk-km").innerText =
        (phone * 4).toFixed(1);


    /* ===============================
       LỜI KHUYÊN
    =============================== */

    advice.innerText = adviceText;

}



/**
 * ===============================
 * 3. ENTER ĐỂ PHÂN TÍCH
 * ===============================
 */

document.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){
        analyze();
    }

});
const scrollBtn = document.querySelector(".btn-scroll");

if(scrollBtn){

scrollBtn.addEventListener("click", () => {

document.getElementById("journal").scrollIntoView({
behavior: "smooth"
});

});

}