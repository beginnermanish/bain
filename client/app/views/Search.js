import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Container, Dropdown, List, Image, Select, Table } from 'semantic-ui-react'
import axios from 'axios';
import moment from 'moment'
import api from '../../utils/api';
import states from '../common/states';
import { debug } from 'util';
import swal from 'sweetalert2'

const fields = {
    "DRG_Definition": "DRG Definition",
    "Provider_Id": "Id",
    "Provider_Name": "Name",
    "Provider_Street_Address": "Street Address",
    "Provider_City": "City",
    "Provider_State": "State",
    "Provider_Zip_Code": "Zip",
    "Hospital_Referral_Region_Description": "Referral region description",
    "Total_Discharges": "Total discharges",
    "Average_Covered_Charges": "Covered charges",
    "Average_Total_Payments": "Total payments",
    "Average_Medicare_Payments": "Medicare payments"
}

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max_discharges: 11,
            min_discharges: 1,
            max_average_covered_charges: 50000,
            min_average_covered_charges: 40000,
            min_average_medicare_payments: 6000,
            max_average_medicare_payments: 10000,
            state: '',
            providers: []
        }
    }

    doSearch() {
        var me = this;
        const { min_discharges, max_discharges, min_average_covered_charges, max_average_covered_charges, min_average_medicare_payments, max_average_medicare_payments, state } = this.state;
        var token = localStorage.getItem('token');

        axios.get(api.providers, {
            params: {
                max_discharges,
                min_discharges,
                max_average_covered_charges,
                min_average_covered_charges,
                min_average_medicare_payments,
                max_average_medicare_payments,
                state,
                token
            }
        })
            .then(function (response) {
                me.setState({ providers: response.data });
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 403) {
                    swal('Authentication Failed','User is not authorized. Please Login', 'error');
                }
            });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    setValue(e, data) {
        console.log(data.value);
        this.setState({ state: data.value })
    }

    onBookClick(room) {
        console.log(room);
        this.props.history.push('/book?id=' + room._id + '&from=' + moment(this.state.from).format('MM/DD/YYYY') + '&to=' + moment(this.state.to).format('MM/DD/YYYY'));
    }

    getTableHeader() {
        let headerObj = this.state.providers.length > 0 ? Object.keys(this.state.providers[0]) : Object.keys(fields);
        return <Table.Row>
            {headerObj.map((key, index) => {
                return <Table.HeaderCell key={key}>{fields[key]}</Table.HeaderCell>
            })}
        </Table.Row>;
    }

    getTableRow(provider) {
        let headerObj = this.state.providers.length > 0 ? Object.keys(this.state.providers[0]) : Object.keys(fields);
        return <Table.Row>
            {headerObj.map((key, index) => {
                return <Table.Cell key={index}>{provider[key]}</Table.Cell>
            })}
        </Table.Row>
    }

    getListItem(data) {
        return (<List.Content>
            ()Type: {room.type}, Beds: {room.beds}, Max: {room.max_occupancy} People
        </List.Content>);
    }

    render() {
        const { min_discharges, max_discharges, min_average_covered_charges, max_average_covered_charges, min_average_medicare_payments, max_average_medicare_payments, state, providers } = this.state;
        return <Container >
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Min. Discharges' placeholder='Min Discharges' type="number" onChange={this.onChange.bind(this)} value={min_discharges} name="min_discharges" />
                    <Form.Field control={Input} label='Max. Discharges' placeholder='Max Discharges' type="number" onChange={this.onChange.bind(this)} value={max_discharges} name="max_discharges" />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Min average covered charges' placeholder='Min average covered charges' type="number" onChange={this.onChange.bind(this)} value={min_average_covered_charges} name="min_average_covered_charges" />
                    <Form.Field control={Input} label='Max average covered charges' placeholder='Max average covered charges' type="number" onChange={this.onChange.bind(this)} value={max_average_covered_charges} name="max_average_covered_charges" />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Min average medicare payments' type="number" onChange={this.onChange.bind(this)} value={min_average_medicare_payments} name="min_average_medicare_payments" />
                    <Form.Field control={Input} label='Max average medicare payments' type="number" onChange={this.onChange.bind(this)} value={max_average_medicare_payments} name="max_average_medicare_payments" />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Select placeholder='Select state' options={states} onChange={this.setValue.bind(this)} name={state}/>
                    <Form.Field control={Button} content='Search' onClick={this.doSearch.bind(this)} />
                </Form.Group>
            </Form>
            <Container style={{ overflowX: 'scroll', maxHeight: 900 }}>
                <Table celled padded>
                    <Table.Header>
                        {this.getTableHeader(providers)}
                    </Table.Header>
                    <Table.Body>
                        {providers.map((val, index) => {
                            return this.getTableRow(val);
                        })}
                    </Table.Body>
                </Table>
            </Container >
        </Container>
    }
}

export default SearchPanel