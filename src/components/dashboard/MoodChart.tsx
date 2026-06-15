"use client"

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
  data: DataPoint[]
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

export function MoodChart({ data }: Props) {
  if (!data.length) return null

  const formatted = data.map(d => ({
    ...d,
    label: format(parseISO(d.fecha), "EEE d", { locale: es }),
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={formatted} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorIntensidad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#B07060" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#B07060" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE4" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9A7080" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#9A7080" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="intensidad"
          stroke="#B07060"
          strokeWidth={2.5}
          fill="url(#colorIntensidad)"
          dot={{ fill: "#B07060", r: 4, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, fill: "#C9A84C", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}