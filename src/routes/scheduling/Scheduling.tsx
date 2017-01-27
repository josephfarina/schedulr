import * as React from 'react'

import SchedulingCalendar from './containers/SchedulingCalendar'
import { PaneContainer } from 'src/shared/components/layout'
import { Navbar } from 'src/shared/components/layout'

interface SchedulingProps {
  sidebar: React.ReactChildren
}

const Scheduling: React.StatelessComponent<SchedulingProps> = (props: SchedulingProps) => {
  const { sidebar } = props

  return (
    <div>
      <Navbar></Navbar>
      <PaneContainer>
        {sidebar}
        <SchedulingCalendar />
      </PaneContainer>
    </div>
  )
}

export default Scheduling
