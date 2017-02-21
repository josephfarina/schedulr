import * as React from 'react'
import { UnnormalizedEmployeeFavorability } from 'src/models'

const Switch = require('antd/lib/switch')
const Icon = require('antd/lib/icon')
const Rate = require('antd/lib/rate')

interface Props {
  employeeFavorabilies: UnnormalizedEmployeeFavorability[]
  onChange: (id: string) => (key: 'rating' | 'canWorkWith') => (val: number) => any
}

const EmployeeFavorabilityEditor = ({employeeFavorabilies, onChange}: Props) => (
  <div>
    {employeeFavorabilies.map(empFav => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2><strong>{empFav.client.alias}</strong></h2>
        <Switch checkedChildren={<Icon type="like" />}
          unCheckedChildren={<Icon type="dislike" />}
          onChange={onChange(empFav.id)('canWorkWith')}
          checked={empFav.canWorkWith}
        />
        <Rate allowHalf value={empFav.rating} onChange={onChange(empFav.id)('rating')} disabled={!empFav.canWorkWith} />
      </div>
    ))}
  </div>
)

export default EmployeeFavorabilityEditor
