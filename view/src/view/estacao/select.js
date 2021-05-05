import React, { useEffect, useState } from 'react'
import { TagsFormik } from '../../components/Generics/Tags'
import Actions from '../../actions/estacao'
import Stores from '../../stores/estacao'

const SelectArea = props => {
  const { prop, values, handleChange, handleBlur, touched, errors, setFieldValue } = props

  const [loading, setLoading] = useState(false)
  const [area, setArea] = useState([])

  useEffect(() => {
    const onChange = () => {
      setArea(Stores.getList())
      setLoading(false)
    }

    function startValues() {
      const page = Stores.getPage()
      const limit = Stores.getLimit()

      Stores.setPage(undefined)
      Stores.setLimit(undefined)

      Stores.addChangeListener(onChange)
      Actions.list()
      setLoading(true)

      Stores.setPage(page)
      Stores.setLimit(limit)
    }

    startValues()

    return function cleanup() {
      Stores.removeChangeListener(onChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TagsFormik
        options={area.map(e => ({ value: e.id, label: e.nome }))}
        prop={prop}
        values={values}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        errors={errors}

        setFieldValue={setFieldValue}
        limitTags={1}
        // limitValue={1}
        label='Estação'
        loading={loading}
      />
    </>
  )
}

export default SelectArea
