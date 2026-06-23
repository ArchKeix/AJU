class TuringDetector {
    constructor(inputString) {
        this.tape = inputString.toLowerCase().split('');
        this.head = 0;
        this.state = 'q0';
        this.foundKeywords = new Set();
        this.keywords = {
            'gacor': ['g', 'a', 'c', 'o', 'r'],
            'slot': ['s', 'l', 'o', 't'],
            'judi': ['j', 'u', 'd', 'i'],
            'rtp': ['r', 't', 'p'],
            'maxwin': ['m', 'a', 'x', 'w', 'i', 'n'],
            'togel': ['t', 'o', 'g', 'e', 'l'],
            'casino': ['c', 'a', 's', 'i', 'n', 'o'],
            'jackpot': ['j', 'a', 'c', 'k', 'p', 'o', 't'],
            'slot88': ['s', 'l', 'o', 't', '8', '8'],
            'slot777': ['s', 'l', 'o', 't', '7', '7', '7'],
            'perjudian': ['p', 'e', 'r', 'j', 'u', 'd', 'i', 'a', 'n'],
            'taruhan': ['t', 'a', 'r', 'u', 'h', 'a', 'n'],
            'bandar': ['b', 'a', 'n', 'd', 'a', 'r'],
        };
    }

    // Mesin Turing untuk mencari kata (Simplified pattern recognition)
    run() {
        while (this.head < this.tape.length) {
            let char = this.tape[this.head];

            // Cek setiap keyword
            for (let [word, chars] of Object.entries(this.keywords)) {
                if (char === chars[0]) {
                    let tempHead = this.head;
                    let match = true;
                    for (let i = 0; i < chars.length; i++) {
                        if (this.tape[tempHead + i] !== chars[i]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        this.foundKeywords.add(word);
                        // Operasi overwrite tape (tanda sudah terdeteksi)
                        for (let i = 0; i < chars.length; i++) {
                            this.tape[this.head + i] = 'X';
                        }
                    }
                }
            }
            // Gerakan Head (R)
            this.head++;
        }
        return this.foundKeywords.size >= 4;
    }
}

chrome.storage.local.get(['paused'], (result) => {
    if (result.paused) return;

    const machine = new TuringDetector(document.body.innerText);
    const isJudol = machine.run();
    
    if (isJudol) {
        // Hapus seluruh konten dan ganti dengan layar merah peringatan
        document.body.innerHTML = `
            <div style="position:fixed; top:0; left:0; width:100vw; height:100vh; background-color:red; color:white; z-index:2147483647; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family: sans-serif; text-align: center; padding: 20px;">
                <h1 style="font-size: 4rem; margin-bottom: 20px;">⚠ PERINGATAN</h1>
                <p style="font-size: 2rem;">Situs ini terindikasi mengandung konten Judi Online.</p>
                <p style="font-size: 1.2rem;">Akses telah diblokir demi keamanan Anda.</p>
            </div>
        `;
    }
});
