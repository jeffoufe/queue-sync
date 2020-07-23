import React from 'react';
import { BottomMenu, TopNavigation, Player} from '..';
import { TopNavigationProps } from '../TopNavigation'

interface LayoutProps extends TopNavigationProps {
    children: React.ReactNode
}

export default ({ children, ...props }: LayoutProps) => (
    <>
        {children}
        <Player />
        <BottomMenu navigation={props.navigation} />
    </>
)