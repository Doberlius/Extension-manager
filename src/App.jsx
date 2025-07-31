import { useState } from 'react'
import './style.css'
import Logo from '@/assets/images/logo.svg?react' // import svg inline to edit pic color 
import iconSun from '@/assets/images/icon-sun.svg'
import iconMoon from '@/assets/images/icon-moon.svg'
import extensionData from '@/assets/data.json'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, inactive
  const [extension, setExtensions] = useState(extensionData);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleExtension = (index) => {
    setExtensions(extension.map((ext, i) => {
      if(i === index) return {...ext, isActive: !ext.isActive}
      return ext;
    }))
  }

  const removeExtension = (index) => {
    setExtensions(extension.filter((_,i) => i !== index))  // filter a new elem that marks that one != current index so that elem will be filter in making it disappear
  }

  const filteredExtensions = extension.filter(ext => {
    if(filter == 'all') return true;
    if(filter == 'active') return ext.isActive;
    if(filter == 'inactive') return !ext.isActive;
  })
  

  return (
    <>
        <div className='relative custom-bg min-h-screen  w-full flex justify-center overflow-y-auto' 
          style={{background: isDarkMode ? 'linear-gradient(180deg, #040918 0%, #091540 100%)' : 'linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)' }}>
          <div className='absolute w-full max-w-3/4 sm:max-w-sm md:max-w-xl lg:max-w-5xl'>
             <div className='navbar w-full h-[20%] mt-[3rem] p-2 sm:p-3 rounded-lg flex flex-row justify-between items-center' 
              style={{background: isDarkMode ? '#2f364b' : '#FFFFFF'}}>
                <Logo className={`w-32 max-w-2xs sm:w-40 md:w-48 h-auto ${isDarkMode ? '[&>path]:fill-white' : ''}`} />
                {/* to check svg code F12 inspect pic svg file in browser */}
                {/* path is text logo and g is logo; the code meaning  & select current element then  > directly select tag path  that's why text and logo color seperately*/}
                <button 
                  onClick={toggleTheme}
                  className={`switch-mode p-2 sm:p-[10px] rounded-xl transition-all bg-opacity-80 border-2 border-transparent hover:border-amber-600`}
                  style={{background: isDarkMode ? 'oklch(0.525 0 313.94)' : '#E4E5EA'}}
                >
                  <img src={isDarkMode ? iconSun : iconMoon} alt="theme-icon" className='w-4 sm:w-5 h-auto'/>
                </button>
             </div>

             <div className='menu-list mt-[3rem] w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-0'>
               <div className='text-3xl' style={{color: isDarkMode ? '#FFFFFF' : '#000000'}}>Extension List</div>
               <div className='menu-btn flex flex-wrap gap-2' style={{color: isDarkMode ? '#FFFFFF' : '#000000'}}>
                 <button 
                   onClick={() => setFilter('all')}
                   className={`All-btn p-[10px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-700 ${filter == 'all' ? 'bg-amber-600' : isDarkMode ? 'bg-gray-600 hover:bg-amber-600' : 'bg-amber-50'}`}
                 >All</button>
                 <button 
                   onClick={() => setFilter('active')}
                   className={`Active-btn p-[10px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-700 ${filter == 'active' ? 'bg-amber-600' : isDarkMode ? 'bg-gray-600 hover:bg-amber-600' : 'bg-amber-50'}`}
                 >Active</button>
                 <button 
                   onClick={() => setFilter('inactive')}
                   className={`Inactive-btn p-[10px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-700 ${filter == 'inactive' ? 'bg-amber-600' : isDarkMode ? 'bg-gray-600 hover:bg-amber-600' : 'bg-amber-50'}`}
                 >Inactive</button>
               </div>
             </div>

             <div className='extension-list mt-[2rem] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 self-start mb-[4rem]'>
                {filteredExtensions.map((ext, index) => (
                  <div key={index} className='extension-card p-4 rounded-xl flex flex-col justify-between '
                    style={{background: isDarkMode ? '#2f364b' : '#FFFFFF'}}
                  >
                    <div className='w-full flex flex-row text-wrap'>
                      <img src={ext.logo} alt={ext.name} className='w-10 h-12 mb-2' />
                      <div className='flex flex-col ml-3' style={{color: isDarkMode ? '#FFFFFF' : '#000000'}}>
                        <h3 className='text-sm sm:text-md font-bold mb-2'>{ext.name}</h3>
                        <h3 className='text-xs sm:text-sm font-light'>{ext.description}</h3>
                      </div>
                    </div>

                    <div className='w-full flex justify-between items-center mt-4'>
                      <button 
                      className={`rmv-btn p-[6px] rounded-2xl border-2 ${isDarkMode ? 'text-white border-gray-500 hover:text-white hover:bg-gray-500 hover:border-amber-600' : 'text-black border-amber-50  hover:border-amber-600'}`} 
                      onClick={() => removeExtension(index)}
                      >Remove</button>
                      <label className='inline-flex items-center cursor-pointer'>
                        <div 
                          onClick={() => toggleExtension(index)}
                          className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out ${ext.isActive ? (isDarkMode ? 'bg-amber-600' : 'bg-green-600') : 'bg-gray-500'}`}
                        >
                          <div 
                            className={`absolute w-5 h-5 rounded-full bg-white transition-all duration-300 ease-in-out ${ext.isActive ? 'left-6' : 'left-1'} top-0.5`}
                          ></div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
             </div>

           </div>
        </div>
    </>
  )
}

export default App
