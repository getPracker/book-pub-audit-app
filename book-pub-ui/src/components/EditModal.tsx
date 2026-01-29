import { useState } from "react"
import { api } from "../api/api"

export default function EditModal({ book, close, reload }: any) {
    const [title, setTitle] = useState(book.title)
    const [authors, setAuthors] = useState(book.authors)
    const [publishedBy, setPublishedBy] = useState(book.publishedBy)

    const save = async () => {
        await api.put(`/books/${book.id}`, { title, authors, publishedBy })
        reload()
        close()
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-96">
                <h3 className="font-semibold mb-3">Edit Book</h3>

                <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
                <input className="input" value={authors} onChange={e => setAuthors(e.target.value)} />
                <input className="input" value={publishedBy} onChange={e => setPublishedBy(e.target.value)} />

                <div className="flex justify-end gap-2 mt-3">
                    <button onClick={close} className="px-3 py-1 border rounded">Cancel</button>
                    <button onClick={save} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                </div>
            </div>
        </div>
    )
}
