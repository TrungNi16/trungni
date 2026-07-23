let money = Number(localStorage.getItem("money")) || 0;

document.getElementById("userMoney").textContent =
    "💰 " + money.toLocaleString("vi-VN") + "đ";
