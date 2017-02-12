import * as M from 'moment'

import { mount, } from 'enzyme'
import * as React from 'react'
import { values } from 'ramda'

import { ShiftEditor } from './../ShiftEditor'
import { updateNewShift } from 'src/state/shift'

import {
  clientsOne,
  locationsOne,
} from 'src/testUtils'

import {
  rangeParser,
  timeDuration
} from 'src/utils'

describe('ShiftEditor', () => {
  let mockDispatch: jasmine.Spy

  let wrapper = mount(<ShiftEditor />)
  beforeEach(() => {
    mockDispatch = jasmine.createSpy('mockDispatch')
    wrapper = mount(<ShiftEditor
      clients={values(clientsOne)}
      locations={values(locationsOne)}
      dispatch={mockDispatch}
    />)
  })

  it('should render', () => {
    mount(<ShiftEditor />)
  })

  describe('Actions work as expected', () => {

    it('#updateClient should also update the location the clients first loc', () => {
      const client = values(clientsOne)[0]
      const expected = updateNewShift({
        client: client.id,
        location: client.locations[0]
      })
      wrapper.instance()['updateClient'](client.id)
      expect(mockDispatch.calls.mostRecent().args[0]).toEqual(expected)
    })

    describe('#handleTimeChangeEnd', () => {

      it('if any timeInputValue is entered', () => {
        const timeInputValue = '1a - 5p'
        wrapper.setState({
          timeInputValue
        })
        wrapper.instance()['handleTimeChangeEnd']()
        const parsedTimeRange = wrapper.state()['parsedTimeRange']
        // FixME: the M() will need to be fixed once date selector is implemented
        const expectedTimeRange = rangeParser(M(), timeInputValue)

        expect(
          expectedTimeRange[0].isSame(parsedTimeRange[0], 'minute')
        ).toBeTruthy()
        expect(
          expectedTimeRange[1].isSame(parsedTimeRange[1], 'minute')
        ).toBeTruthy()

        // expect to to dispatch the current range formated in startTime and duration
        expect(mockDispatch.calls.mostRecent().args[0]).toEqual(updateNewShift({
          startTime: parsedTimeRange[0].format(),
          duration: timeDuration(parsedTimeRange[0], parsedTimeRange[1])
        }))
      })

      it('if an empty string timeInputValue is entered', () => {
        wrapper.setState({ timeInputValue: '1 - 3 ' })
        wrapper.setState({ timeInputValue: '' })

        wrapper.instance()['handleTimeChangeEnd']()
        expect(wrapper.state()['parsedTimeRange']).toEqual(undefined)
        expect(mockDispatch.calls.mostRecent().args[0]).toEqual(updateNewShift({
          startTime: null,
          duration: null
        }))
      })

      it('if an invalid string timeInputValue is entered', () => {
        wrapper.setState({ timeInputValue: '1 - ShiftEditor.spec.tsx ' })
        wrapper.instance()['handleTimeChangeEnd']()
        expect(wrapper.state()['parsedTimeRange']).toEqual(null)
        expect(mockDispatch.calls.mostRecent().args[0]).toEqual(updateNewShift({
          startTime: null,
          duration: null
        }))
      })

    })

  })

})
