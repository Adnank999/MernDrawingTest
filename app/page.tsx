import dynamic from 'next/dynamic'
import React from 'react'

const Dashboard = dynamic(() => import('../app/components/Dashboard'), {
  ssr:false
})



const page = () => {


  return (
    <div>
       <Dashboard/>
    </div>
   
  )
}

export default page




