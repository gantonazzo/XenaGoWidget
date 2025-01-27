import React from 'react'
import PureComponent from './PureComponent';
import PropTypes from 'prop-types';
import Dialog from "react-toolbox/lib/dialog";
import Checkbox from "react-toolbox/lib/checkbox";
import {isEqual} from 'underscore';
import {Button} from "react-toolbox/lib/button";


export class SubCohortSelector extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            originalSelectedSubCohorts:props.selectedSubCohorts,
            selectedSubCohorts:props.selectedSubCohorts,
            allSelected:isEqual(props.selectedSubCohorts.sort(),props.subCohortsForSelected.sort())
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.selectedCohort!==prevProps.selectedCohort){
            this.setState({
                selectedSubCohorts:this.props.selectedSubCohorts,
                originalSelectedSubCohorts:this.props.selectedSubCohorts,
                allSelected:isEqual(this.props.selectedSubCohorts.sort(),this.props.subCohortsForSelected.sort()),
            })
        }
        else{
            this.setState({
                originalSelectedSubCohorts:this.props.selectedSubCohorts,
                allSelected:isEqual(this.props.selectedSubCohorts.sort(),this.props.subCohortsForSelected.sort()),
            })
        }
    }

    handleChange = (value,field) => {
        let newSelected = JSON.parse(JSON.stringify(this.state.selectedSubCohorts)) ;
        if(value){
           newSelected.push(field);
        }
        else{
            let indexValue = newSelected.indexOf(field);
            newSelected.splice(indexValue,1)
        }
        let allSelected = isEqual(this.props.subCohortsForSelected.sort(),newSelected.sort()) ;
        this.setState({
            selectedSubCohorts:newSelected,
            allSelected,
        });
    };

    selectAll(){
        this.setState({
            selectedSubCohorts:this.props.subCohortsForSelected,
            allSelected:true,
        });
        this.props.handleSubCohortChange(this.props.subCohortsForSelected);
    }

    updateSubCategories(){
        this.props.handleSubCohortChange(this.state.selectedSubCohorts);
    }

    cancelUpdate(){
        this.setState({
            selectedSubCohorts:this.state.originalSelectedSubCohorts,
        });
        this.props.handleSubCohortChange(this.state.originalSelectedSubCohorts);
    }

    render() {

        let {active, handleToggle,subCohortsForSelected,cohortLabel,selectedCohort} = this.props;
        let {allSelected,selectedSubCohorts} = this.state ;

        return (
            <Dialog
                active={active}
                onEscKeyDown={handleToggle}
                onOverlayClick={handleToggle}
                title='Edit Sub-Cohorts'
            >
                <table style={{ width:'100%'}}>
                    <tbody>
                    <tr>
                        <td>
                            ({cohortLabel}) Select Sub Cohorts for {selectedCohort}
                        </td>
                    </tr>
                    <tr>
                        <td>
                                {
                                    subCohortsForSelected.sort().map( cs =>{
                                       return (
                                           <Checkbox label={cs} key={cs}
                                                     checked={selectedSubCohorts.indexOf(cs)>=0}
                                                     onChange={ (value) => this.handleChange(value,cs)}
                                                     disabled={selectedSubCohorts.length<2 && selectedSubCohorts.indexOf(cs)>=0}
                                                     />
                                       )
                                    })
                                }
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Button icon='save' label='Save' primary raised
                                onClick={ () => this.updateSubCategories()}
                        />
                            {!allSelected &&
                            <Button label={`Select All`} primary raised
                                    onClick={() => this.selectAll()}
                            />
                            }
                            {allSelected &&
                            <Button label={`Select All`} primary raised disabled
                                    onClick={() => this.selectAll()}
                            />
                            }
                        {/*</td>*/}
                        {/*<td>*/}
                        <Button icon='cancel' label='Cancel' raised
                                onClick={ () => this.cancelUpdate()}
                        />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Dialog>
        );

    }

}

SubCohortSelector.propTypes = {
    active: PropTypes.any.isRequired,
    handleToggle: PropTypes.any.isRequired,
    handleSubCohortChange: PropTypes.any.isRequired,
    selectedCohort: PropTypes.any.isRequired,
    selectedSubCohorts: PropTypes.any,
    subCohortsForSelected: PropTypes.any,
};
