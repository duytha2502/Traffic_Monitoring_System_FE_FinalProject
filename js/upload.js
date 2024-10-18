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
            sourceElement.type = "video/mp4"

            videoElement.appendChild(sourceElement);
            document.getElementById("result").innerHTML = ""; // Xóa kết quả cũ
            document.getElementById("result").appendChild(videoElement); // Thêm video mới
            videoElement.load(); // Tải video mới

            // Hiển thị các biểu đồ dưới dạng ảnh
            const chartContainer = document.createElement("div"); // Tạo div chứa biểu đồ
            chartContainer.classList.add("d-flex", "flex-wrap", "align-items-around", "justify-content-around");

            // Tạo 3 thẻ img cho các biểu đồ
            const chart1 = document.createElement("img");
            chart1.src = `http://127.0.0.1:8000/${data.pie_url}`; // Gắn URL biểu đồ 1
            chart1.alt = "Vehicle Radio Chart";
            chart1.style.width = "700px"

            const chart2 = document.createElement("img");
            chart2.src = `http://127.0.0.1:8000/${data.line_url}`; // Gắn URL biểu đồ 2
            chart2.alt = "Congestion Rate Chart";
            chart2.style.width = "700px"

            const chart3 = document.createElement("img");
            chart3.src = `http://127.0.0.1:8000/${data.hybrid_url}`; // Gắn URL biểu đồ 3
            chart3.alt = "Speed and Occupancy Chart";
            chart3.style.width = "700px"

            // Thêm các ảnh vào container
            chartContainer.appendChild(chart1);
            chartContainer.appendChild(chart2);
            chartContainer.appendChild(chart3);

            // Thêm container chứa biểu đồ vào DOM dưới video
            document.getElementById("result").appendChild(chartContainer);
        }
        else {
            alert(data.error || 'Error occurred');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}