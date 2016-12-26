import * as React from 'react'

const styles = require('./CalendarContent.css')

interface Props {
  children?: React.ReactChild
}

const CalendarContent: React.StatelessComponent<any> = (props: Props) => {
  const { children } = props
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default CalendarContent