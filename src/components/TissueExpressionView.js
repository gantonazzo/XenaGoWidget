import React, {Component} from 'react'
import PropTypes from 'prop-types';
import CanvasDrawing from "../CanvasDrawing";
import ScoreFunctions from '../functions/ScoreFunctions';



export default class TissueExpressionView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {width, height, data, onClick, onHover, titleText,filter} = this.props;
        let titleString  = titleText ? titleText : '';
        let filterString = filter.indexOf('All')===0 ? '' : filter ;
        return (
            <div>
                <h3>{titleString}</h3>
                <CanvasDrawing width={width} height={height} filter={filterString} draw={ScoreFunctions.drawTissueView} data={data} onClick={onClick}
                               onHover={onHover}/>
            </div>
        );
    }
}

TissueExpressionView.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    titleText: PropTypes.string,
    onClick: PropTypes.any.isRequired,
    onHover: PropTypes.any.isRequired,
    filter: PropTypes.any,
    id: PropTypes.any,
};

