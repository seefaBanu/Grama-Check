import React,{useContext} from 'react'
import { AppContext } from '../context-api/AppContext'

export default function ContextApiTest() {
    const {nic}=useContext(AppContext)
  return (
    <div>
        {nic}
    </div>
  )
}
