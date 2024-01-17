import Popup from 'reactjs-popup';

export default function PopupModal({trigger,children}) {
  

  return (
    <Popup trigger={trigger} modal nested>
          {close=>(
            <>
               <div className="overlay fixed inset-0 bg-black opacity-30"></div>
               <div className="modal bg-white rounded-xl z-50 relative shadow-2xl
                sm:px-14 sm:py-2 
                md:px-20 md:py-4
                xl:px-22 xl:py-6
                px-16 pt-8 pb-2"
                >
                    <button className="close text-gray-500 text-2xl hover:text-gray-700 absolute right-4 top-2" onClick={close}>
                        &times;
                    </button>
                    <div className=''>
                        {children}
                    </div>
                </div>
            </>
          )}
        </Popup>
  )
}
