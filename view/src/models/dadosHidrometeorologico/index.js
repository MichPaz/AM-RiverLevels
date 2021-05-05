import Model from '../index'
import * as Yup from 'yup';
import { dataTempoToDateTime, dateTimeToForm, dateTimeToData } from '../../utils/mask/datetime/index'
import SelectEstacao from '../../view/estacao/select'


const model = [
  {
    label: undefined,
    key: 'id',
    inputType: null,
    toForm: undefined,
    toStore: undefined,
    default: undefined,
    required: undefined,
    validation: undefined,
  },
  {
    label: 'Data e Hora',
    key: 'dataHora',
    inputType: 'datetime',
    toView: dateTimeToData,
    toForm: dateTimeToForm,
    toStore: dataTempoToDateTime,
    default: new Date().toISOString(),
    required: true,
    validation: Yup.date()
      .required('A data é obrigatória'),
  },
]

const query = [
  {
    label: 'Estacao',
    key: 'estacoes',
    inputType: 'select',
    component: SelectEstacao,
    toForm: e => ([{ value: e }]),
    // toStore: e => e.map(item => item.value).join(','),
    required: true,
    default: [],
    validation: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number()
            .required('Este campo é obrigatório'),
          label: Yup.string(),
        })
      )
      .min(1, 'Este campo é obrigatório'),
  },
  {
    label: 'Data de Inicio',
    key: 'startDate',
    inputType: 'datetime',
    toView: dateTimeToData,
    default: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),

    required: false,
    toForm: dateTimeToForm,
    toStore: dataTempoToDateTime,
    validation: Yup.date()
  },
  {
    label: 'Data de Fim',
    key: 'endDate',
    inputType: 'datetime',
    toView: dateTimeToData,
    required: false,
    toForm: dateTimeToForm,
    toStore: dataTempoToDateTime,
    validation: Yup.date(),
    default: new Date().toISOString(),
  },

]

class OrdemServico extends Model {
  constructor() {
    super()
    this.model = model
  }

  setModel(newModel) {
    this.model = newModel
  }

  getModel() {
    return this.model
  }

  getFormQuery(keys, values, handleChange, handleBlur, touched, errors, setFieldValue) {
    this.model = query
    let form = this.getForm(keys, values, handleChange, handleBlur, touched, errors, setFieldValue)
    this.model = model
    return form
  }

  getInitialValuesQuery() {
    this.model = query
    let initialValues = this.getInitialValues()
    this.model = model
    return initialValues
  }

  toStoreQuery(v) {
    this.model = query
    let f = this.toStore(v)
    this.model = model
    return f
  }

  getValidationQuery(v) {
    this.model = query
    let f = this.getValidation(v)
    this.model = model
    return f
  }

}

export default new OrdemServico()