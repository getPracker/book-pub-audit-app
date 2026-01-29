import { createContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { api, setApiKey } from "../api/api"

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedKey = localStorage.getItem("apiKey")
        if (!storedKey) {
            setLoading(false)
            return
        }

        setApiKey(storedKey)

        api.get("/me")
            .then(res => setUser(res.data))
            .catch(() => localStorage.removeItem("apiKey"))
            .finally(() => setLoading(false))
    }, [])

    const login = async (key: string) => {
        setApiKey(key)
        const res = await api.get("/me")
        localStorage.setItem("apiKey", key) 
        setUser(res.data)
    }

    const logout = () => {
        localStorage.removeItem("apiKey")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
