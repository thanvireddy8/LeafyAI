import { calcMacroPercent } from '../../utils/helpers'

const COLORS = {
  calories: '#1D9E75',
  protein:  '#378ADD',
  carbs:    '#EF9F27',
  fat:      '#D4537E',
  fiber:    '#5DCAA5',
  iron:     '#D85A30',
  calcium:  '#7F77DD',
}

export default function MacroBar({ label, consumed, goal, unit = 'g', colorKey }) {
  const pct = calcMacroPercent(consumed, goal)
  const color = COLORS[colorKey] || COLORS.calories
  const isOver = consumed > goal

  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-gray-500 w-16 flex-shrink-0">{label}</p>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: isOver ? '#E24B4A' : color }}
        />
      </div>
      <p className="text-xs text-gray-500 w-20 text-right flex-shrink-0">
        <span className="font-medium text-gray-800">{consumed}</span>
        {' / '}{goal}{unit}
      </p>
    </div>
  )
}
