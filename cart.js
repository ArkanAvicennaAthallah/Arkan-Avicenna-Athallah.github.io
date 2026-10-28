/* =====================================
   REPTILIA - SISTEM KERANJANG
   ===================================== */

const CART_KEY = "reptilia_cart";

function ambilKeranjang() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function simpanKeranjang(keranjang) {
    localStorage.setItem(CART_KEY, JSON.stringify(keranjang));
}

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

/* TAMBAHKAN PRODUK */
function tambahKeKeranjang(id, nama, harga) {
    const keranjang = ambilKeranjang();
    const produk = keranjang.find(item => item.id === id);

    if (produk) {
        produk.jumlah += 1;
    } else {
        keranjang.push({
            id: id,
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    simpanKeranjang(keranjang);
    alert(nama + " berhasil ditambahkan ke keranjang!");
}

/* TOMBOL TAMBAH PADA HALAMAN PRODUK */
document.querySelectorAll(".add-to-cart").forEach(tombol => {
    tombol.addEventListener("click", () => {
        tambahKeKeranjang(
            tombol.dataset.id,
            tombol.dataset.name,
            Number(tombol.dataset.price)
        );
    });
});

/* TAMPILKAN ISI KERANJANG */
function tampilkanKeranjang() {
    const wadah = document.getElementById("cart-items");
    const totalElemen = document.getElementById("cart-total");
    const jumlahElemen = document.getElementById("cart-count");

    if (!wadah) return;

    const keranjang = ambilKeranjang();
    wadah.innerHTML = "";

    let total = 0;
    let jumlahBarang = 0;

    if (keranjang.length === 0) {
        wadah.innerHTML =
            '<p class="cart-empty">Keranjang kamu masih kosong.</p>';
    }

    keranjang.forEach(produk => {
        const subtotal = produk.harga * produk.jumlah;

        total += subtotal;
        jumlahBarang += produk.jumlah;

        const item = document.createElement("div");
        item.className = "cart-item";

        const nama = document.createElement("h3");
        nama.textContent = produk.nama;

        const harga = document.createElement("p");
        harga.textContent = "Harga: " + formatRupiah(produk.harga);

        const subtotalText = document.createElement("p");
        subtotalText.textContent = "Subtotal: " + formatRupiah(subtotal);

        const kontrol = document.createElement("div");
        kontrol.className = "cart-controls";

        const kurang = document.createElement("button");
        kurang.textContent = "−";
        kurang.setAttribute("aria-label", "Kurangi jumlah " + produk.nama);
        kurang.addEventListener("click", () => ubahJumlah(produk.id, -1));

        const jumlah = document.createElement("span");
        jumlah.textContent = produk.jumlah;

        const tambah = document.createElement("button");
        tambah.textContent = "+";
        tambah.setAttribute("aria-label", "Tambah jumlah " + produk.nama);
        tambah.addEventListener("click", () => ubahJumlah(produk.id, 1));

        const hapus = document.createElement("button");
        hapus.textContent = "Hapus";
        hapus.addEventListener("click", () => hapusProduk(produk.id));

        kontrol.append(kurang, jumlah, tambah, hapus);
        item.append(nama, harga, subtotalText, kontrol);
        wadah.appendChild(item);
    });

    if (totalElemen) {
        totalElemen.textContent = formatRupiah(total);
    }

    if (jumlahElemen) {
        jumlahElemen.textContent = jumlahBarang;
    }
}

/* UBAH JUMLAH PRODUK */
function ubahJumlah(id, perubahan) {
    const keranjang = ambilKeranjang();
    const produk = keranjang.find(item => item.id === id);

    if (!produk) return;

    produk.jumlah += perubahan;

    const hasil = keranjang.filter(item => item.jumlah > 0);
    simpanKeranjang(hasil);
    tampilkanKeranjang();
}

/* HAPUS PRODUK */
function hapusProduk(id) {
    const keranjang = ambilKeranjang()
        .filter(item => item.id !== id);

    simpanKeranjang(keranjang);
    tampilkanKeranjang();
}

/* JALANKAN SAAT HALAMAN SIAP */
document.addEventListener("DOMContentLoaded", tampilkanKeranjang);
