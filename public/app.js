const sendBtn = document.getElementById("sendBtn");
const result = document.getElementById("result");

sendBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const consent = document.getElementById("consent").checked;

    if (!name || !phone) {
        result.textContent = "Please enter the name and number.";
        return;
    }

    if (!consent) {
        result.textContent = "Marketing consent is required.";
        return;
    }

    result.textContent = "Sending...";

    try {

        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone
            })
        });

        const data = await response.json();

        if (data.success) {
            result.textContent = "Message sent successfully.";
        } else {
            result.textContent = data.error || "Something went wrong.";
        }

    } catch (error) {

        result.textContent = "Server connection failed.";

    }
});
