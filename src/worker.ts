self.onmessage = (msg) => {
	console.log("Message from DOM", msg);
	postMessage("Worker Message: ✅ DONE!");
};
