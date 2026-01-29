import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Login() {
    const [key, setKey] = useState("")
    const { login } = useContext(AuthContext)

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-semibold mb-2">Login via API Key</h3>
            <input
                className="input"
                placeholder="Enter API key"
                value={key}
                onChange={e => setKey(e.target.value)}
            />
            <button
                onClick={() => login(key)}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
                Login
            </button>
        </div>
    )
}
