<template>
        <div class="recording">
            <h2> Recording Menu </h2>
            <button @click="startRecording" :disabled="isRecording">Start Recording</button>
            <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
            <button @click="mergeChunks" :disabled="chunks.length === 0">Merge Audio</button>
            <button @click="retrieveAudio" v-if="audioUrl">Retrieve Audio</button>
        </div>

</template>

<script>
import axios from "axios";

export default {
    name: 'RecordingPage',
    data() {
        return {
            isRecording: false, // Indicates if recording is active
            chunks : [], // store the chunks in array
            audioRecorder : null, // Media recorder instance
            audioUrl : "" // URL of the merged audio file
        };
    },
    methods: {
        async startRecording(){
            this.isRecording = true;
            const stream = await navigator.mediaDevices.getUserMedia({audio : true}); // get permissions for microphone from user 
            const recorder = new MediaRecorder(stream); // pass the microphone to Media recorder instance for creating the instance
            this.audioRecorder = recorder;

            
            recorder.ondataavailable = async (event) =>{
                console.log("Event data:", event.data);
                this.chunks.push(event.data);
                const formdata = new FormData();
                formdata.append("chunk", event.data);
                await axios.post('https://vwawgovkn0.execute-api.eu-west-1.amazonaws.com/audio/add', formdata);

            };

            recorder.start(10000); // record in chunks of 10seconds
        },
       async stopRecording(){
            this.isRecording = false;
            this.audioRecorder.stop();
        },
        async mergeAudio(){
            await axios.post('/audio/merge');
            alert('Audio merged successfully');
        },
        async retrieveAudio(){
            await axios.get('/audio/retrieve');
            alert('Audio retrived successfully');
        }

    },
};
</script>