import React from 'react';
import { connect } from 'react-redux';
import { retrieveEvents, createEvent, removeEvent, setBusy, updateEvent } from '../Actions';
import { DataTable, Content, Button, Modal, Form, FormGroup, NumberInput, TextInput, DatePicker, DatePickerInput } from 'carbon-components-react';
import { Delete16, Edit16 } from '@carbon/icons-react';
const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableHeader,
    TableToolbar,
    TableToolbarContent
} = DataTable;


class ManageEvents extends React.Component {
    state = {
        modalShow: false,
        eventDate: new Date().getTime(),
        eventLocation: "",
        eventHelpline: "",
        eventEmail: "",
        eventId: Math.random().toString(36).substring(2, 15),
        totalTickets: 100,
        mode: 0
    }

    componentWillMount(){
        this.props.retrieveEventsList();
    }

    _handleEventDateChange = (e) => {
        this.setState({eventDate: new Date(e).getTime()});
    }

    _handleEventLocationChange = (e) => {
        this.setState({eventLocation: e.target.value});
    }

    _handleEventHelplineChange = (e) => {
        this.setState({eventHelpline: e.target.value});
    }

    _handleEventEmailChange = (e) => {
        this.setState({eventEmail: e.target.value});
    }
    
    _handleTotalTicketsChange = (e) => {
        this.setState({totalTickets: e.imaginaryTarget.valueAsNumber});
    }

    _handleAddEventPrep = () => {
        this.setState({
            eventId: Math.random().toString(36).substring(2, 15), 
            eventLocation: "", 
            eventHelpline: "", 
            eventEmail: "", 
            eventDate: new Date().getTime(), 
            totalTickets: 0, 
            modalShow: true, 
            mode: 0
        })
    }

    _handleAddEvent = async() => {
        await this.props.addEvent({
            eventId: this.state.eventId,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            eventHelpline: this.state.eventHelpline,
            eventEmail: this.state.eventEmail,
            totalTickets: this.state.totalTickets
        });
        this.setState({
            eventId: Math.random().toString(36).substring(2, 15), 
            eventLocation: "", 
            eventHelpline: "", 
            eventEmail: "", 
            eventDate: new Date().getTime(), 
            totalTickets: 0, 
            modalShow: false, 
            mode: 0
        });
    }

    _handleDeleteEvent = async(eventId) => {
        await this.props.deleteEvent(eventId);
    }

    _handleUpdateEventPrep = (event) => {
        this.setState({
            eventId: event.eventId,
            eventDate: event.eventDate,
            eventLocation: event.eventLocation,
            eventHelpline: event.eventHelpline,
            eventEmail: event.eventEmail,
            totalTickets: event.totalTickets,
            modalShow: true,
            mode: 1
        });
    }

    _handleUpdateEvent = async() => {
        await this.props.editEvent({
            eventId: this.state.eventId,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            eventHelpline: this.state.eventHelpline,
            eventEmail: this.state.eventEmail,
            totalTickets: this.state.totalTickets
        });
        this.setState({
            eventId: Math.random().toString(36).substring(2, 15), 
            eventLocation: "", 
            eventHelpline: "", 
            eventEmail: "", 
            eventDate: new Date().getTime(), 
            totalTickets: 0, 
            modalShow: false, 
            mode: 0
        });
    }

