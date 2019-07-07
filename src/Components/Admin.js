import React, { Component } from 'react'
import View1 from './View1';
import { Item,Segment,Button,Modal,Form } from 'semantic-ui-react'
import Portis from "@portis/web3";
import Web3 from "web3";
import token2 from './Abis2';
const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);
var admin;

export class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            Company: ''
        }
    }
    async componentDidMount() {
        this.getJobInfo();
        admin = await portis.provider.enable();
        console.log(admin);
      }
    
      getJobInfo = _ => {
        fetch("http://localhost:5000/jobs")
          .then(res => res.json())
          .then(res => this.setState({ jobs: res.data }))
          .catch(err => console.log(err));
      };

      handleSubmit =id => (event) =>{
          event.preventDefault();
         
          
        console.log(id)
        var url = "http://localhost:5000/CompanyEntry/?id="+id;
        console.log(url);

    fetch(url, {
        method: "PUT", // or 'PUT'
        mode: "cors",
        body: JSON.stringify({
            company_id: this.state.Company
        }), 
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.body)
        .then(response => console.log("Success:", JSON.stringify(response)))
        .then(console.log(this.state.Company))
        .then(token2.methods.ForwardRequest(id,String(this.state.Company)).send({from:String(admin)}))
        //.then(window.location.reload())
        .catch(error => console.error("Error:", error));
    };
    logChange = e => {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return (
        <div>
        <h1>The GREAT ADMIN Page</h1>
        <Item.Group divided>
            {this.state.jobs.map(job =>
                    <Segment>
                    <Item>
                        <Item.Content verticalAlign='middle'>You have a request of ID-<b>{job.vr_id}</b></Item.Content>
                        <Modal trigger={<Button>View Document</Button>}>
                        <Modal.Header>The Document-</Modal.Header>
                        <Modal.Content>
                          <Modal.Description>
                              <View1 src={job.swarm_id} />
                          </Modal.Description>
                        </Modal.Content>
                        </Modal>
                    </Item>
                    <Form method="post">
                    <Form.Group widths='equal'>
                    <Form.Input fluid label='Enter Company Address' name='Company' value={this.state.Company} placeholder='Company Address' onChange={this.logChange} required/>
                    <Button onClick={this.handleSubmit(job.vr_id)} primary>Update Company</Button>
                    </Form.Group>
                    </Form>
                    </Segment>
            )}
        </Item.Group>
        </div>
        )
    }
}

export default Admin
