/**
 * 
 * @param {Array<string>} strs 
 * @returns {string}
 */
function findPrefix(strs) {
    if (strs.length === 0) return '';

    let prefix = strs[0]

    for (let i=1; i<strs.length; i++) {
        const text = strs[i]
        while (!text.startsWith(prefix)) {
            prefix = prefix.substring(0, prefix.length - 1)
            if (!prefix) return ''
        }
    }

    return prefix
}

module.exports = findPrefix