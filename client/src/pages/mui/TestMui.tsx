import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import './TestMui.scss';
import { useState } from 'react';

export default function TestMui() {
  const children = [
    <ToggleButton value="left" key="left"  role="custom" data-test='xxxxx'>
      Custom Button1
    </ToggleButton>,
    <ToggleButton value="center" key="center" role="custom">
      Custom Button2
    </ToggleButton>,
    <ToggleButton value="right" key="right" role="custom">
      Custom Button3
    </ToggleButton>,
  ];

  const [alignment, setAlignment] = useState('left');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <div className="test-mui">
      <Button color="primary" variant="contained">
        Primary Button
      </Button>
      <Button color="secondary" variant="contained">
        Secondary Button
      </Button>
      <Button color="neutral" variant="custom">
        Custom Button
      </Button>
      <Button color="custom" variant="custom">
        Custom Button
      </Button>
      <Button color="custom" variant="custom" disabled>
        Disabled Custom Button
      </Button>
      <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
        {children}
      </ToggleButtonGroup>
    </div>
  );
}
