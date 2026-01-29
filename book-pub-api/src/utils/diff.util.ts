export function generateDiff(
    before: any,
    after: any,
    exclude: string[] = []
) {
    const diff: Record<string, { before: any; after: any }> = {}

    const keys = new Set([
        ...Object.keys(before || {}),
        ...Object.keys(after || {}),
    ])

    for (const key of keys) {
        if (exclude.includes(key)) continue  // Only true excludes

        const b = before?.[key]
        const a = after?.[key]

        if (JSON.stringify(b) !== JSON.stringify(a)) {
            diff[key] = { before: b, after: a }
        }
    }

    return diff
}
