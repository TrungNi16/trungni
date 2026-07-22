const settingBtn = document.querySelector(".setting");
const dropdown = document.querySelector(".dropdown");

if (settingBtn && dropdown) {
    settingBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", function () {
        dropdown.classList.remove("active");
    });
}
