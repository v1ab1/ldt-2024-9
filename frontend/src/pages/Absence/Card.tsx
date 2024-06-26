import classNames from 'classnames'
import {FC} from 'react'
import {createUseStyles} from 'react-jss'
import {Date} from '../../ui-kit'

type CardProps = {
  type: 'sickness' | 'vacation' | 'absence'
}

const status: {[key: string]: string} = {
  absence: ':',
  sickness: ' по болезни:',
  vacation: ' из-за отпуска:',
}

export const Card: FC<CardProps> = ({type}) => {
  const c = useStyles()

  return (
    <div className={c.root}>
      <h3 className={c.header}>Сабуров Дмитрий Александрович</h3>
      <p className={c.text}>Врач-ренгенолог</p>
      <div className={c.datesWrapper}>
        <p className={c.text}>Будет отсутствовать{status[type as keyof typeof status]}</p>
        <div className={c.dates}>
          <Date type={type} text='30.06' />
        </div>
      </div>

      <button
        className={classNames(
          c.button,
          type === 'vacation' ? c.vacationButton : type === 'sickness' ? c.sicknessButton : c.absenceButton
        )}
      >
        Утвердить
      </button>
    </div>
  )
}

const useStyles = createUseStyles({
  root: {
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
    padding: [20, 30],
    fontFamily: 'Inter, sans-serif',
    width: '40%',
    borderRadius: 12,
  },
  header: {
    fontWeight: 500,
    fontSize: 18,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  text: {
    fontSize: 12,
    marginTop: 5,
  },
  dates: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  datesWrapper: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: [12, 20],
    borderRadius: 12,
    cursor: 'pointer',
  },
  vacationButton: {
    color: 'white',
    backgroundColor: 'rgba(247, 156, 91, 1)',
  },
  sicknessButton: {
    backgroundColor: 'rgba(240, 47, 47, 1)',
    color: 'white',
  },
  absenceButton: {
    color: 'white',
    backgroundColor: 'gray',
  },
})
