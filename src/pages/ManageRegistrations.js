import React from 'react';
import { connect } from 'react-redux';
import { retrieveEventRegistrations, createEventRegistration, removeEventRegistration, setBusy, updateEventRegistration } from '../Actions';
import { DataTable, Content, Button, Modal, Form, FormGroup, NumberInput, TextInput, Select, FileUploader, SelectItem } from 'carbon-components-react';
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


class ManageRegistrations extends React.Component {
    state = {
        idCardStatus: 'edit',
        modalShow: false,
        registeredName: "",
        registeredPhone: "",
        registeredEmail: "",
        registeredIDCard: "",
        eventId: this.props.allEvents[0].eventId,
        type: "Self",
        ticketCount: 1,
        regId: Math.random().toString(36).substring(2, 15),
        mode: 0,
        ticketCountDisabled: true
    }

    componentWillMount(){
        this.props.retrieveEventRegistrationsList();
    }

    _handleNameChange = (e) => {
        this.setState({registeredName: e.target.value});
    }

    _handlePhoneChange = (e) => {
        this.setState({registeredPhone: e.target.value});
    }

    _handleEmailChange = (e) => {
        this.setState({registeredEmail: e.target.value});
    }

    _handleIDCardChange = (e) => {
        this.setState({registeredIDCard: e.target.value});
    }
    
    _handleEventIdChange = (e) => {
        this.setState({eventId: e.target.value});
    }

    _handleTypeChange = (e) => {
        if(e.target.value === "Self"){
            this.setState({ticketCount: 1, ticketCountDisabled: true})
        } else {
            this.setState({ticketCountDisabled: false})
        }
        this.setState({type: e.target.value});
    }

    _handleTicketCountChange = (e) => {
        this.setState({ticketCount: e.imaginaryTarget.valueAsNumber});
    }

