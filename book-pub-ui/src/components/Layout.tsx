import type { ReactNode } from "react"
import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Layout({ children }: { children: ReactNode }) {
    const { user, logout } = useContext(AuthContext)
    const { pathname } = useLocation()

    const nav = "px-3 py-1 rounded"
    const active = "bg-white text-indigo-600"

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <span className="font-bold text-xl">Book Dashboard</span>
                    <Link to="/" className={`${nav} ${pathname === "/" && active}`}>Home</Link>
                    {user?.role === "admin" && (
                        <Link to="/audits" className={`${nav} ${pathname === "/audits" && active}`}>
                            Audit Logs
                        </Link>
                    )}
                </div>

                {user && (
                    <div className="flex gap-3 text-sm items-center">
                        <span>{user.name} ({user.role})</span>
                        <button onClick={logout} className="bg-white text-indigo-600 px-2 py-1 rounded">
                            Logout
                        </button>
                    </div>
                )}
            </header>

            <main className="p-6 max-w-5xl mx-auto">{children}</main>
        </div>
    )
}
