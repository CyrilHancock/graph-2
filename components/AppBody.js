import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import data from '../data/data'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
function AppBody() {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const toDateRef = useRef('')
  const fromDateRef = useRef('')
  const [set, seSet] = useState(false)
  const [filterArrayAtSameDate, setFilterArrayAtSameDate] = useState(1)
  const [filterArrayAtOneDate, setFilterArrayAtOneDate] = useState(1)

  const [filterArrayAtSecondDate, setFilterArrayAtSecondDate] = useState(1)
  const [filterArrayAtThirdDate, setFilterArrayAtThirdDate] = useState(1)
  const [filterArrayAtFourthDate, setFilterArrayAtFourthDate] = useState(1)
  const [filterArrayAtFifthDate, setFilterArrayAtFifthDate] = useState(1)
  const [totalOrders, setTotalOrders] = useState()
  const getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt))
    }
    return arr
  }
  const get = () => {
    var dayList = getDaysArray(
      new Date(toDateRef.current.value),
      new Date(fromDateRef.current.value)
    )
    const filteredArray = dayList.map((v) =>
      data.filter((d) => d.item_date == v.toISOString().slice(0, 10))
    )
    const sameDay = filteredArray.map((d) =>
      d.filter((da) => da.schedule_time.charAt(9) == da.item_date.charAt(9))
    )
    const oneDayBefore = filteredArray.map((d) =>
      d.filter((da) => da.schedule_time.charAt(9) == da.item_date.charAt(9) - 1)
    )
    const twoDayBefore = filteredArray.map((d) =>
      d.filter((da) => da.schedule_time.charAt(9) == da.item_date.charAt(9) - 2)
    )
    const threeDayBefore = filteredArray.map((d) =>
      d.filter((da) => da.schedule_time.charAt(9) == da.item_date.charAt(9) - 3)
    )

    const fourDayBefore = filteredArray.map((d) =>
      d.filter((da) => da.schedule_time.charAt(9) == da.item_date.charAt(9) - 4)
    )

    const fiveDayBefore = filteredArray.map((d) =>
      d.filter((da) => da.schedule_time.charAt(9) == da.item_date.charAt(9) - 5)
    )
    setFilterArrayAtSameDate(
      sameDay.reduce((acc, element) => acc + element.length, 0)
    )
    setFilterArrayAtOneDate(
      oneDayBefore.reduce((acc, element) => acc + element.length, 0)
    )

    setFilterArrayAtSecondDate(
      twoDayBefore.reduce((acc, element) => acc + element.length, 0)
    )
    setFilterArrayAtThirdDate(
      threeDayBefore.reduce((acc, element) => acc + element.length, 0)
    )
    setFilterArrayAtFourthDate(
      fourDayBefore.reduce((acc, element) => acc + element.length, 0)
    )
    setFilterArrayAtFifthDate(
      fiveDayBefore.reduce((acc, element) => acc + element.length, 0)
    )
    seSet(true)
  }

  return (
    <div className="flex h-full w-full flex-col place-items-center m-10">
      <div className="flex h-fit w-fit flex-col  space-y-3 bg-purple-100 p-10 shadow-md">
        <input type="date" ref={toDateRef} />
        <input type="date" ref={fromDateRef} />
        <button onClick={get}>Get</button>
      </div>
      <div className="flex w-1/3 flex-col place-items-center mt-5">
        {set && (
         <>
          <p>All Values are in Percentage</p>
          <Pie
            data={{
              labels: [
                'Scheduled Same Day  ',
                'Scheduled One Day Before ',
                'Scheduled Two Day Before ',
                'Scheduled Three Day Before ',
                'Scheduled Four Day Before ',
                'Scheduled Five Day Before ',
              ],
              datasets: [
                {
                  label: 'Times Scheduled for Five Days',
                  data: [
                    ((filterArrayAtSameDate / (filterArrayAtSameDate +
                      filterArrayAtOneDate +
                      filterArrayAtSecondDate +
                      filterArrayAtThirdDate +
                      filterArrayAtFourthDate +
                      filterArrayAtFifthDate)) *
                      100).toPrecision(2),
                    ((filterArrayAtOneDate /( filterArrayAtSameDate +
                      filterArrayAtOneDate +
                      filterArrayAtSecondDate +
                      filterArrayAtThirdDate +
                      filterArrayAtFourthDate +
                      filterArrayAtFifthDate)) *
                      100).toPrecision(2),
                    ((filterArrayAtSecondDate /( filterArrayAtSameDate +
                      filterArrayAtOneDate +
                      filterArrayAtSecondDate +
                      filterArrayAtThirdDate +
                      filterArrayAtFourthDate +
                      filterArrayAtFifthDate) )*
                      100).toPrecision(2),
                    ((filterArrayAtThirdDate /( filterArrayAtSameDate +
                      filterArrayAtOneDate +
                      filterArrayAtSecondDate +
                      filterArrayAtThirdDate +
                      filterArrayAtFourthDate +
                      filterArrayAtFifthDate)) *
                      100).toPrecision(2),
                    ((filterArrayAtFourthDate / (filterArrayAtSameDate +
                      filterArrayAtOneDate +
                      filterArrayAtSecondDate +
                      filterArrayAtThirdDate +
                      filterArrayAtFourthDate +
                      filterArrayAtFifthDate) )*
                      100).toPrecision(2),
                    ((filterArrayAtFifthDate /( filterArrayAtSameDate +
                      filterArrayAtOneDate +
                      filterArrayAtSecondDate +
                      filterArrayAtThirdDate +
                      filterArrayAtFourthDate +
                      filterArrayAtFifthDate) )*
                      100).toPrecision(2),
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />

         
         </>        )}
      </div>
    </div>
  )
}

export default AppBody
