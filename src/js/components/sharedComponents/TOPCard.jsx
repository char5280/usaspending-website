/**
 * TOPCard.jsx
 * Created by Nick Torres 06/15/2022
 */

import React from 'react';
import PropTypes from "prop-types";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const propTypes = {
    image: PropTypes.object,
    heading: PropTypes.object,
    text: PropTypes.object,
    button: PropTypes.object,
    imageColor: PropTypes.string
};

const TOPCard = ({
    image, heading, text, button, imageColor
}) => (
    <FlexGridRow className="topcard-content">
        <FlexGridCol width={6} desktop={12} className="topCard__image-wrapper">
            <div style={{ backgroundColor: imageColor }}>
                {image}
            </div>
        </FlexGridCol>
        <FlexGridCol width={6} desktop={12} className="topCard__heading-wrapper">
            {heading}
        </FlexGridCol>
        <FlexGridCol width={6} desktop={12} className="topCard__text-wrapper">
            <p>{text}</p>
        </FlexGridCol>
        <FlexGridCol width={6} desktop={12} className="topCard__button-wrapper">
            {button}
        </FlexGridCol>
    </FlexGridRow>
);

TOPCard.propTypes = propTypes;
export default TOPCard;