    _handleIDCardChange = (e) => {
        this.setState({idCardStatus: 'uploading'});
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            let size = (((6*e.target.result.length)/8)/1024);
            if(size > 100){
                alert('File size is bigger than expected. Backend DB may reject the request.');
            }
            this.setState({registeredIDCard: e.target.result, idCardStatus: 'edit'});
        }
    }

    _handleAddEventRegistrationPrep = () => {
        this.setState({
            modalShow: true,
            registeredName: "",
            registeredPhone: "",
            registeredEmail: "",
            registeredIDCard: "",
            type: "Self",
            ticketCount: 1,
            regId: Math.random().toString(36).substring(2, 15),
            mode: 0
        })
    }

    _handleAddEventRegistration = async() => {
        await this.props.addEventRegistration({
            registeredName: this.state.registeredName,
            registeredPhone: this.state.registeredPhone,
            registeredEmail: this.state.registeredEmail,
            registeredIDCard: this.state.registeredIDCard,
            eventId: this.state.eventId,
            type: this.state.type,
            ticketCount: this.state.ticketCount,
            regId: this.state.regId
        });
        this.setState({
            modalShow: false,
            registeredName: "",
            registeredPhone: "",
            registeredEmail: "",
            registeredIDCard: "",
            type: "Self",
            ticketCount: 1,
            regId: Math.random().toString(36).substring(2, 15),
            mode: 0
        });
    }

    _handleDeleteEventRegistration = async(regId) => {
        await this.props.deleteEventRegistration(regId);
    }

    _handleUpdateEventRegistrationPrep = (eventRegistration) => {
        console.log(eventRegistration);
        this.setState({
            registeredPhone: eventRegistration.registeredPhone,
            registeredName: eventRegistration.registeredName,
            registeredEmail: eventRegistration.registeredEmail,
            registeredIDCard: eventRegistration.registeredIDCard,
            eventId: eventRegistration.eventId,
            type: eventRegistration.type,
            ticketCount: eventRegistration.ticketCount,
            regId: eventRegistration.regId,
            mode: 1,
            modalShow: true
        });
    }

    _handleUpdateEventRegistration = async() => {
        await this.props.editEventRegistration({
            registeredName: this.state.registeredName,
            registeredPhone: this.state.registeredPhone,
            registeredEmail: this.state.registeredEmail,
            registeredIDCard: this.state.registeredIDCard,
            eventId: this.state.eventId,
            type: this.state.type,
            ticketCount: this.state.ticketCount,
            regId: this.state.regId
        });
        this.setState({
            modalShow: false,
            registeredName: "",
            registeredPhone: "",
            registeredEmail: "",
            registeredIDCard: "",
            type: "Self",
            ticketCount: 1,
            regId: Math.random().toString(36).substring(2, 15),
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
                    onSecondarySubmit={!this.state.mode?this._handleAddEventRegistration:this._handleUpdateEventRegistration}
                >
                    <Form>
                        <FormGroup legendText={"Event Registrations Details"}>
                            <TextInput
                                id="event-reg-id"
                                disabled={true}
                                value={this.state.regId}
                                labelText="Event Registration ID (Auto-Generated)"
                                type="text"
                                required
                            />
                            <br />
                            <TextInput
                                id="event-reg-name"
                                value={this.state.registeredName}
                                labelText="Registered Name"
                                onChange={this._handleNameChange}
                                placeholder="Mark Clair"
                                type="text"
                                required
                            />
                            <br />
                            <TextInput
                                id="event-reg-phone"
                                value={this.state.registeredPhone}
                                labelText="Registered Phone"
                                onChange={this._handlePhoneChange}
                                placeholder="9999999999"
                                type="text"
                                required
                            />
                            <br />
                            <TextInput
                                id="event-helpline"
                                value={this.state.registeredEmail}
                                labelText="Registered Email"
                                onChange={this._handleEmailChange}
                                placeholder="abc@example.com"
                                type="text"
                                required
                            />
                            <br />
                            <FileUploader
                                accept={[
                                    '.jpg',
                                    '.png'
                                ]}
                                required
                                filenameStatus={this.state.idCardStatus}
                                buttonKind="primary"
                                buttonLabel={this.state.mode?"Change":"Upload ID Card"}
                                labelDescription="only jpg/png files upto 100kb are allowed"
                                onDelete={() => this.setState({registeredIDCard: ""})}
                                onChange={this._handleIDCardChange}
                            />
                            <br />
                            <Select value={this.state.type} required labelText="Type" onChange={this._handleTypeChange}>
                                <SelectItem
                                    text="Self"
                                    value="Self"
                                />
                                <SelectItem 
                                    text="Group"
                                    value="Group"
                                />
                                <SelectItem 
                                    text="Corporate"
                                    value="Corporate"
                                />
                                <SelectItem 
                                    text="Others"
                                    value="Others"
                                />
                            </Select>
                            <br />
                            <Select required labelText="Event ID" value={this.state.eventId} onChange={this._handleEventIdChange}>
                                {
                                    this.props.allEvents?
                                    this.props.allEvents.map(event => {
                                        return(
                                            <SelectItem 
                                                text={event.eventId}
                                                value={event.eventId}
                                            />
                                        )
                                    }):
                                    <></>
                                }
                            </Select>
                            <br />
                            <NumberInput
                                required
                                id="ticket-count"
                                label="Ticket Count"
                                max={50000}
                                min={1}
                                disabled={this.state.ticketCountDisabled}
                                onChange={this._handleTicketCountChange}
                                step={1}
                                value={this.state.ticketCount}
                            />
                        </FormGroup>
                    </Form>
                </Modal>
                <Content>
                    <TableContainer title="All Event Registrations">
                        <TableToolbar>
                            <TableToolbarContent>
                                <Button
                                    tabIndex={0}
                                    onClick={() => this._handleAddEventRegistrationPrep()}
                                    size="small"
                                    kind="primary">
                                    Add Event Registration
                                </Button>
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader key="edit">
                                    </TableHeader>
                                    <TableHeader key="eventId">
                                        Registration Id
                                    </TableHeader>
                                    <TableHeader key="eventDate">
                                        Registered Name
                                    </TableHeader>
                                    <TableHeader key="eventLocation">
                                        Registered Phone
                                    </TableHeader>
                                    <TableHeader key="eventHelpline">
                                        Registered Email
                                    </TableHeader>
                                    <TableHeader key="eventEMail">
                                        Registered ID Card
                                    </TableHeader>
                                    <TableHeader key="totalTickets">
                                        Event ID
                                    </TableHeader>
                                    <TableHeader key="totalTickets">
                                        Type
                                    </TableHeader>
                                    <TableHeader key="totalTickets">
                                        Ticket Count
                                    </TableHeader>
                                    <TableHeader key="delete">
                                    </TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.allRegistrations?
                                    this.props.allRegistrations.map(reg => {
                                        return(
                                            <TableRow key={reg.regId}>
                                                <TableCell>
                                                    <Button disabled={!this.props.user.isAdmin} kind={"ghost"} renderIcon={Edit16} onClick={() => this._handleUpdateEventRegistrationPrep(reg)} />
                                                </TableCell>
                                                <TableCell>
                                                    {reg.regId}
                                                </TableCell>
                                                <TableCell>
                                                    {reg.registeredName}
                                                </TableCell>
                                                <TableCell>
                                                    {reg.registeredPhone}
                                                </TableCell>
                                                <TableCell>
                                                    {reg.registeredEmail}
                                                </TableCell>
                                                <TableCell>
                                                    <img src={reg.registeredIDCard} width="64" alt={`id ${reg.regId}`}/>
                                                </TableCell>
                                                <TableCell>
                                                    {reg.eventId}
                                                </TableCell>
                                                <TableCell>
                                                    {reg.type}
                                                </TableCell>
                                                <TableCell>
                                                    {reg.ticketCount}
                                                </TableCell>
                                                <TableCell>
                                                    <Button disabled={!this.props.user.isAdmin} kind={"ghost"} renderIcon={Delete16} onClick={() => this._handleDeleteEventRegistration(reg.regId)}/>
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
      allRegistrations: state.allRegistrations,
      allEvents: state.allEvents,
      user: state.user,
      busy: state.busy
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        retrieveEventRegistrationsList: async() => {
            dispatch(await setBusy());
            dispatch(await retrieveEventRegistrations());
        },
        addEventRegistration: async(data) => {
            dispatch(await setBusy());
            dispatch(await createEventRegistration(data));
        },
        deleteEventRegistration: async(eventId) => {
            dispatch(await setBusy());
            dispatch(await removeEventRegistration(eventId));
        },
        editEventRegistration: async(data) => {
            dispatch(await setBusy());
            dispatch(await updateEventRegistration(data));
            dispatch(await retrieveEventRegistrations());
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ManageRegistrations);