import { useState } from "react"
import AuditList from "../components/AuditList"
import { useDebounce } from "../hooks/useDebounce"

type AuditFilters = {
    entity?: string
    entityId?: string
    actorId?: string
    action?: string
    from?: string
    to?: string
}

export default function AuditsPage() {
    const [filters, setFilters] = useState<AuditFilters>({})

    const debouncedFilters = useDebounce(filters, 500)

    const update = (key: keyof AuditFilters, value: string) => {
        setFilters((f: AuditFilters) => ({
            ...f,
            [key]: value || undefined
        }))
    }


    const reset = () => setFilters({})

    return (
        <>
            <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-3 gap-3">
                <input
                    className="input"
                    placeholder="Entity (Book/User)"
                    onChange={e => update("entity", e.target.value)}
                />

                <input
                    className="input"
                    placeholder="Entity ID"
                    onChange={e => update("entityId", e.target.value)}
                />

                <input
                    className="input"
                    placeholder="Actor ID"
                    onChange={e => update("actorId", e.target.value)}
                />

                <select
                    className="input"
                    onChange={e => update("action", e.target.value)}
                >
                    <option value="">Action</option>
                    <option value="create">Create</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                    <option value="restore">Restore</option>
                    <option value="login">Login</option>
                </select>

                <input
                    type="date"
                    className="input"
                    onChange={e => update("from", e.target.value)}
                />

                <input
                    type="date"
                    className="input"
                    onChange={e => update("to", e.target.value)}
                />

                <button
                    onClick={reset}
                    className="col-span-3 bg-gray-200 rounded py-2 mt-2"
                >
                    Reset Filters
                </button>
            </div>

            <AuditList filters={debouncedFilters} />
        </>
    )
}
