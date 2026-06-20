// Turing Machine approach to pattern matching
class TuringDetector {
    constructor() {
        this.currentState = 'start';
        this.states = {
            'start': { 
                's': 's1', 'g': 'g1', 'j': 'j1', 'm': 'm1', 
                'c': 'c1', 'r': 'r1', 'd': 'd1' 
            },
            's1': { 'l': 's2', 's': 'sc1' }, 's2': { 'o': 's3' }, 's3': { 't': 'q_match' },
            'g1': { 'a': 'g2' }, 'g2': { 'c': 'g3' }, 'g3': { 'o': 'g4' }, 'g4': { 'r': 'q_match' },
            'j1': { 'a': 'j2' }, 'j2': { 'c': 'j3' }, 'j3': { 'k': 'j4' }, 'j4': { 'p': 'j5' }, 'j5': { 'o': 'j6' }, 'j6': { 't': 'q_match' },
            'm1': { 'a': 'm2' }, 'm2': { 'x': 'm3' }, 'm3': { 'w': 'm4' }, 'm4': { 'i': 'm5' }, 'm5': { 'n': 'q_match' },
            'sc1': { 'c': 'sc2' }, 'sc2': { 'a': 'sc3' }, 'sc3': { 't': 'sc4' }, 'sc4': { 't': 'sc5' }, 'sc5': { 'e': 'sc6' }, 'sc6': { 'r': 'q_match' },
            'c1': { 'a': 'c2' }, 'c2': { 's': 'c3' }, 'c3': { 'i': 'c4' }, 'c4': { 'n': 'c5' }, 'c5': { 'o': 'q_match' },
            'r1': { 't': 'r2' }, 'r2': { 'p': 'q_match' },
            'd1': { 'e': 'd2' }, 'd2': { 'p': 'd3' }, 'd3': { 'o': 'd4' }, 'd4': { 's': 'd5' }, 'd5': { 'i': 'd6' }, 'd6': { 't': 'q_match' }
        };
    }
    process(text) {
        for (let char of text.toLowerCase()) {
            if (this.states[this.currentState] && this.states[this.currentState][char]) {
                this.currentState = this.states[this.currentState][char];
            } else {
                this.currentState = this.states['start'][char] ? this.states['start'][char] : 'start';
            }
            if (this.currentState === 'q_match') return true;
        }
        return false;
    }
}

const detector = new TuringDetector();

chrome.storage.local.get(['paused'], (result) => {
    if (result.paused) return;

    const isJudol = detector.process(document.body.innerText);
    
    if (isJudol) {
        // Hapus semua isi halaman dan ganti dengan peringatan merah
        document.body.innerHTML = `
            <div style="position:fixed; top:0; left:0; width:100vw; height:100vh; background-color:red; color:white; z-index:2147483647; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family: sans-serif; text-align: center;">
                <h1 style="font-size: 3rem;">⚠ PERINGATAN!</h1>
                <p style="font-size: 1.5rem;">Web ini terindikasi JUDOL (Judi Online).</p>
            </div>
        `;
        
    }
});
