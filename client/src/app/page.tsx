import '@/styles/page.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { ChevronDown } from 'lucide-react'


export default function Home() {
  return (
    <>
      <Header />
      <ChevronDown className=''/>
      <Footer />
    </>
  )
}
