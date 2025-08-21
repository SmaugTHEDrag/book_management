import React from 'react'
import { Banner } from './Banner'
import BookCards from '../shared/BookCards'
import FavoriteBook from './FavoriteBook'
import BestSeller from './BestSeller'
import OtherBooks from './OtherBooks'

import Review from './Review'
import Chatbot from '../shared/ChatBot'

export const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSeller/>
      <FavoriteBook/>
      <Chatbot/>
      <OtherBooks/>
      <Review/>
    </div>
  )
}
