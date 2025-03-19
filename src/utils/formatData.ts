export const makeupTime = (time: string) => {
    if (time.length == 1) {
        return `0${time}`
    } else {
        return time
    }
}