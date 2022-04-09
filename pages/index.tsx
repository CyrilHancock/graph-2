import type { NextPage } from 'next'
import Head from 'next/head'

import AppBody from "../components/AppBody"
const Home: NextPage = () => {

  return (
    <div className="flex min-h-screen flex-col items-center   bg-gray-200">
      <Head>
        <title>Food Graph Pattern</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-purple-500 p-5 flex place-items-center w-full'>
      {/* {left} */}
      <img className='h-12 object-contain rounded-full'  src='https://www.clipartmax.com/png/middle/296-2964584_animated-food-transparent.png'/>
        <p className='font-bold text-2xl text-white ml-3'>Food Graph</p>
    </div>
      <AppBody/>
    </div>
  )
}

export default Home
