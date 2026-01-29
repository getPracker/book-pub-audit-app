import { useState } from "react"
import { api } from "../api/api"

export default function BookForm() {
    const [title, setTitle] = useState("")
    const [authors, setAuthors] = useState("")
    const [publishedBy, setPublishedBy] = useState("")

    const submit = async () => {
        await api.post("/books", { title, authors, publishedBy })
        alert("Created!")
    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Create Book</h3>
            <input className="input" placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <input className="input" placeholder="Authors" onChange={e => setAuthors(e.target.value)} />
            <input className="input" placeholder="Publisher" onChange={e => setPublishedBy(e.target.value)} />
            <button onClick={submit} className="bg-green-600 text-white px-3 py-1 rounded mt-2">
                Create
            </button>
        </div>
    )
}
