import * as React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckbox(props) {
  return (
    <div>
     
      <Checkbox
      checked={props.checked}
      onClick={props.onclick}
       {...label} defaultChecked color="success" />
    
    </div>
  );
}
