/* This example requires Tailwind CSS v2.0+ */
import { IconButton } from '@material-tailwind/react'
import { BiWorld } from 'react-icons/bi'
import { FaHandsHelping } from 'react-icons/fa'
import { GiThreeFriends } from 'react-icons/gi'
import { HiColorSwatch } from 'react-icons/hi'

const features = [
  {
    name: 'Avoir le sentiment d’être utile et de rendre service',
    description:
    'Développer des caractères plus humains : effectivement, les valeurs du cœur (humilité, abnégation, don de soi) sont essentielles pour travailler dans le social ou l’humanitaire.',
    icon: GiThreeFriends
  },
  {
    name: 'Avoir le sentiment d’être utile et de rendre service',
    description:
    'Participer gratuitement aux différentes manifestations organisées par la structure : compétition sportive, manifestation culturelle et artistique, etc.',
    icon: FaHandsHelping
  },
  {
    name: 'Le bénévolat donne l’opportunité d’acquérir de nouvelles compétences et connaissances',
    description:
    'Donner du sens à son travail : en faisant ce que l’on aime, on est plus engagé et on s’investit plus, élargir son horizon et ses compétences. Et Évoluer dans une structure plus humaine',
    icon: HiColorSwatch
  },
  {
    name: 'Rencontrer de nouvelles personnes et d\'élargir son cercle de connaissances',
    description:
    'Faire du bénévolat permet de sortir de la solitude, de partager le quotidien avec des personnes qui partagent les mêmes valeurs que soi',
    icon: BiWorld
  }
]

export default function SectionObjects () {
  return (
    <div className='min-h-screen h-full'>
      <div className='bg-white flex items-center h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='lg:text-center'>
            <h2 className='text-base text-deep-purple-500 font-semibold tracking-wide uppercase'>s’engager pour / dans une association ?</h2>
            <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Pourquoi s’engager, adhérer, faire partie, devenir bénévole ou travailler dans une association ?
            </p>
            <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
              Les bonnes raisons de le faire
            </p>
          </div>

          <div className='mt-10'>
            <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
              {features.map((feature) => (
                <div key={feature.name} className='relative'>
                  <dt className='flex gap-6'>
                    <IconButton color='deep-purple' variant='gradient' className='hover:shadow-md cursor-default w-full'>
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
