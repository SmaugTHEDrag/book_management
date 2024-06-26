import { Spinner } from 'flowbite-react';
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider';
const posts = [
  {
    id: 1,
    title: 'Good experience overall',
    href: '#',
    description:
      'The positive experience you have had serves as motivation to continue delivering top-notch service. The attention to detail, responsiveness, and dedication to customer satisfaction are integral aspects of the commitment to excellence. It is not just about meeting expectations but exceeding them, and I am glad to have contributed to making your experience a positive one.',
    date: 'Jan 12, 2024',
    datetime: '2020-03-16',
    category: { title: 'Ficton', href: '#' }, 
    author: {
      name: 'PTN', 
      role: 'Normal student',
      href: '#',
      imageUrl:
        'https://cdn.discordapp.com/attachments/984481824065617952/1100315739916873768/338940319_244271794681709_3908198250391232581_n.jpg',
    },
  },
  {
    id: 2,
    title: 'Outstanding!!!',
    href: '#',
    description:
      'In a world where time is of the essence, the efficiency of the customer service you received not only saves time but also contributes to an overall positive interaction. The seamless handling of your inquiries or concerns reflects a well-organized and customer-centric approach, enhancing the overall quality of the service.',
    date: 'Jan 12, 2024',
    datetime: '2020-03-16',
    category: { title: 'Marketing and Entertainment', href: '#' },
    author: {
      name: 'Trung',
      role: 'Prize fighter',
      href: '#',
      imageUrl:
        'https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/369209682_143725865400335_1970477301954967517_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGoq0aFGdXLz6_YjlUwCYAVrmeoU3Eb1UauZ6hTcRvVRqSfaHXdilBWP0IUGfPRUpPcU_QwZkTRIx1vnhOpAcUq&_nc_ohc=CZ97a7S17csAX_QNzJD&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTyfVGfMDA_G4wqiYtwOxQbnOPhXtAYbhaFFUOW_oHljg&oe=65BE33BD',
    },
  },
  {
    id: 3,
    title: 'Exceptional quality',
    href: '#',
    description:
      'The attention to detail, efficiency, and the overall positive experience contribute to the perception of true value for your investment. It is not just about the monetary aspect; it is about the overall impact and satisfaction derived from the quality of the service. The dedication to providing a top-notch experience is evident and makes the decision to choose this service a wise and rewarding one.',
    date: 'Jan 12, 2024',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Pheu',
      role: 'Leader/ANTI LGBT club',
      href: '#',
      imageUrl:
        'https://cdn.discordapp.com/attachments/984481824065617952/1100315740420198410/339301656_3309074886010779_5177668617428147388_n.jpg',
    },
  },
  // More posts...
]

const Blog = () => {
  const {loading } = useContext(AuthContext);

  if(loading) {
    return <div className='text-center mt-28'>
      <Spinner aria-label="Center-aligned spinner example" />
    </div>
  }


  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Share experience when using online library.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog