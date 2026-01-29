export function omitUndefined<T extends Record<string, any>>(obj: T) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined)
    ) as { [K in keyof T as T[K] extends undefined ? never : K]: Exclude<T[K], undefined> }
}
