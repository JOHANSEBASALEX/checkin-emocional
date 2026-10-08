"use client"

import { useState } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface DataPoint {
  fecha: string
  intensidad: number
  emocion: string
}

interface Props {
  data7: DataPoint[]
  data30: DataPoint[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload: DataPoint }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border p-3 text-xs" style={{ borderColor: "#E8D4C4" }}>
        <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>{label}</p>
        <p className="font-bold" style={{ color: "#B07060" }}>Intensidad: {payload[0].value}/10</p>
        <p style={{ color: "#9A7080" }}>{payload[0].payload.emocion}</p>
      </div>
    )
  }
  return null
}

export function MoodChart({ data7, data30 }: Props) {
  const [rango, setRango] = useState<"7" | "30">("7")
  const data = rango === "7" ? data7 : data30

  const formatted = data.map(d => ({
    ...d,
    label: format(parseISO(d.fecha), rango === "7" ? "EEE d" : "d MMM", { locale: es }),
  }))

  const botones: Array<{ valor: "7" | "30"; texto: string }> = [
    { valor: "7", texto: "7 días" },
    { valor: "30", texto: "Mes" },
  ]

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {botones.map(b => (
          <button
            key={b.valor}
            type="button"
            onClick={() => setRango(b.valor)}
            className="text-xs font-semibold px-4 py-1.5 rounded-full"
            style={{
              background: rango === b.valor ? "linear-gradient(135deg,#D4A898,#B07060)" : "#F5EDE4",
              color: rango === b.valor ? "#FFFFFF" : "#9A7080",
            }}
          >
            {b.texto}
          </button>
        ))}
      </div>

      {formatted.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: "#9A7080" }}>
          Aún no hay check-ins en este período. Haz uno hoy para ver tu curva.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={formatted} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIntensidad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B07060" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#B07060" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE4" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9A7080" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#9A7080" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="intensidad"
              stroke="#B07060"
              strokeWidth={2.5}
              fill="url(#colorIntensidad)"
              dot={{ fill: "#B07060", r: 6, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, fill: "#C9A84C", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {formatted.length === 1 && (
        <p className="text-xs text-center mt-2" style={{ color: "#9A7080" }}>
          Con un día más de check-in verás tu línea de comportamiento 🌸
        </p>
      )}
    </div>
  )
}