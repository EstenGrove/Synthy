import { CSSProperties, MouseEvent, ReactNode, RefObject } from "react";
import css from "../../css/shared/Button.module.scss";

type Props = {
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	isDisabled?: boolean;
	btnRef?: RefObject<HTMLButtonElement> | null;
	type?: "button" | "submit" | "reset" | undefined;
	styles?: CSSProperties;
	children?: ReactNode;
};

const Button = ({
	onClick,
	isDisabled = false,
	btnRef = null,
	type = "button",
	styles = {},
	children,
}: Props) => {
	return (
		<button
			ref={btnRef}
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className={css.Button}
			style={styles}
		>
			{children}
		</button>
	);
};

export default Button;
