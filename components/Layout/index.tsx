import React from 'react';
import { useSelector } from 'react-redux';
import { BottomMenu, Player } from '..';
import { TopNavigationProps } from '../TopNavigation'

interface LayoutProps extends TopNavigationProps {
    children: React.ReactNode
}

export default ({ children, ...props }: LayoutProps) => {
    const { selectedTrack, playlistToBeAdded } = useSelector((state: any) => state.library);
    const isBottomVisible = !selectedTrack && !playlistToBeAdded
    return (
        <>
            {children}
            {isBottomVisible && <Player />}
            {isBottomVisible && <BottomMenu navigation={props.navigation} />}
        </>
    )
}