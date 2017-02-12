import * as EntityModels from './entities'
// import * as ShiftModels from './shift'
import * as TimeModels from './time'

export interface Action<T> {
  type: string
  payload: T
}

/**
 * 
 * ReducerStates
 * Prefixed with R 
 */

// The Master State
export interface RState {
  calendar?: RCalendar
  shift?: RShift
  entities?: REntities
  ui?: RUI
  auth?: RAuth
}


/**
 * 
 * Calendar State
 * 
 */

export interface RCalendar {
  date?: string
  timeRange?: TimeModels.TimeRangeOption
}



/**
 * 
 * Shift State
 * 
 */

export interface RShift {
  // data?: RShiftData
  editor?: RShiftEditor
}

export interface RShiftData extends CrudState<RShift> {
  shiftCacheTimeRange?: string
  shiftCacheIsValid?: boolean
}

export interface RShiftEditor {
  newShift?: EntityModels.ShiftTemplate
  employeesInShift?: string[]
  shiftDate?: string
  datePickerMonth?: string
  editedShift?: EntityModels.ShiftTemplate
  selectedShift?: string
  generateShift?: boolean
}


/**
 * 
 * Entity State
 * 
 */

// Extend state interfaces with this if they implement the crud actions
export interface CrudState<T> {
  raw: EntityModels.Entities<T>
  added: EntityModels.Entities<T>
  edited: EntityModels.Entities<T>
  deleted: string[]
}


export interface REntities {
  clients?: CrudState<EntityModels.Clients>
  locations?: CrudState<EntityModels.Locations>
  employees?: CrudState<EntityModels.Employees>
  shifts?: CrudState<EntityModels.Shifts>
}

/**
 * 
 * Auth State
 * 
 */


export interface RAuth {
  login?: RAuthLogin
  register?: RAuthRegister
}

interface ApiInteraction {
  fetching?: boolean
  errors?: string[] | null
}

export interface RAuthLogin extends ApiInteraction {
  email?: string
  password?: string
}

export declare type RegistrationFields = 'orgName' | 'email' | 'password' | 'confirmPassword'

export interface RAuthRegister extends ApiInteraction {
  orgName?: string
  email?: string
  password?: string
  confirmPassword?: string
}


/**
 * 
 * UI State
 * 
 */


export interface RUI {
  sidebar?: RSidebar
  notification?: RNotification
  modal?: RModal
}

export declare type ScheduleSidebarMode = 'filter' | 'newShift' | 'editShift' | 'inspector'
export interface RSidebar {
  mode: ScheduleSidebarMode
}

export interface RNotification {
  messages: string[]
}

export declare type ModalMode = 'shiftApproval'
export interface RModal {
  modalType: ModalMode,
  modalProps: {}
}
