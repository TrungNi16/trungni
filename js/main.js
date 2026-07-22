// Hiệu ứng xuất hiện khi cuộn
const cards = document.querySelectorAll('.card, .product-card, .market-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});

// Thông báo demo
console.log('🎮 TrungNi Shop V1 đã khởi động thành công!');