    render(){
        return(
            <>
                <Modal 
                    open={this.state.modalShow}
                    primaryButtonText="Close"
                    secondaryButtonText={!this.state.mode?"Add":"Update"}
                    onRequestClose={() => this.setState({modalShow: false, mode: 0})}
                    onRequestSubmit={() => this.setState({modalShow: false})}
                    onSecondarySubmit={!this.state.mode?this._handleAddEvent:this._handleUpdateEvent}
                >
                    <Form>
                        <FormGroup legendText={"Event Details"}>
                            <TextInput
                                id="event-id"
                                disabled={true}
                                value={this.state.eventId}
                                labelText="Event ID (Auto-Generated)"
                                type="text"
                                required
                            />
                            <br />
                            <DatePicker required dateFormat="m/d/Y" datePickerType="single" value={this.state.eventDate} onChange={this._handleEventDateChange}>
                                <DatePickerInput 
                                    id="event-date"
                                    placeholder="mm/dd/yyyy"
                                    labelText="Event Date"
                                    type="text"
                                />
                            </DatePicker>
                            <br />
                            <TextInput
                                id="event-location"
                                value={this.state.eventLocation}
                                labelText="Event Location"
                                onChange={this._handleEventLocationChange}
                                placeholder="Moon Heights, Bangalore"
                                type="text"
                                required
                            />
                            <br />
                            <TextInput
                                id="event-helpline"
                                value={this.state.eventHelpline}
                                labelText="Event Helpline"
                                onChange={this._handleEventHelplineChange}
                                placeholder="9999999999"
                                type="text"
                                required
                            />
                            <br />
                            <TextInput
                                id="event-email"
                                value={this.state.eventEmail}
                                labelText="Event EMail"
                                onChange={this._handleEventEmailChange}
                                placeholder="abc@example.com"
                                type="text"
                                required
                            />
                            <br />
                            <NumberInput
                                id="total-tickets"
                                label="Total Tickets"
                                max={50000}
                                min={1}
                                onChange={this._handleTotalTicketsChange}
                                step={1}
                                value={this.state.totalTickets}
                                required
                            />
                        </FormGroup>
                    </Form>
                </Modal>
                <Content>
                    <TableContainer title="All Events">
                        <TableToolbar>
                            <TableToolbarContent>
                                <Button
                                    disabled={!this.props.user.isAdmin}
                                    tabIndex={0}
                                    onClick={() => this._handleAddEventPrep()}
                                    size="small"
                                    kind="primary">
                                    Add Event
                                </Button>
                            </TableToolbarContent>
                            </TableToolbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader key="edit">
                                    </TableHeader>
                                    <TableHeader key="eventId">
                                        Event Id
                                    </TableHeader>
                                    <TableHeader key="eventDate">
                                        Event Date
                                    </TableHeader>
                                    <TableHeader key="eventLocation">
                                        Event Location
                                    </TableHeader>
                                    <TableHeader key="eventHelpline">
                                        Event Helpline
                                    </TableHeader>
                                    <TableHeader key="eventEMail">
                                        Event EMail
                                    </TableHeader>
                                    <TableHeader key="totalTickets">
                                        Total Tickets
                                    </TableHeader>
                                    <TableHeader key="delete">
                                    </TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.allEvents?
                                    this.props.allEvents.map(event => {
                                        return(
                                            <TableRow key={event.eventId}>
                                                <TableCell>
                                                    <Button disabled={!this.props.user.isAdmin} kind={"ghost"} renderIcon={Edit16} onClick={() => this._handleUpdateEventPrep(event)} />
                                                </TableCell>
                                                <TableCell>
                                                    {event.eventId}
                                                </TableCell>
                                                <TableCell>
                                                    {event.eventDate}
                                                </TableCell>
                                                <TableCell>
                                                    {event.eventLocation}
                                                </TableCell>
                                                <TableCell>
                                                    {event.eventHelpline}
                                                </TableCell>
                                                <TableCell>
                                                    {event.eventEmail}
                                                </TableCell>
                                                <TableCell>
                                                    {event.totalTickets}
                                                </TableCell>
                                                <TableCell>
                                                    <Button disabled={!this.props.user.isAdmin} kind={"ghost"} renderIcon={Delete16} onClick={() => this._handleDeleteEvent(event.eventId)}/>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }):
                                    <></>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Content>
            </>
        )
    }
}

function mapStateToProps(state){
    return {
      allEvents: state.allEvents,
      user: state.user,
      busy: state.busy
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        retrieveEventsList: async() => {
            dispatch(await setBusy());
            dispatch(await retrieveEvents());
        },
        addEvent: async(data) => {
            dispatch(await setBusy());
            dispatch(await createEvent(data));
        },
        deleteEvent: async(eventId) => {
            dispatch(await setBusy());
            dispatch(await removeEvent(eventId));
        },
        editEvent: async(data) => {
            dispatch(await setBusy());
            dispatch(await updateEvent(data));
            dispatch(await retrieveEvents());
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ManageEvents);