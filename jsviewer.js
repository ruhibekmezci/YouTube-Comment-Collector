/**
 * 1. Adım: Otomatik Kaydırma Fonksiyonu
 * Bu fonksiyon, yeni yorum yüklenmeyene kadar sayfanın en altına kaydırmaya devam eder.
 * Bir Promise döndürür, böylece kaydırma bittiğinde haberimiz olur.
 */
async function otomatikKaydir() {
	console.log("Tüm yorumları yüklemek için sayfa sonuna kaydırılıyor...");
	console.log("Bu işlem yorum sayısına bağlı olarak uzun sürebilir. Lütfen bekleyin...");

	return new Promise((resolve) => {
		let sonYukseklik = -1;
		let denemeSayaci = 0;
		const maksDeneme = 10; // 10 kez (10 * 200ms = 2 saniye) yükseklik değişmezse dur.

		let timer = setInterval(() => {
			// Sayfanın en altına kaydır
			window.scrollTo(0, document.documentElement.scrollHeight);

			let yeniYukseklik = document.documentElement.scrollHeight;

			if (yeniYukseklik === sonYukseklik) {
				// Yükseklik değişmedi, sona yaklaşmış olabiliriz
				denemeSayaci++;
			} else {
				// Yükseklik değişti, yeni yorumlar yüklendi, sayacı sıfırla
				denemeSayaci = 0;
			}

			if (denemeSayaci >= maksDeneme) {
				// Yeterince denedik ve sayfa büyümedi, tüm yorumlar yüklendi.
				clearInterval(timer);
				console.log("Tüm yorumlar başarıyla yüklendi.");
				resolve();
			}

			// Bir sonraki kontrol için mevcut yüksekliği kaydet
			sonYukseklik = yeniYukseklik;

		}, 200); // 200 milisaniyede bir kontrol et
	});
}

/**
 * 2. Adım: Yorumları Toplama Fonksiyonu
 * Sayfadaki tüm yorum elementlerini bulur ve bir dizi (array) olarak listeler.
 */
function yorumlariTopla() {
	console.log("Yorumlar toplanıyor...");

	// Tüm yorum "bloğu" elementlerini seçiyoruz
	// YouTube'un kullandığı HTML yapısı budur: ytd-comment-thread-renderer
	let yorumElementleri = document.querySelectorAll('ytd-comment-thread-renderer');

	let yorumListesi = [];

	// Her bir yorum bloğu üzerinde dönüyoruz
	yorumElementleri.forEach((element) => {
		// Yazarın adını ve linkini bul
		let yazarElementi = element.querySelector('#author-text');

		// Yorumun metnini bul
		let yorumElementi = element.querySelector('#content-text');

		// Yanıtları (reply) hariç tutmak için sadece ana yorumları alıyoruz.
		// Bazen sildiğimiz veya gizlediğimiz elementler 'null' gelebilir,
		// bu yüzden ikisinin de var olduğunu kontrol ediyoruz.
		if (yazarElementi && yorumElementi) {
			yorumListesi.push({
				yazar: yazarElementi.innerText.trim(),
				yorum: yorumElementi.innerText.trim()
			});
		}
	});

	return yorumListesi;
}

/**
 * 3. Adım: Ana İşlevi Başlatma
 * Önce kaydırma işlemini (async) bekler, bittiğinde toplama işlemini çalıştırır.
 */
async function baslat() {
	try {
		// 1. Adımı çalıştır ve bitmesini bekle
		await otomatikKaydir();

		// 2. Adımı çalıştır
		let tumYorumlar = yorumlariTopla();

		console.log(`-----------------------------------`);
		console.log(`Toplam ${tumYorumlar.length} adet yorum bulundu!`);
		console.log(`-----------------------------------`);

		// Yorumları konsola düz bir liste olarak yazdır
		console.log(tumYorumlar);

		// Yorumları daha okunaklı bir tablo olarak konsola yazdır
		console.table(tumYorumlar);

	} catch (hata) {
		console.error("Yorumlar çekilirken bir hata oluştu:", hata);
	}
}

// Tüm süreci başlat
baslat();