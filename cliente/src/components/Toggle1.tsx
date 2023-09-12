
import { HiOutlineViewList as ListView} from 'react-icons/Hi';

interface ToggleProps{
    checked: boolean;
    onClick: () => void;
}

export function Toggle1({checked,onClick}:ToggleProps) {
    
  return (
    <div className="inline-flex items-center">
    <div className="relative inline-block h-4 w-9 cursor-pointer rounded-full">
        <input
        id="auto-update"
        type="checkbox"
        className="peer absolute h-4 w-9 
                   cursor-pointer appearance-none
                   rounded-full bg-cyan-950
                   transition-colors duration-300
                    checked:bg-gray-500
                    peer-checked:border-gray-500
                    peer-checked:before:bg-gray-500"
                    defaultChecked= {checked}
                     onClick={onClick}/>

        <label
        for="auto-update" className="before:content[''] 
                                     absolute top-2/4 -left-1 
                                     h-5 w-5 -translate-y-2/4 
                                     cursor-pointer rounded-full 
                                     border border-blue-gray-100
                                    bg-white shadow-md 
                                    transition-all duration-300 
                                    before:absolute before:top-2/4 
                                    before:left-2/4 before:block 
                                    before:h-10 before:w-10 before:-translate-y-2/4 
                                    before:-translate-x-2/4 before:rounded-full 
                                    before:bg-white before:opacity-5 
                                    before:transition-opacity hover:before:opacity-10 
                                    peer-checked:translate-x-full peer-checked:border-gray-500 peer-checked:before:bg-gray-500"
        >
        <div
            className="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
            data-ripple-dark="true"
        ></div>
        </label>
    </div>
    <label
        for="auto-update"
        className="mt-px ml-3 mb-0 cursor-pointer select-none font-light text-gray-700">
        <ListView className ="text-gray-700 text-2xl mx-3"/>
    </label>
    </div>)
}








