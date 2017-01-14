import * as React from 'react'
import { connect } from 'react-redux'

import {
  Modal,
  ShiftPreview
} from 'src/components'

import {
  closeModal
} from 'src/state/ui/modal'

import {
  getGeneratedShifts
} from 'src/state/shift'

import {
  RState,
  Shift
} from 'src/models'

// const styles = require('./ShiftApproIver.css')
const ctx = require('classnames')

interface ShiftApproverProps {
  dispatch?: Function
  shifts: Shift[]
}

interface ShiftApproverState {

}

class ShiftApprover extends React.Component<ShiftApproverProps, ShiftApproverState> {
  public static defaultProps: ShiftApproverProps = {
    shifts: []
  }

  constructor(props: ShiftApproverProps) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
  }

  public closeModal() {
    const { dispatch } = this.props
    dispatch(closeModal())
  }

  public render() {
    const {
      shifts
    } = this.props

    const className = ctx({

    })

    return (
      <Modal onRequestClose={this.closeModal}>
        {shifts.map((shift, i) => <ShiftPreview key={i} shift={shift} />)}
      </Modal>
    )
  }
}

const mapStateToProps = (state: RState) => {
  return {
    shifts: getGeneratedShifts(state)
  }
}

export default connect(mapStateToProps)(ShiftApprover)
