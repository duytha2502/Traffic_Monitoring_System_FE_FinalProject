async function uploadVideo() {
    try {
        
        const videoFile = document.getElementById("videoFile").files[0];
        
        if (!videoFile) {
            alert("Please select a video file!");
            return;
        }

        const formData = new FormData();
        formData.append("file", videoFile);

        const response = await fetch('http://127.0.0.1:8000/track', {
        method: 'POST',
        body: formData,
        });

        const data = await response.json();

        if (data.video_url) {
            // Tạo video element với thẻ source
            const videoElement = document.createElement("video");
            videoElement.controls = true;
            videoElement.width = 1280;
            videoElement.height = 720;

            const sourceElement = document.createElement("source");
            sourceElement.src = `http://127.0.0.1:8000/${data.video_url}`; // Gắn URL video
            sourceElement.type = "video/mp4";

            videoElement.appendChild(sourceElement);
            document.getElementById("result").innerHTML = ""; // Xóa kết quả cũ
            document.getElementById("result").appendChild(videoElement); // Thêm video mới
            videoElement.load(); // Tải video mới
        }
        else {
            alert(data.error || 'Error occurred');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}