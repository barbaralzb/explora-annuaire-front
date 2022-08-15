import { FiBookOpen } from 'react-icons/fi'
import { MdSportsSoccer, MdOutlineSpa, MdOutlineMedicalServices, MdOutlinePalette, MdOutlinePets } from 'react-icons/md'
import { VscLaw } from 'react-icons/vsc'
import { RiHandHeartLine } from 'react-icons/ri'
import { TbHeartHandshake } from 'react-icons/tb'
/*********************************/
/** **** developpement urls *******/
/*********************************/
export const ServerUrl = 'http://localhost:5000'

export const ageRangeList = [
  { id: 1, label: 'Tout public' },
  { id: 2, label: 'Adultes' },
  { id: 3, label: 'Enfants' }
]

export const domainList = [
  { id: 1, label: 'Éducation & Formation', icon: <FiBookOpen size='24' />, color: 'indigo' },
  { id: 2, label: 'Sport', icon: <MdSportsSoccer size='24' />, color: 'amber' },
  { id: 3, label: 'Culture', icon: <MdOutlinePalette size='24' />, color: 'deep-purple' },
  { id: 4, label: 'Santé', icon: <MdOutlineMedicalServices size='24' />, color: 'blue' },
  { id: 5, label: 'Environnement', icon: <MdOutlineSpa size='24' />, color: 'green' },
  { id: 6, label: 'Défense des droits', icon: <VscLaw size='24' />, color: 'teal' },
  { id: 7, label: 'Exclusion & Pauvreté', icon: <RiHandHeartLine size='28' />, color: 'deep-orange' },
  { id: 8, label: 'Réfugiés', icon: <TbHeartHandshake size='27' />, color: 'lime' },
  { id: 9, label: 'Animaux ', icon: <MdOutlinePets size='27' />, color: 'pink' }
]
