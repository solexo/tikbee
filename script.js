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
            const loadPlayer1Image = () => {
                return new Promise((resolve) => {
                    if (player1ImageInput.files[0]) {
                        const player1Image = new Image();
                        player1Image.src = URL.createObjectURL(player1ImageInput.files[0]);
                        player1Image.onload = () => {
                            // Draw circular cropped image for Player 1 (left side)
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(270, 500, 150, 0, Math.PI * 2, true);
                            ctx.closePath();
                            ctx.clip();
                            ctx.drawImage(player1Image, 120, 350, 300, 300);
                            ctx.restore();

                            // Add player 1 name with Marhey font
                            ctx.fillStyle = "#FFF"; // White text
                            ctx.font = "bold 40px 'Marhey'"; // Use the imported Marhey font
                            ctx.fillText(player1, 150, 700);
                            resolve();
                        };
                    } else {
                        resolve(); // Resolve if no player 1 image is provided
                    }
                });
            };

            // Load player 2 image
            const loadPlayer2Image = () => {
                return new Promise((resolve) => {
                    if (player2ImageInput.files[0]) {
                        const player2Image = new Image();
                        player2Image.src = URL.createObjectURL(player2ImageInput.files[0]);
                        player2Image.onload = () => {
                            // Draw circular cropped image for Player 2 (right side)
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(810, 500, 150, 0, Math.PI * 2, true);
                            ctx.closePath();
                            ctx.clip();
                            ctx.drawImage(player2Image, 660, 350, 300, 300);
                            ctx.restore();

                            // Add player 2 name with Marhey font
                            ctx.fillStyle = "#FFF"; // White text
                            ctx.font = "bold 40px 'Marhey'"; // Use the imported Marhey font
                            ctx.fillText(player2, 750, 700);
                            resolve();
                        };
                    } else {
                        resolve(); // Resolve if no player 2 image is provided
                    }
                });
            };

            // Load images in sequence and then draw title and date/time
            loadPlayer1Image().then(loadPlayer2Image).then(() => {
                // Add title with Marhey font
                ctx.fillStyle = "#FFF"; // White text
                ctx.font = "bold 50px 'Marhey'"; // Use the imported Marhey font
                ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 100);

                // Change font size for date and time with Marhey font
                ctx.fillStyle = "#FFF"; // White text
                ctx.font = "bold 40px 'Marhey'"; // Larger font size with Marhey font
                ctx.fillText(`تاريخ: ${date}`, canvas.width / 2 - ctx.measureText(`تاريخ: ${date}`).width / 2, 1500);
                ctx.fillText(`وقت: ${time}`, canvas.width / 2 - ctx.measureText(`وقت: ${time}`).width / 2, 1560);

                // Update the download link after all drawings are complete
                const downloadLink = document.getElementById("downloadLink");
                downloadLink.href = canvas.toDataURL("image/png");
            });
        };
    } else {
        console.error("No background image selected.");
    }
}
