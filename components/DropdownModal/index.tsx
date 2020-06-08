import React from 'react';
import { Modal } from '..';
import { RadioGroup, Radio } from '@ui-kitten/components';

interface DropdownModal {
    options: Array<string>,
    isOpen: boolean,
    title: string,
    selectedIndex: number,
    onCloseModal: () => void,
    onChange: (index: number) => void
}

export default ({ options, onChange, isOpen, onCloseModal, title, selectedIndex }: DropdownModal) => (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal} title={title}>
        <RadioGroup 
            onChange={onChange} 
            selectedIndex={selectedIndex}
        >
            {options.map((option: string) => (
                <Radio>{option}</Radio>
            ))}
        </RadioGroup>
    </Modal>
)