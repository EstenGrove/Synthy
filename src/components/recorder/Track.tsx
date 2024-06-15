import sprite from "../../assets/icons/audio.svg";
import styles from "../../css/recorder/Track.module.scss";
import { formatDuration } from "../../utils/utils_audio";

interface ITrack {
	title: string;
	src: string;
	duration?: number;
}

type Props = {
	track: ITrack;
	isPlaying: boolean;
	playTrack: () => void;
	pauseTrack: () => void;
};

type TrackInfoProps = {
	title: string;
	duration?: number; // in seconds?
};

const TrackInfo = ({ title, duration = 0 }: TrackInfoProps) => {
	const timeDuration = formatDuration(duration);
	return (
		<div className={styles.TrackInfo}>
			<h4 className={styles.TrackInfo_title}>{title}</h4>
			<div className={styles.TrackInfo_duration}>{timeDuration}</div>
		</div>
	);
};

const TrackIcon = () => {
	return (
		<div className={styles.TrackIcon}>
			<svg className={styles.TrackIcon_icon}>
				<use xlinkHref={`${sprite}#icon-radio`}></use>
			</svg>
		</div>
	);
};
const icons = {
	play: "controller-play",
	pause: "pause",
};
type IconButtonProps = {
	icon: string;
	onClick: () => void;
};
const IconButton = ({ icon = "play", onClick }: IconButtonProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.IconButton}>
			<svg className={styles.IconButton_icon}>
				<use xlinkHref={`${sprite}#icon-${icons[icon as keyof object]}`}></use>
			</svg>
		</button>
	);
};

type ControlsProps = {
	isPlaying: boolean;
	playTrack: () => void;
	pauseTrack: () => void;
};

const TrackControls = ({
	playTrack,
	pauseTrack,
	isPlaying = false,
}: ControlsProps) => {
	return (
		<div className={styles.TrackControls}>
			{!isPlaying && <IconButton onClick={playTrack} icon="play" />}
			{isPlaying && <IconButton onClick={pauseTrack} icon="pause" />}
		</div>
	);
};

const Track = ({ track, isPlaying = false, playTrack, pauseTrack }: Props) => {
	return (
		<div className={styles.Track}>
			<TrackIcon />
			<TrackInfo title={track.title} duration={track.duration} />
			<TrackControls
				isPlaying={isPlaying}
				playTrack={playTrack}
				pauseTrack={pauseTrack}
			/>
		</div>
	);
};

export default Track;
