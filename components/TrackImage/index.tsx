import React from 'react';
import { Avatar } from "@ui-kitten/components";

interface TrackImageProps {
    image: string
}

export default ({ image }: TrackImageProps) => <Avatar size='small' source={{ uri: image }} />