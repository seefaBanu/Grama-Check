import Popup from 'reactjs-popup';
import { Button } from 'mochi-ui';
import StatusIcon from './StatusIcon';

export default function SingleRequest({citizen,status,isReady}) {
  return (
    <Popup trigger={<button className="py-2 px-4 rounded">Open Modal</button>} modal nested>
      {close => (
        <>
          <div className="overlay fixed inset-0 bg-black opacity-30"></div>
          <div className="modal bg-white rounded-xl z-50 relative shadow-2xl
            sm:px-14 sm:py-2 
            md:px-20 md:py-4
            xl:px-22 xl:py-6
            px-24 py-10"
            >
            <button className="close text-gray-500 text-xl hover:text-gray-700 absolute right-4 top-4" onClick={close}>
              &times;
            </button>
            <h1 className="header font-semibold  underline text-center
            sm:text-sm
            md:text-md
            xl:text-lg
            text-xl mb-4"
            >Shamly Shanawaz</h1>
            <div className='h-[90%]  p-2  flex flex-col justify-between'>
              <div className="content mb-6 ">
                <StatusIcon status='Submitted'  done={true} />
                <StatusIcon status='Address Verified' done={status?.addressVerified} />
                <StatusIcon status='Approved' done={status?.approved} />
                <StatusIcon status='Ready'  done={isReady} />
              </div>
            <div className="actions flex justify-center">
              <Button title='Approve'/>
              <Button title='Reject' color='danger'/>
            </div>
            </div>
           
          </div>
        </>
      )}
    </Popup>
  );
}
