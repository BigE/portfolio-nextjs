"use client";

import styles from "@/styles/pageSection.module.scss";
import Icon from "./icon";

export type PageSectionType = {
	dark?: boolean;
	headline: string;
	icon?: string;
};

export default function PageSection({
	dark,
	headline,
	icon,
	...props
}: PageSectionType & JSX.IntrinsicElements["section"]) {
	props.className = [
		styles.pageSection,
		dark ? styles.dark : "",
		props.className,
	]
		.join(" ")
		.trim();

	return (
		<section {...props}>
			<header>
				<h3 className={styles.headline}>
					<Icon className={styles.icon} icon={icon} />
					{headline}
				</h3>
			</header>
			{props.children}
		</section>
	);
}
