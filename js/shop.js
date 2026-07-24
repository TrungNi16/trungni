import {
    db,
    collection,
    getDocs
} from "./firebase.js";

// =========================
// DOM
// =========================

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

let allProducts = [];
let currentCategory = "all";

// =========================
// Load Products
// =========================

async function loadProducts() {

    productList.innerHTML = `
        <div class="loading">
            Đang tải sản phẩm...
        </div>
    `;

    try {

        const snapshot = await getDocs(collection(db, "products"));

        allProducts = [];

        snapshot.forEach(doc => {

            allProducts.push({

                id: doc.id,

                ...doc.data()

            });

        });

        renderProducts();

    } catch (error) {

        productList.innerHTML = `
            <div class="empty">
                Không thể tải sản phẩm.
            </div>
        `;

        console.error(error);

    }

}

// =========================
// Render Products
// =========================

function renderProducts() {

    let products = [...allProducts];

    // Lọc danh mục

    if (currentCategory !== "all") {

        products = products.filter(p =>

            p.category === currentCategory

        );

    }

    // Tìm kiếm

    if (searchInput.value.trim() !== "") {

        const keyword = searchInput.value.toLowerCase();

        products = products.filter(p =>

            p.name.toLowerCase().includes(keyword)

        );

    }

    if (products.length === 0) {

        productList.innerHTML = `
            <div class="empty">
                Không có sản phẩm.
            </div>
        `;

        return;

    }

    productList.innerHTML = "";

    products.forEach(product => {

        productList.innerHTML += `

        <div class="product-card">

            <span class="badge hot">

                HOT

            </span>

            <img src="${product.image}" alt="${product.name}">

            <div class="product-body">

                <div class="stock">

                    ✔ Còn hàng

                </div>

                <h3 class="product-title">

                    ${product.name}

                </h3>

                <p class="product-desc">

                    ${product.description}

                </p>

                <div class="price-box">

                    <span class="price">

                        ${Number(product.price).toLocaleString()}đ

                    </span>

                </div>

                <button class="buy-btn"

                    onclick="location.href='product.html?id=${product.id}'">

                    🛒 Mua ngay

                </button>

            </div>

        </div>

        `;

    });

}

// =========================
// Search
// =========================

if (searchInput) {

    searchInput.addEventListener("input", renderProducts);

}

// =========================
// Category
// =========================

document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".filter-btn")

        .forEach(x => x.classList.remove("active"));

        btn.classList.add("active");

        currentCategory = btn.dataset.category;

        renderProducts();

    }

});

// =========================

loadProducts();
