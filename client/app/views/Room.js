import React, { Component } from 'react';
import { Form, Input, Button, Container, Dropdown, Segment } from 'semantic-ui-react'
import axios from 'axios';
import moment from 'moment'
import api from '../../utils/api';

class RoomPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            room: {},
            from: '',
            to: ''
        }
    }

    loadRoomDetails(id) {
        let me = this;
        axios.post(api.room, {
            id: id
        })
            .then(function (response) {
                console.log(response);
                me.setState({ room: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    doReserve(id) {
        axios.post(api.reserve, {
            _id: id,
            from: moment(this.state.from).toDate(),
            to: moment(this.state.to).toDate()
        })
            .then(function (response) {
                console.log(response); 
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(props) {
        let params = this.props.location.query;
        if (params.id) {
            this.loadRoomDetails(params.id);
            this.setState({ from: params.from, to: params.to });
        }
    }

    render() {
        const { room, from, to } = this.state;
        return (
            <Container>
                <Form>
                    <Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>Type</Segment>
                            <Segment>{room.type}</Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>Cost / Night</Segment>
                            <Segment>{room.cost_per_night}</Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>Max Occupancy</Segment>
                            <Segment>{room.max_occupancy}</Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>Room No.</Segment>
                            <Segment>{room.room_number}</Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>From</Segment>
                            <Segment>{from}</Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>To</Segment>
                            <Segment>{to}</Segment>
                        </Segment.Group>
                    </Segment.Group>
                    <Form.Field control={Button} content='Book' onClick={this.doReserve.bind(this, room._id)} />
                </Form>
            </Container>
        );
    }
}

export default RoomPanel;