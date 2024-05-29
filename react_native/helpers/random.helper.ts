export function getRandomItems<T = any>(arr: T[], length: number) {
    const shuffled = arr.slice();

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }

    return shuffled.slice(0, length);
}

export default { getRandomItems }