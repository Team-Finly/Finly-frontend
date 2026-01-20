export const WeeklyMood = () => {
  return (
    <div>
      <section className="mt-[11px]">
        <h3 className="font-semibold text-[17px] mb-[16px]">위클리 무드</h3>
        <div className="flex justify-between bg-white p-4 rounded-xl shadow-[#DFE2E81A] shadow-sm">
          {['월', '화', '수', '목', '금'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center ${i === 0 ? 'bg-yellow-50 border-yellow-200' : 'border-dashed border-gray-200'}`}>
                {i === 0 ? <span className="text-xl">😓</span> : null}
              </div>
              <span className="text-xs text-gray-400">{day}</span>
            </div>
          ))}
          <button className="w-12 h-12 rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center text-blue-400 text-2xl">+</button>
        </div>
      </section>
    </div>
  )
}
