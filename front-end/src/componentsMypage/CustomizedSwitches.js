import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchButton = withStyles({//setting 페이지 Switch 버튼
  switchBase: {
    color: "#FFCC4F",
    '&$checked': {
      color: "#FFCC4F",
    },
    '&$checked + $track': {
      backgroundColor: "#FFCC4F",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function CustomizedSwitches({ toggle, clickSwitch}) {

  return (
    <FormGroup style={{width: "37px"}}>
      <FormControlLabel
        control={<SwitchButton 
                  checked={toggle} 
                  onClick={clickSwitch} 
                  name="checked"/>}
      />
    </FormGroup>
  );
}
