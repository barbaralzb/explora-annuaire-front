/* This example requires Tailwind CSS v2.0+ */
import { IconButton } from '@material-tailwind/react'
import { BiWorld } from 'react-icons/bi'
import { FaHandsHelping } from 'react-icons/fa'
import { GiThreeFriends } from 'react-icons/gi'
import { HiColorSwatch } from 'react-icons/hi'

const features = [
  {
    name: 'Faire des nouvelles connaisances',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GiThreeFriends
  },
  {
    name: 'Se rendre util(e)',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: FaHandsHelping
  },
  {
    name: 'Evenements des gouts varies pour tout le monde',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: HiColorSwatch
  },
  {
    name: 'Decouverte a nouvelle choses',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: BiWorld
  }
]

export default function SectionObjects () {
  return (
    <div className='min-h-screen h-full'>
      <div className='py-12 bg-white flex items-center h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='lg:text-center'>
            <h2 className='text-base text-deep-purple-500 font-semibold tracking-wide uppercase'>Objectifs</h2>
            <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Mettre en contact des asosciations avec des gens motives
            </p>
            <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
              Rouen c'est une ville etudiante de taille humaine qui a un grand quantité des belles associations qui cherche de benevolats. Explora a comme objectif faire connaitre ces associations et leur mission et faire des lieux de recontres pour les gens rouannaise
            </p>
          </div>

          <div className='mt-10'>
            <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
              {features.map((feature) => (
                <div key={feature.name} className='relative'>
                  <dt className='flex gap-6'>
                    <IconButton color='deep-purple' variant='gradient' className='hover:shadow-md cursor-default'>
                      <feature.icon />
                    </IconButton>
                    <p className='text-lg font-medium text-gray-900'>{feature.name}</p>
                  </dt>
                  <dd className='mt-2 ml-16 text-base text-gray-500'>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
