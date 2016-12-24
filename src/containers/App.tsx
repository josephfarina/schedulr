import * as React from 'react'
import { Component, PropTypes } from 'react'

import Calendar from './../components/calendar/Calendar'
import Navbar from './../components/layout/Navbar'
import PaneBody from './../components/layout/PaneBody'
import PaneContainer from './../components/layout/PaneContainer'
import PaneContent from './../components/layout/PaneContent'
import PaneHeader from './../components/layout/PaneHeader'
import PaneSidebar from './../components/layout/PaneSidebar'


import './App.css'

interface Props {

}

interface State {

}

class App extends Component<Props, State> {
  public static proptypes = {

  }

  public render() {
    return (
      <div>
        <Navbar></Navbar>
        <PaneContainer>

          <PaneSidebar>
            <PaneHeader>
              f
            </PaneHeader>
            <PaneContent>

            </PaneContent>
          </PaneSidebar>

          <PaneBody>
            <PaneHeader>
              f
            </PaneHeader>
            <PaneContent>

              <Calendar>
              </Calendar>

            </PaneContent>
          </PaneBody>

        </PaneContainer>
      </div>
    )
  }
}

export default App
