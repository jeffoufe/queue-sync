import React from 'react';
import { Avatar } from "@ui-kitten/components";

interface TrackImageProps {
    image: string
}

export default ({ image }: TrackImageProps) => (
    <Avatar 
        size='small' 
        height={35}
        width={35}
        source={{ uri: image }} 
    />
);