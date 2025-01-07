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
            chunks: [], // store the chunks in array
            audioRecorder: null, // Media recorder instance
            audioUrl: "" // URL of the merged audio file
        };
    },
    methods: {

        async startRecording() {
            this.isRecording = true;
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Get microphone permissions
            const recorder = new MediaRecorder(stream); // Create MediaRecorder instance
            this.audioRecorder = recorder;

            recorder.ondataavailable = async (event) => {
                console.log("Event data:", event.data);

                // Convert Blob to Base64
                const base64Data = await this.blobToBase64(event.data);

                // Construct JSON payload
                const jsonPayload = {
                    chunk: base64Data,
                    mimeType: event.data.type, // Include MIME type (e.g., 'audio/webm;codecs=opus')
                };

                console.log("JSON Payload:", jsonPayload);

                // Send JSON payload
                await axios.post('https://vwawgovkn0.execute-api.eu-west-1.amazonaws.com/audio/add', jsonPayload);
            };

            recorder.start(10000); // Record in chunks of 10 seconds
        },
        async stopRecording() {
            this.isRecording = false;
            this.audioRecorder.stop();
        },
        async mergeAudio() {
            await axios.post('/audio/merge');
            alert('Audio merged successfully');
        },
        async retrieveAudio() {
            await axios.get('/audio/retrieve');
            alert('Audio retrived successfully');
        },
        // Helper function to convert Blob to Base64
        blobToBase64(blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64 string
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        }

    },
};
</script>