import { Moment } from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import { getMomentDate } from './../state/calendar/selector'

import {
  getScheduleSidebarMode
} from './../state/ui/sidebar/selector'

import * as Models from './../models'
import * as CalendarActions from './../state/calendar/action'
import * as SidebarActions from './../state/ui/sidebar/action'

import Calendar from './../components/calendar/Calendar'
import PaneHeader from './../components/layout/PaneHeader'
import PaneSidebar from './../components/layout/PaneSidebar'
import ShiftEditor from './../components/sidebarViews/ShiftEditor'

import Button from './../components/buttons/Button'
import ButtonGroup from './../components/buttons/ButtonGroup'

import './App.css'

interface Props {
  dispatch: Function,
  sidebarMode: Models.ScheduleSidebarMode
  date: Moment
}

interface State {

}

class SideBar extends React.Component<Props, State> {
  public static proptypes = {
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props: any) {
    super(props)
    this.nextRange = this.nextRange.bind(this)
    this.prevRange = this.prevRange.bind(this)
    this.inspectorMode = this.inspectorMode.bind(this)
    this.newShiftMode = this.newShiftMode.bind(this)
  }

  /**
   * 
   * Change time range
   * 
   */

  public nextRange() {
    const { dispatch } = this.props
    dispatch(CalendarActions.nextTimeRange())
  }

  public prevRange() {
    const { dispatch } = this.props
    dispatch(CalendarActions.previousTimeRange())
  }

  /**
   * 
   * Change sidebar mode
   * 
   */

  public inspectorMode() {
    const { dispatch } = this.props
    dispatch(SidebarActions.setSidebarModeToInspector())
  }

  public newShiftMode() {
    const { dispatch } = this.props
    dispatch(SidebarActions.setSidebarModeToNewShift())
  }

  /**
   * 
   * Render Elements Conditionally
   * 
   */

  public renderCalendarWidget(props: Props) {
    const {
      date,
      sidebarMode
    } = props

    const shouldRender = sidebarMode === 'filter' || sidebarMode === 'inspector'

    if (shouldRender) {
      return (
        <Calendar
          month={date}
          onNextRangeClick={this.nextRange}
          onPrevRangeClick={this.prevRange}
          selectedWeek={date}
          isDatePicker={true}
          />
      )
    } else {
      return null
    }
  }

  /**
   * 
   * store in shift state 
   *  - selectedShiftId: string  (shift id)
   *  - shiftBeingEdited: Shift
   *  - shiftBeingCreated: Shift
   * 
   * 
   * renderShiftEditor() {
   *  let shiftToEdit: Shift
   * 
   *  if (mode === 'editShift') {
   *    shiftToEdit = Object.assign({}, getShiftById(selectedShiftId), shiftBeingEdited)
   *  } 
   * 
   *  else if (mode === 'newShift) {
   *    shiftToEdit = Object.assign({}, shiftBeingCreated)
   *  }
   * 
   *  // if its neither new or edit mode return null
   *  else {
   *    return null
   *  }
   * 
   *  return <ShiftEditor 
   *    handleChange={func} // on change end update redux
   *    handleSubmit={func} // create new shift or edit shift depending on the mode 
   *    handleReset={func} // clear the new shift blank or restore the unedited shift being edited 
   *    handleModeChange={func} // toggle between edit and add state
   *    editMode={boolean} // mode === 'editMode'
   *    newMode={boolean} // mode ==='newMode'
   *    shift={shiftToEdit} // shiftToEdit -- only use this in the constructor use internal state after
   *  />
   *  
   * }
   * 
   * <ShiftInspector />
   * <ShiftFilter />
   * 
   */


  /**
   * Render
   */

  public render() {
    const {
      sidebarMode
    } = this.props

    return (
      <PaneSidebar maximized={sidebarMode === 'newShift'}>
        <PaneHeader>
          <ButtonGroup buttonBar={true}>
            <Button>Hello</Button>
            <Button onClick={this.inspectorMode} >inspector</Button>
            <Button onClick={this.newShiftMode}> New shift</Button>
          </ButtonGroup>
        </PaneHeader>
        <div>
          <ShiftEditor shiftSelected={true}/>

        </div>
        {this.renderCalendarWidget(this.props)}
      </PaneSidebar>
    )
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: Models.RState, ownProps: Props) => {
  return {
    sidebarMode: getScheduleSidebarMode(state),
    date: getMomentDate(state),
  }
}

export default connect(mapStateToProps)(SideBar)
