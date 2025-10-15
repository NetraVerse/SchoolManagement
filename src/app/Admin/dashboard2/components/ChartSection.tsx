"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const mode = [
  { id: 1, name: "Attendence" },
  { id: 2, name: "Revenue" },
  { id: 3, name: "Income" },
];
const time = [
  { id: 1, name: "Today" },
  { id: 2, name: "This week" },
  { id: 3, name: "This Month" },
  { id: 4, name: "This Year" },
];
export default function ChartsSection() {
  const [selectedMode, setSelectedMode] = useState(mode[0]);
  const [selectedTime, setSelectedTime] = useState(time[0]);
  return (
    <div className="mt-6 flex flex-col lg:flex-row  pb-5">
      <div className="w-full lg:flex-2 bg-background text-text rounded-lg shadow-md p-4 border border-green-700  h-90">
        <Listbox value={selectedMode} onChange={setSelectedMode}>
          <ListboxButton className="float-left ml-4 border-1 border-green-700 pl-2 pr-2 rounded text-green-700 font-normal text-sm focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
            {selectedMode.name}
            <ChevronDown className="group pointer-events-none pl-2 size-4 fill-white/60" />
          </ListboxButton>
          <ListboxOptions anchor="bottom" className="mt-5 shadow-xl">
            {mode.map((mode) => (
              <ListboxOption
                key={mode.id}
                value={mode}
                className="data-focus:bg-green-600/30 pl-2 pr-2 shadow-2xl   text-text text-sm p-1 ml-3 mr-4"
              >
                {mode.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
        <span className="m-5">Chart</span>
        <Listbox value={selectedTime} onChange={setSelectedTime}>
          <ListboxButton className="float-right mr-4 border-1 border-green-700 pl-2 pr-2 rounded text-green-700 font-normal text-sm focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
            {selectedTime.name}
            <ChevronDown className="group pointer-events-none pl-2 size-4 fill-white/60" />
          </ListboxButton>
          <ListboxOptions anchor="bottom" className="mt-5 shadow-xl">
            {time.map((time) => (
              <ListboxOption
                key={time.id}
                value={time}
                className="data-focus:bg-green-600/30 pl-2 pr-2 shadow-2xl   text-text text-sm p-1 ml-3 mr-4"
              >
                {time.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>

      <div className="flex flex-col mt-4 justify-center items-center w-full lg:flex-1 gap-4">
        <div className=" w-2/3 h-32 sm:h-40 bg-background text-text rounded-lg shadow-md p-5 border border-green-700">
          pie-chart 1
        </div>
        <div className="bg-background text-text rounded-lg shadow-md  border border-green-700 p-5 w-2/3 h-32 sm:h-40">
          pie-chart 2
        </div>
      </div>
    </div>
  );
}
