import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatMoney, calculatePercentage } from 'helpers/moneyFormatter';
import { TooltipWrapper } from 'data-transparency-ui';

const propTypes = {
    data: PropTypes.array,
    obligationExceedsBudget: PropTypes.bool,
    xScale: PropTypes.func,
    xDomain: PropTypes.array,
    yScale: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    agencyBudget: PropTypes.number,
    todaysDate: PropTypes.number,
    padding: PropTypes.object
};

const AgencyBudgetLine = ({
    data,
    obligationExceedsBudget,
    xScale,
    xDomain,
    yScale,
    height,
    agencyBudget,
    todaysDate,
    padding,
    width
}) => {
    const [show, setShow] = useState(false);
    const [hoveredRectangle, setHoveredRectangle] = useState(false);
    const [lineData, setLineData] = useState({
        x1: 0,
        x2: 0,
        y1: 0
    });
    const [rectangleData, setRectangleData] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        balance: 0,
        percentOfTotal: 0
    });

    useEffect(() => {
        if ((todaysDate >= xDomain[0]) && (todaysDate <= xDomain[1])) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [xScale, xDomain, todaysDate]);

    useEffect(() => {
        if (xScale && yScale && agencyBudget) {
            const y = height - yScale(agencyBudget) - padding.top;
            setLineData(
                {
                    x1: padding.left,
                    x2: show ? xScale(todaysDate) + padding.left : width - padding.left,
                    y1: isNaN(y) ? 0 : y
                }
            );
        }
    }, [xScale, yScale, show]);

    useEffect(() => {
        if (xScale && yScale && data.length) {
            setRectangleData(
                {
                    x: padding.left,
                    y: height - yScale(agencyBudget) - padding.top,
                    width: show ? xScale(todaysDate) : width - padding.left - padding.right,
                    height: height - yScale(data[data.length - 1].obligated) - padding.bottom - padding.top,
                    balance: agencyBudget - data[data.length - 1].obligated,
                    percentOfTotal: calculatePercentage(agencyBudget - data[data.length - 1].obligated, agencyBudget)
                }
            );
        }
    }, [xScale, yScale, show]);

    const tooltip = (
        <div className="budgetary-resources-tooltip">
            <div className="tooltip__title">
                Available Budgetary Resources
            </div>
            <div className="tooltip__text">
                <div className="budgetary-resources-tooltip__desc">Unobligated Balance</div>
                <div className="budgetary-resources-tooltip__desc_percent">Percent of Total</div>
                <div className="budgetary-resources-tooltip__amount">{formatMoney(rectangleData.balance)}</div>
                <div className="budgetary-resources-tooltip__amount_percent">{rectangleData.percentOfTotal}</div>
            </div>
        </div>
    );

    const rectangle = (
        <rect
            className={`${hoveredRectangle ? 'total-budget-difference-hover' : 'total-budget-difference'}`}
            x={rectangleData.x}
            y={rectangleData.y}
            width={rectangleData.width}
            height={rectangleData.height} />
    );
    return (
        <g onMouseEnter={() => setHoveredRectangle(true)} onMouseLeave={() => setHoveredRectangle(false)} className="bar-chart__item">
            <line
                tabIndex="0"
                className="total-budget-line"
                x1={lineData.x1}
                x2={lineData.x2}
                y1={lineData.y1}
                y2={lineData.y1} />
            {!obligationExceedsBudget && rectangle}
            <foreignObject className="tooltip-object-overflow" x={rectangleData.x} y={rectangleData.y} width={rectangleData.width + 7} height={rectangleData.height}>
                <TooltipWrapper className="budgetary-resources__tooltip-wrapper" offsetAdjustments={{ top: -5 }} tooltipComponent={tooltip} />
            </foreignObject>
        </g>
    );
};

AgencyBudgetLine.propTypes = propTypes;
export default AgencyBudgetLine;
