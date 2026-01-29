import { useEffect, useState } from "react"
import { api } from "../api/api"
import EditModal from "./EditModal"

export default function BookList() {
    const [books, setBooks] = useState<any[]>([])
    const [cursor, setCursor] = useState<string | null>(null)
    const [editing, setEditing] = useState<any | null>(null)

    const load = async (reset = false) => {
        const res = await api.get("/books", {
            params: { limit: 5, cursor: reset ? undefined : cursor },
        })
        setBooks(reset ? res.data.items : [...books, ...res.data.items])
        setCursor(res.data.nextCursor)
    }

    const remove = async (id: string) => {
        await api.delete(`/books/${id}`)
        load(true)
    }

    useEffect(() => { load(true) }, [])

    return (
        <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="font-semibold mb-3">Books</h2>

            {books.map(b => (
                <div key={b.id} className="border-b py-3 flex justify-between items-center">
                    <div>
                        <div className="font-medium">{b.title}</div>
                        <div className="text-sm text-gray-500">{b.authors}</div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setEditing(b)}
                            className="text-blue-600 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => remove(b.id)}
                            className="text-red-600 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {cursor && (
                <button
                    onClick={() => load()}
                    className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded"
                >
                    Load More
                </button>
            )}

            {editing && (
                <EditModal book={editing} close={() => setEditing(null)} reload={() => load(true)} />
            )}
        </div>
    )
}
