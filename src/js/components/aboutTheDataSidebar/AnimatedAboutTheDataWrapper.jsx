/**
 * AnimatedAboutTheDataWrapper.jsx
 * Created by Nick Torres 11/2/22
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AboutTheData from "./AboutTheData";

const propTypes = {
    aboutTheDataSidebar: PropTypes.object,
    schema: PropTypes.object
};

const AnimatedAboutTheDataWrapper = (props) => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (props.aboutTheDataSidebar.display) {
            setTimeout(() => {
                setContent(
                    <CSSTransition
                        classNames="atd-slide"
                        timeout={{ enter: 500, exit: 500 }}>
                        <AboutTheData {...props} />
                    </CSSTransition>
                );
            }, 250);
        }
        else {
            setContent(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.aboutTheDataSidebar.display]);

    return (
        <div className="usa-atd-animations">
            <TransitionGroup>
                {content}
            </TransitionGroup>
        </div>
    );
};

AnimatedAboutTheDataWrapper.propTypes = propTypes;
export default AnimatedAboutTheDataWrapper;
