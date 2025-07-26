const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(), // menyimpan sesi login
    puppeteer: {
        headless: false, // kalau true, browsernya ga kelihatan
        args: ['--no-sandbox']
    }
});

// Tampilkan QR code di terminal
client.on('qr', (qr) => {
    console.log('Scan QR ini untuk login WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');

    // Daftar nomor tujuan (format internasional, tanpa 0 di depan)
    const nomorTujuan = [
        "NO WA",
    ].map((e) => e.replaceAll("+", ""));

    const pesan = 
`Hai Kak,
Perkenalkan, saya Alif HR dari Awan Digitals. Terima kasih sudah apply lamaran untuk posisi Volunteer - UI/UX Designer di Awan Digitals melalui LinkedIn.
Kami ingin mengajak kakak untuk mengikuti sesi interview agar kami bisa mengenal kakak lebih jauh dan membahas peran yang kakak lamar.

Untuk memilih jadwal interview yang paling cocok buat kakak, silakan isi formulir di link berikut ini:
🔗 LINK

Mohon lengkapi, agar kami bisa segera mengatur jadwal sesuai pilihan kakak 😊
Kalau ada pertanyaan, jangan ragu untuk menghubungi kami.
Terima kasih dan sampai jumpa di sesi interview!


Salam hangat,
HR Awan Digitals`;

    for (const nomor of nomorTujuan) {
        const chatId = nomor + '@c.us';
        try {
            await client.sendMessage(chatId, pesan);
            console.log(`Pesan terkirim ke ${nomor}`);
        } catch (err) {
            console.error(`Gagal kirim ke ${nomor}:`, err);
        }
        await new Promise(resolve => setTimeout(resolve, 30000));
    }
});

client.initialize();
