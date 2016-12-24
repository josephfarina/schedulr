import * as React from 'react'

const styles = require('./PaneContainer.css')

interface Props {
  children?: React.ReactChild
}

const PaneContainer: React.StatelessComponent<any> = ({children = null}: Props) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default PaneContainer
