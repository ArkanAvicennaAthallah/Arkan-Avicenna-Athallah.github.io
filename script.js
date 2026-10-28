const frame = document.querySelector("iframe");

function sesuaikanTinggiFrame() {
    if (!frame.contentWindow) return;

    const doc = frame.contentWindow.document;

    if (!doc || !doc.body) return;

    const tinggi = Math.max(
        doc.documentElement.scrollHeight,
        doc.body.scrollHeight,
        doc.documentElement.offsetHeight,
        doc.body.offsetHeight
    );

    frame.style.height = tinggi + "px";
}

frame.addEventListener("load", () => {
    sesuaikanTinggiFrame();

    setTimeout(sesuaikanTinggiFrame, 300);
    setTimeout(sesuaikanTinggiFrame, 1000);
});

window.addEventListener("resize", sesuaikanTinggiFrame);







<script>
    const filterButtons = document.querySelectorAll(
        ".category-menu a[data-filter]"
    );

    const products = document.querySelectorAll(".shop-product");

    filterButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();

            const selectedCategory = button.dataset.filter;

            // Atur tampilan tombol yang aktif
            filterButtons.forEach(function(item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            // Saring produk berdasarkan kategori
            products.forEach(function(product) {
                const productCategory = product.dataset.category;

                if (
                    selectedCategory === "semua" ||
                    productCategory === selectedCategory
                ) {
                    product.hidden = false;
                } else {
                    product.hidden = true;
                }
            });
        });
    });
</script>
</body>
</html>
