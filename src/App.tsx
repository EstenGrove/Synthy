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
import ModulePage from "./pages/ModulePage";
import RecorderPage from "./pages/RecorderPage";
import UIPlayground from "./components/playground/UIPlayground";

function App() {
	return (
		<Router>
			<div className="App">
				<div className="App_main">
					<Nav />
					<Routes>
						<Route path="/" element={<SynthPage />} />
						<Route path="/demo" element={<DemoPage />} />
						<Route path="/module" element={<ModulePage />} />
						<Route path="/playground" element={<PlaygroundPage />} />
						<Route path="/recorder" element={<RecorderPage />} />
						<Route path="/ui" element={<UIPlayground />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
