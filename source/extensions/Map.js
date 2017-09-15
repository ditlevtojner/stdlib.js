export function merge(map1, map2) {
    for (let [key, value] of map2.entries()) {
        map1.set(key, value)
    }
    return map1
}

// const map1 = Map([
//     ['key', {value:"1"}]
// ])
// const map2 = Map([
//     ['key', {another:"value"}]
// ])
// deepMerge(map1, map2) = Map([
//     ['key', {another:"value",value:"1"}]
// ])
export function deepMerge(map1, map2) {

    for (let [key, value] of map2.entries()) {
        if (map1.has(key)) {
            map1.set(key, Object.assign(map1.get(key), value))
            continue
        }
        map1.set(key, value)
    }
    return map1
}
// For stringifying nested maps
export function toObject(m) {
    let o = {}

    for (let [k, v] of m.entries()) {
        if (v instanceof Map) {
            o[k] = toObject(v)
        }
        else {
            o[k] = v
        }
    }

    return o
}
// For turning a stringified map back
export function arrOfOToMap(arrOfO, key) {
    return arrOfO.reduce((acc, o) => acc.set(o[key], o), new Map())
}