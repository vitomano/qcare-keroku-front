import React from 'react'

export const GrowerTable = ({addGrower}) => {

  return (
    <div className='w-100 mt-1'>
    <div className='score-grid score-header mt-1'>
        <p className='text-center'>Grower/Variety</p>
        <p className='text-center'>Boxes</p>
    </div>

    <div
        className='score-grid my-1'>
        <p className='text-center'>{addGrower.grower_variety || "--"}</p>
        <p className='text-center'>{addGrower.boxes || "--"}</p>
    </div>
</div>
  )
}
