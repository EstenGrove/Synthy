import { useState } from "react";
import "./App.scss";
import Synth from "./components/synth/Synth";
import { NOTES_LIST as notesList } from "./data/synthNotes";
import Knob from "./components/controls/Knob";
import Playground from "./components/playground/Playground";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SynthPage from "./pages/SynthPage";
import DemoPage from "./pages/DemoPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import Nav from "./components/shared/Nav";

function App() {
	// console.log("notesList", notesList);
	return (
		<Router>
			<div className="App">
				<Nav />
				<Routes>
					<Route path="/" element={<SynthPage />} />
					<Route path="/demo" element={<DemoPage />} />
					<Route path="/playground" element={<PlaygroundPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
