/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlexGridRow, FlexGridCol, FlexGridContainer } from 'data-transparency-ui';
import DrilldownSidebar from './DrilldownSidebar';
import VisualizationSection from './VisualizationSection';

const propTypes = {
    agencyId: PropTypes.string,
    fy: PropTypes.string
};

export const levels = ['Subcomponent', 'Federal Account'];

const StatusOfFunds = ({ agencyId, fy }) => {
    const [level, setLevel] = useState(0);
    return (
        <div className="body__content status-of-funds">
            <FlexGridContainer>
                <FlexGridRow className="status-of-funds__intro" hasGutter>
                    <FlexGridCol>
                        DEV-8046 Intro: agency {agencyId}, FY {fy}
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow hasGutter>
                    <FlexGridCol className="status-of-funds__drilldown-sidebar" tablet={3}>
                        <DrilldownSidebar level={level} setLevel={setLevel} />
                    </FlexGridCol>
                    <FlexGridCol className="status-of-funds__visualization" tablet={9}>
                        <VisualizationSection level={level} agencyId={agencyId} fy={fy} />
                    </FlexGridCol>
                </FlexGridRow>
            </FlexGridContainer>
        </div>
    );
};

StatusOfFunds.propTypes = propTypes;
export default StatusOfFunds;
