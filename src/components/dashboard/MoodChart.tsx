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
      <div className="bg-white rounded-2xl shadow-lg border p-3 text-xs" style={{ borderColor: "#a8e8c4" }}>
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        <p style={{ color: "#3aA876" }} className="font-bold">Intensidad: {payload[0].value}/10</p>
        <p className="text-gray-500">{payload[0].payload.emocion}</p>
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
            <stop offset="5%" stopColor="#3aA876" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3aA876" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0faf4" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="intensidad"
          stroke="#3aA876"
          strokeWidth={2.5}
          fill="url(#colorIntensidad)"
          dot={{ fill: "#3aA876", r: 4, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, fill: "#D4AF37", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
