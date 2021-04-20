/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import * as MoneyFormatter from 'helpers/moneyFormatter';

export default class ObligationsByAwardType extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    height: PropTypes.number.required,
    width: PropTypes.number.required,
  };
  // static defaultProps = {
  // };

  // componentDidMount = () =>  ;

  // shouldComponentUpdate = () =>  ;


  // get /api/v2/agency/{toptier}/obligations_by_award_category/{?fiscal_year}
  getTypeAndDisplay = (category) => {
    switch (category) {
      case 'contracts':
        return ['Contracts', 'Contracts'];
      case 'direct_payments':
        return ['Contracts', 'Direct Payments'];
      case 'grants':
        return ['Financial Assistance', 'Grants'];
      case 'idvs':
        return ['Financial Assistance', 'IDVs'];
      case 'loans':
        return ['Financial Assistance', 'Loans'];
      case 'other':
        return ['Financial Assistance', 'Other'];

      default:
        console.error('Category name passed to getTypeAndDisplay not recognized : ' + category);
    }

  }
}

render = () => {
  // Create dummy data
  var details = [9, 20, 30, 5, 12, 10];
  var categories = [64, 22];

  const labelRadius = Math.min(this.props.width, this.props.height) / 2 * .8;
  const categoriesRadius = labelRadius * .9;
  const categoriesStrokeWidth = 5;
  const detailsRadius = labelRadius * .8;

  // append the svg object to the div called 'my_dataviz'
  d3.select('#obl_chart').selectAll('*').remove();
  const svg = d3.select('#obl_chart')
    .append('svg')
    .attr('width', this.props.width)
    .attr('height', this.props.height)
    .append('g')
    .attr('transform', 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')')
    ;

  const categoriesArc = d3.arc().outerRadius(categoriesRadius).innerRadius(categoriesRadius - categoriesStrokeWidth);
  const categoriesPie = d3.pie().sortValues(null)(categories);
  const detailsPie = d3.pie().sortValues(null)(details);
  const categoriesColors = d3.scaleOrdinal(['#FFBC78', '#A9ADD1']); // [Assistance, Contracts]
  const detailsColors = d3.scaleOrdinal(['#C05600', '#FA9441', '#E66F0E', '#FFBC78', '#545BA3', '#A9ADD1']); // [Grants, Loans, Direct Payments, Other FA, Contract IDV, Contracts]

  // categories
  svg
    .selectAll()
    .data(categoriesPie)
    .enter()
    .append('path')
    .attr('d', categoriesArc)
    .attr('fill', (d, i) => categoriesColors(i))
    ;

  // details
  svg
    .selectAll()
    .data(detailsPie)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .outerRadius(detailsRadius)
      .innerRadius(detailsRadius / 2)
    )
    .attr('fill', (d, i) => detailsColors(i))
    ;

  // border between categories (assumes only 2)
  const borders = [[0, categoriesRadius], [0, 0], [categoriesPie[0].endAngle, categoriesRadius]];
  svg
    .selectAll()
    .data([0]) // one polyline, data in borders
    .enter()
    .append('path')
    .attr('d', d3.lineRadial()(borders))
    .attr('stroke', 'white')
    .attr('stroke-width', 3)
    .attr('fill', 'none')
    ;

  const labelPos = d => {
    const pos = categoriesArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    pos[0] = labelRadius * (midangle < Math.PI ? 1 : -1);
    return pos;
  }

  // callout labels
  svg
    .selectAll()
    .data(categoriesPie)
    .enter()
    .append('text')
    .text(d => d.data)
    .attr('transform', d => 'translate(' + labelPos(d) + ')')
    ;

  // callout lines
  svg
    .selectAll()
    .data(categoriesPie)
    .enter()
    .append('polyline')
    .attr('points', d => [labelPos(d), categoriesArc.centroid(d)])
    .attr('stroke', 'black')
    .attr('stroke-width', 3)
    ;

  return <div id='obl_chart' style={{ width: '100%' }} />;
}
}
