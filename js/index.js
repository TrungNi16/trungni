// ================================
// TrungNi Shop - index.js
// ================================

// Loading
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Dropdown tài khoản
const profile = document.querySelector(".profile");
const dropdown = document.querySelector(".dropdown");

if (profile && dropdown) {
    profile.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        dropdown.classList.remove("show");
    });
}

// Thông báo
const notifyBtn = document.querySelector(".icon");

if (notifyBtn) {

    notifyBtn.addEventListener("click", () => {

        alert(
`📢 Thông báo

🎉 Chào mừng đến TrungNi Shop

🔥 Khuyến mãi hôm nay giảm 20%

💎 Đăng ký Seller hoàn toàn miễn phí`
        );

    });

}

// Slider Banner
const banners = [

"images/banner1.png",

"images/banner2.png",

"images/banner3.png"

];

let bannerIndex = 0;

const banner = document.querySelector(".hero-right img");

if (banner) {

    setInterval(() => {

        bannerIndex++;

        if (bannerIndex >= banners.length)

            bannerIndex = 0;

        banner.src = banners[bannerIndex];

    }, 4000);

}

// Tìm kiếm
const searchInput = document.querySelector(".search input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display =
                text.includes(value)
                    ? "block"
                    : "none";

        });

    });

}

// Mua ngay
document.querySelectorAll(".product-card button").forEach(btn => {

    btn.onclick = () => {

        alert("🛒 Chức năng mua hàng sẽ được cập nhật.");

    };

});

// Hover Card
document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// Hiển thị năm
const footer = document.querySelector("footer");

if (footer) {

    footer.innerHTML =
    `© ${new Date().getFullYear()} TrungNi Shop - Uy tín làm nên thương hiệu`;

}

// Dark Mode
const darkBtn = document.getElementById("darkMode");

if (darkBtn) {

    darkBtn.onclick = () => {

        document.body.classList.toggle("light");

    };

}

// Scroll Animation
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

});

document.querySelectorAll(".card,.product-card,.seller-card,.stats div").forEach(el => {

    observer.observe(el);

});

// Đồng hồ
function updateClock(){

    const now = new Date();

    const h = String(now.getHours()).padStart(2,"0");

    const m = String(now.getMinutes()).padStart(2,"0");

    const s = String(now.getSeconds()).padStart(2,"0");

    const clock = document.getElementById("clock");

    if(clock){

        clock.innerHTML=`🕒 ${h}:${m}:${s}`;

    }

}

setInterval(updateClock,1000);

updateClock();
