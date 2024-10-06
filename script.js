function generateImage() {
    const title = document.getElementById("title").value;
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const player1ImageInput = document.getElementById("player1Image");
    const player2ImageInput = document.getElementById("player2Image");
    const backgroundImageInput = document.getElementById("background");

    const canvas = document.getElementById("battleCanvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load background image
    if (backgroundImageInput.files[0]) {
        const backgroundImage = new Image();
        backgroundImage.src = URL.createObjectURL(backgroundImageInput.files[0]);
        backgroundImage.onload = () => {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            // Load player 1 image
            if (player1ImageInput.files[0]) {
                const player1Image = new Image();
                player1Image.src = URL.createObjectURL(player1ImageInput.files[0]);
                player1Image.onload = () => {
                    // Draw circular cropped image for Player 1
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(200, 250, 150, 0, Math.PI * 2, true); // Circle for Player 1
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(player1Image, 50, 100, 300, 400);
                    ctx.restore();
                    ctx.fillText(player1, 50, 470); // Player 1 Name
                };
            }

            // Load player 2 image
            if (player2ImageInput.files[0]) {
                const player2Image = new Image();
                player2Image.src = URL.createObjectURL(player2ImageInput.files[0]);
                player2Image.onload = () => {
                    // Draw circular cropped image for Player 2
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(500, 250, 150, 0, Math.PI * 2, true); // Circle for Player 2
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(player2Image, 450, 100, 300, 400);
                    ctx.restore();
                    ctx.fillText(player2, 450, 470); // Player 2 Name
                };
            }

            // Add title and date/time
            ctx.font = "bold 30px Arial";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 30); // Title
            ctx.font = "20px Arial";
            ctx.fillText(`تاريخ: ${date} - وقت: ${time}`, canvas.width / 2 - ctx.measureText(`تاريخ: ${date} - وقت: ${time}`).width / 2, 500);
        };
    }

    // Download link
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.href = canvas.toDataURL("image/png");
}
