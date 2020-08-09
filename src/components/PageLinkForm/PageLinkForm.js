import React from 'react';
import './PageLinkForm.css';

const PageLinkForm = ({onInputChange, onSubmit}) => {

  return(
    <div>
      <p className='f3'>{
        'This magic brain will detect faces in your images'
      }</p>
      <div className='center'>
        <div className='form pa4 br3 shadow-5'>
          <input type='text' className='f4 pa2 w-70' onChange={onInputChange}/>
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Go</button>
        </div>
      </div>
    </div>
  );
};

export default PageLinkForm;