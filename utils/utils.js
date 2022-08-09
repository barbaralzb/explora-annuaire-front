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
  { id: 2, label: '+18' }
]

export const domainList = [
  { id: 1, label: 'Éducation & Formation', icon: <FiBookOpen size='20' />, color: 'indigo' },
  { id: 2, label: 'Sport', icon: <MdSportsSoccer size='20' />, color: 'yellow' },
  { id: 3, label: 'Culture', icon: <MdOutlinePalette size='20' />, color: 'orange' },
  { id: 4, label: 'Santé', icon: <MdOutlineMedicalServices size='20' />, color: 'blue' },
  { id: 5, label: 'Environnement', icon: <MdOutlineSpa size='20' />, color: 'green' },
  { id: 6, label: 'Défense des droits', icon: <VscLaw size='20' />, color: 'teal' },
  { id: 7, label: 'Exclusion & Pauvreté', icon: <RiHandHeartLine size='24' />, color: 'deep-orange' },
  { id: 8, label: 'Réfugiés', icon: <TbHeartHandshake size='23' />, color: 'lime' },
  { id: 9, label: 'Animaux ', icon: <MdOutlinePets size='23' />, color: 'pink' }
]
