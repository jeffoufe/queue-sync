import React, { useState } from 'react';
import { Input } from '@ui-kitten/components';

interface InputProps {
  placeholder?: string,
  disabled?: boolean,
  onChange?: (value: string) => void
}

export default ({ placeholder, onChange, disabled }: InputProps) => {
  const [value, setValue] = useState<string>('');
  return (
    <Input
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChangeText={(text) => {
        setValue(text);
        if (onChange) {
          onChange(text);
        }
      }}
    />
  )
}