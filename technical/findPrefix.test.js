const findPrefix = require('./findPrefix')

describe('findPrefix', () => {
    it('should returns the common prefix correctly', () => {
        expect(findPrefix(["a", "b"])).toBe("");
        expect(findPrefix(["c", "c"])).toBe("c");
        expect(findPrefix(["prefix", "pre"])).toBe("pre");
        expect(findPrefix(["pre", "prefix"])).toBe("pre");
        expect(findPrefix(["onlyoneprefix"])).toBe("onlyoneprefix");
        expect(findPrefix(["flower", "flow", "flight"])).toBe("fl");
        expect(findPrefix(["dog", "racecar", "car"])).toBe("");
        expect(findPrefix(["interview", "interrupt", "integrate"])).toBe("inte");
        expect(findPrefix(["interspecies", "interstellar", "interstate"])).toBe("inters");
        expect(findPrefix(["throne", "throne"])).toBe("throne");
        expect(findPrefix(["abc", "ab", "abcd"])).toBe("ab");
    });

    it('should handles empty array correctly', () => {
        expect(findPrefix(["", "", ""])).toBe("");
        expect(findPrefix(["", "", "a"])).toBe("");
        expect(findPrefix([])).toBe("");
    })
    
    it('should handles large array with 200 items correctly', () => {
        const array = Array.from({ length: 200 }, (_, i) => `prefix_${i}`);
        
        const expectedPrefix = 'prefix_';
    
        expect(findPrefix(array)).toBe(expectedPrefix);
    });
})
