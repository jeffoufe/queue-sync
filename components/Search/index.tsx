import React from 'react';
import { Input } from '..';
import { debounce } from 'lodash';

interface SearchProps {
    placeholder?: string,
    disabled?: boolean,
    onSearch: (text: string) => void
}

interface SearchText {
    search: string
};

export default class extends React.Component<SearchProps, SearchText> {
    debouncedSearch = debounce(() => this.props.onSearch(this.state.search), 500);

    onSearch = (search: string) => {
        this.setState({ search }, () => {
            this.debouncedSearch()
        })
    }

    render() {
        return (
            <Input 
                placeholder={this.props.placeholder}
                onChange={this.onSearch}
                disabled={this.props.disabled}
            />
        );
    }
}

