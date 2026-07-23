/* ===========================
   SHOP HEADER
=========================== */

.shop-header{
    padding:70px 8%;
    text-align:center;
    background:linear-gradient(135deg,#2563eb,#1e40af);
}

.shop-header h1{
    font-size:48px;
    margin-bottom:15px;
}

.shop-header p{
    font-size:18px;
    color:#e5e7eb;
    margin-bottom:30px;
}

.shop-header input{
    width:100%;
    max-width:550px;
    padding:16px 20px;
    border:none;
    border-radius:16px;
    outline:none;
    font-size:16px;
}

/* ===========================
   PRODUCT GRID
=========================== */

.product-grid{

    padding:60px 8%;

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));

    gap:30px;

}

/* ===========================
   PRODUCT CARD
=========================== */

.product{

    background:#111827;

    border-radius:20px;

    overflow:hidden;

    transition:.35s;

    border:1px solid rgba(255,255,255,.08);

}

.product:hover{

    transform:translateY(-8px);

    box-shadow:0 20px 40px rgba(0,0,0,.35);

}

.product img{

    width:100%;

    height:220px;

    object-fit:cover;

}

.product-info{

    padding:20px;

}

.product-info h3{

    font-size:22px;

    margin-bottom:10px;

}

.product-info p{

    color:#cbd5e1;

    margin-bottom:15px;

}

.price{

    color:#22c55e;

    font-size:28px;

    font-weight:bold;

    margin-bottom:18px;

}

/* ===========================
   BUTTON
=========================== */

.buy-btn{

    width:100%;

    padding:14px;

    border:none;

    border-radius:14px;

    background:#2563eb;

    color:white;

    font-size:16px;

    font-weight:700;

    cursor:pointer;

    transition:.3s;

}

.buy-btn:hover{

    background:#1d4ed8;

}

.buy-btn:active{

    transform:scale(.97);

}

/* ===========================
   BADGE
=========================== */

.badge{

    position:absolute;

    top:15px;

    left:15px;

    background:#ef4444;

    color:white;

    padding:6px 12px;

    border-radius:20px;

    font-size:13px;

    font-weight:bold;

}

/* ===========================
   LOADING
=========================== */

.loading{

    text-align:center;

    padding:80px;

    font-size:22px;

}

/* ===========================
   EMPTY
=========================== */

.empty{

    text-align:center;

    padding:80px;

    color:#94a3b8;

}

/* ===========================
   RESPONSIVE
=========================== */

@media(max-width:768px){

.shop-header h1{

font-size:34px;

}

.shop-header{

padding:50px 20px;

}

.product-grid{

padding:40px 20px;

grid-template-columns:1fr;

}

}
