//constructor(props){
    //       super(props);
    //       this.state ={ audio:null};
    //       this.toggleMic = this.toggleMic.bind(this);
    //   }

    // async getMicrophone() {
    //     const audio = await navigator.mediaDevices.getUserMedia({
    //         audio: true,
    //         video: false
    //     });
    //     this.setState({audio})

    // }

    // stopMicrophone(){

    //    this.state.audio.getTracks().forEach(track=>track.stop());
    //    console.log('audio >> ', this.state.audio);
    // //    fs.writeFile('./output.wav', this.state.audio, () =>{
    // //        console.log('hi');
    // //    })
        
    //    this.setState({audio:null})
    // }

    // toggleMic(){
    //     if(this.state.audio){
    //         this.stopMicrophone();
    //     }else{
    //         this.getMicrophone();
    //     }
    // }