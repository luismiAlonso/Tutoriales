import { ItextInputFilter } from "../inputTextFilterComponent/ItextInputFilter"
import { IcustomSelectProp } from "../selectComponent/IcustomSelectProp"
import { ItoggleProps } from "../toggle/ItoggleProps"
import { HybridSelectProps } from "../hybridSelectComponent/HybridSelectProps"
import {DateFilterProps} from "../customDatePicker/DateFilterProps"

export type FilterConfig =
  | ItextInputFilter
  | IcustomSelectProp
  | DateFilterProps
  | ItoggleProps
  | HybridSelectProps





