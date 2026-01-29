import { useEffect, useState } from "react"
import { api } from "../api/api"

export default function AuditList({ filters }: { filters?: any }) {
  const [audits, setAudits] = useState<any[]>([])

  useEffect(() => {
    api.get("/audits", {
      params: { limit: 10, ...filters }
    }).then(res => setAudits(res.data.items))
  }, [filters])

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="font-semibold mb-4">Audit Logs</h2>

      <div className="space-y-4">
        {audits.map(a => (
          <div key={a.id} className="border rounded p-3 bg-gray-50">

            {/* Header */}
            <div className="flex justify-between text-sm">
              <div>
                <span className="font-medium">{a.entity}</span>{" "}
                <span className="text-gray-500">({a.entityId})</span>
              </div>
              <div className="text-gray-500">
                {new Date(a.timestamp).toLocaleString()}
              </div>
            </div>

            {/* Action + Actor */}
            <div className="text-sm mt-1">
              <span className="capitalize font-semibold text-indigo-600">
                {a.action}
              </span>{" "}
              by <span className="font-medium">{a.actor?.name || a.actorId}</span>
            </div>

            {/* Diff */}
            <div className="mt-2 text-xs bg-white border rounded p-2">
              {Object.entries(a.diff || {}).map(([field, change]: any) => (
                <div key={field} className="flex justify-between py-1 border-b last:border-b-0">
                  <div className="font-medium">{field}</div>
                  <div className="flex gap-4">
                    <span className="text-red-500 line-through">
                      {JSON.stringify(change.before)}
                    </span>
                    <span className="text-green-600">
                      {JSON.stringify(change.after)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
