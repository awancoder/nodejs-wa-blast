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
        "6285183274639",
	"6285183274639"
    ];

    const pesan = 'Halo! Ini pesan otomatis dari Node.js 😄';

    for (const nomor of nomorTujuan) {
        const chatId = nomor + '@c.us';
        try {
            await client.sendMessage(chatId, pesan);
            console.log(`Pesan terkirim ke ${nomor}`);
        } catch (err) {
            console.error(`Gagal kirim ke ${nomor}:`, err);
        }
    }
});

client.initialize();
