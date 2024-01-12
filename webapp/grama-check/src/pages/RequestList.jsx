import React from 'react'


function RequestList() {
  return (
    <div>
      <h1 className='font-medium m-4 p-4 bg-gray-100 radius'>Requests</h1>
        <table class="table-auto m-4 w-full">
        <thead>
          <tr className='text-left p-4'>
            <th className='font-medium'>Request ID</th>
            <th className='font-medium'>Nic</th>
            <th className='font-medium'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>990006667c</td>
            <td>Pending</td>
          </tr>
        </tbody>
       </table>
    </div>
  )
}

export default RequestList