import React, { Component } from 'react';
import MediaStreamRecorder from 'msr';
import { registerUser, enrollVoiceSignature } from '../services/AuthService';

  class VoiceProfile extends Component {
      state = {userid:''};
    componentDidMount(){
        registerUser('madhur123',(data)=>{
            let userInfo = JSON.parse(data);
            console.log('username', userInfo.data.userId);
            this.setState({userid: userInfo.data.userId})
        })
    }

    record= (event) =>{

        const mediaConstraints = {
            audio: true,    // don't forget audio!
            video: false     // don't forget video!
        };
        navigator.getUserMedia(mediaConstraints,(stream)=>{
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav';
            mediaRecorder.ondataavailable =  (blob) =>{
                blob.lastModifiedDate = new Date();
                blob.name = 'speechsignature.wav';

                 var bodyFormData = new FormData();
                 console.log('userid>> ', this.state.userid);
                 bodyFormData.append('userId', this.state.userid);
                 bodyFormData.append('phrase', 'Login for secure services please');
                 bodyFormData.append('recording', blob);
                
                enrollVoiceSignature(bodyFormData,(res)=>{
                    console.log(res);
                })
                mediaRecorder.stop();
            }
            mediaRecorder.start(5000);
        },(err)=>{
            console.log(err);
        })

    }
    render(){
        return(
            <div className="ui cards" style={{marginTop:'100px', marginLeft:'150px'}}>
                <div className="cards" style={{marginTop:'50px'}}>
            <div><h3>Voice Profile</h3></div>
        <div className="ui compact message">Username:  {this.state.userid}</div>
            <div style={{marginTop:'50px'}}><h4>Phrase: Login for secure services please</h4></div>

            <div style={{marginTop:'300px', marginLeft:'70px'}}>
                <i className='microphone huge icon' onClick={this.record}></i>
            </div>
            </div>
            </div>
            
               
        )
    }
  }
  export default VoiceProfile;
