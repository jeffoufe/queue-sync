import React from 'react';
import { Modal } from '..';
import { RadioGroup, Radio } from '@ui-kitten/components';

interface DropdownModal {
    options: Array<string>,
    isOpen: boolean,
    title: string,
    selectedIndex: number,
    onCloseModal: (isValid: boolean) => void,
    onChange: (index: number) => void
}

export default ({ options, onChange, isOpen, onCloseModal, title, selectedIndex }: DropdownModal) => (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal} title={title}>
        <RadioGroup 
            onChange={onChange} 
            selectedIndex={selectedIndex}
        >
            {options.map((option: string) => (
                <Radio key={option}>{option}</Radio>
            ))}
        </RadioGroup>
    </Modal>
)